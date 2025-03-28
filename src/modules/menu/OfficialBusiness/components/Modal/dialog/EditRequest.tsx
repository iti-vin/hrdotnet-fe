/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Fragment } from "react";
//--- Mantine Modules
import { Button, useMatches, Stack, ScrollArea, Select, Flex, Textarea } from "@mantine/core";
//--- Tabler Icons
//-- Shared Template
import Dropzone from "@shared/template/Dropzone";
import Modal from "@/layout/main/dialog/Modal";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useTimePicker } from "@shared/hooks/useTimePicker";
import { useMutation } from "@tanstack/react-query";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { useOfficialBusinessStore } from "../../../store";
import { queryClient } from "@/services/client";
import { ValidationErrorResponse } from "../../../assets/Types";
import { SingleDataOfficialBusiness } from "../../../assets/Values";
import { OfficialBusinessServices } from "../../../services/api";
import { ModalProps } from "@shared/assets/types/Modal";

export default function EditRequest({ opened, onClose, buttonClose }: ModalProps) {
  const { viewItems, locations, branches, setOpenDialog, setOpenAlert, setLoading, setError } = useOfficialBusinessStore();
  const size = useMatches({ base: "100%", sm: "70%" });
  const { ref: refTimeIn, pickerControl: pickerControlTimeIn } = useTimePicker();
  const { ref: refTimeOut, pickerControl: pickerControlTimeOut } = useTimePicker();

  const editForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      LocationId: 0,
      Location: "",
      LocationBranchId: 0,
      LocationBranch: "",
      DateFrom: "",
      DateTo: "",
      TimeIn: "",
      TimeOut: "",
      Reason: "",
      ReferenceNo: "",
      FileAttachment: "",
    },
  });
  const { mutate: updateOfficialBusiness } = useMutation({
    mutationFn: async (values: typeof editForm.values) => {
      const editedForm = {
        ...SingleDataOfficialBusiness(viewItems),
        DateFrom: values.DateFrom ? DateTimeUtils.isoToDateDash(values.DateFrom) : DateTimeUtils.isoToDateDash(String(viewItems.filing.dateRange.dateFrom)),
        DateTo: values.DateFrom ? DateTimeUtils.isoToDateDash(values.DateTo) : DateTimeUtils.isoToDateDash(String(viewItems.filing.dateRange.dateFrom)),
        TimeIn: values.TimeIn ? values.TimeIn + ":00" : viewItems.filing.timeRange.timeIn,
        TimeOut: values.TimeOut ? values.TimeOut + ":00" : viewItems.filing.timeRange.timeOut,
        Reason: values.Reason ? values.Reason : viewItems.filing.reason,

        Location: values.Location ? values.Location : viewItems.filing.location.name,
        LocationId: values.LocationId ? values.LocationId : viewItems.filing.location.id,
      };
      setLoading(true);
      return OfficialBusinessServices.updateOBRequest(viewItems.filing.id, editedForm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request_officialbusiness"] });
      setOpenDialog("");
      setLoading(false);
      setOpenAlert("SuccessUpdate");
    },
    onError: (error: { response: { data: ValidationErrorResponse } }) => {
      setLoading(false);
      const errorData = error.response.data;
      const errorMessages = Object.values(errorData.errors).flat().join(", ");
      setError(errorMessages || "Internal Server Error");
    },
  });

  const handleUpdate = (values: typeof editForm.values) => {
    updateOfficialBusiness(values);
  };

  return (
    <Fragment>
      <Modal opened={opened} onClose={onClose} centered size={size} buttonClose={buttonClose} title="Edit Request">
        <form onSubmit={editForm.onSubmit(handleUpdate)}>
          <Stack className="w-full h-full">
            <ScrollArea px={20} className="flex flex-col mt-3 w-full text-[#6d6d6d] relative" h={650} styles={{ scrollbar: { display: "none" } }}>
              <Flex gap={5} direction="column">
                <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
                  <DatePickerInput
                    label="From Date"
                    className="w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    size="md"
                    radius={8}
                    withAsterisk
                    placeholder={DateTimeUtils.isoToDateDash(String(viewItems.filing.dateRange.dateFrom))}
                    onChange={(value) =>
                      editForm.setValues({
                        DateFrom: String(value),
                      })
                    }
                  />
                  <DatePickerInput
                    label="To Date"
                    className="w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    size="md"
                    radius={8}
                    withAsterisk
                    placeholder={DateTimeUtils.isoToDateDash(String(viewItems.filing.dateRange.dateTo))}
                    onChange={(value) =>
                      editForm.setValues({
                        DateTo: String(value),
                      })
                    }
                  />
                </Flex>
                <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
                  <TimeInput
                    label="OB Time In"
                    className="w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    size="md"
                    radius={8}
                    withAsterisk
                    ref={refTimeIn}
                    rightSection={pickerControlTimeIn}
                    placeholder={viewItems.filing.timeRange.timeIn}
                    onChange={(e) => {
                      editForm.setValues({
                        TimeIn: e.target.value,
                      });
                    }}
                  />
                  <TimeInput
                    label="OB Time  Out"
                    className="w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    size="md"
                    radius={8}
                    withAsterisk
                    ref={refTimeOut}
                    rightSection={pickerControlTimeOut}
                    placeholder={viewItems.filing.timeRange.timeOut}
                    onChange={(e) => {
                      editForm.setValues({
                        TimeOut: e.target.value,
                      });
                    }}
                  />
                </Flex>
                <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }} align="end">
                  <Select
                    label="Location"
                    className="w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    size="md"
                    radius={8}
                    withAsterisk
                    placeholder={viewItems.filing.location.name}
                    data={locations.map((item) => ({ value: item.id.toString(), label: item.name }))}
                    onChange={(selectedValue) => {
                      const selectedItem = locations.find((item) => item.id.toString() === selectedValue);
                      if (selectedItem) {
                        editForm.setValues({
                          Location: selectedItem.name,
                          LocationId: selectedItem.id,
                        });
                      }
                    }}
                  />
                  <Select
                    label="Branch"
                    className="w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    size="md"
                    radius={8}
                    withAsterisk
                    data={branches.map((item) => ({ value: item.id.toString(), label: item.name }))}
                    placeholder={viewItems.filing.location.locationBranch}
                    // onChange={(selectedValue) => {
                    //   const selectedItem = locations.find((item) => item.id.toString() === selectedValue);
                    // }}
                  />
                </Flex>

                <Textarea
                  label="Reason"
                  withAsterisk
                  rows={4}
                  placeholder={viewItems.filing.reason}
                  onChange={(e) => {
                    editForm.setValues({
                      Reason: e.target.value,
                    });
                  }}
                />
                <Dropzone />
              </Flex>
            </ScrollArea>
          </Stack>
          <Stack className="flex flex-col justify-end mt-3">
            <Button type="submit" className="w-2/4 sm:w-2/5 md:w-1/6  br-gradient self-end border-none" radius="md" size="md">
              SUBMIT
            </Button>
          </Stack>
        </form>
      </Modal>
    </Fragment>
  );
}
