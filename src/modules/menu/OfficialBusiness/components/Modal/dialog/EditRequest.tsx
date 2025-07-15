/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Fragment, useState } from "react";
//--- Mantine Modules
import { Stack, Flex } from "@mantine/core";
//--- Tabler Icons
//-- Shared Template

import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { useOfficialBusinessStore } from "../../../store";
import { queryClient } from "@/services/client";
import { ValidationErrorResponse } from "../../../assets/Types";
import { SingleDataOfficialBusiness } from "../../../assets/Values";
import { OfficialBusinessServices } from "../../../services/api";
import { ModalProps } from "@shared/assets/types/Modal";
import { Button, DateRangePickerInput, FileAttachment, Modal, Select, TextArea, TimePickerInput } from "@shared/components";

export default function EditRequest({ opened, onClose, buttonClose }: ModalProps) {
  const { viewItems, locations, branches, setOpenDialog, setOpenAlert, setLoading, setError } = useOfficialBusinessStore();
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);

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
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        size="xl"
        buttonClose={buttonClose}
        title="Edit Request"
        footer={
          <Button type="submit" variant="gradient" size="lg">
            SUBMIT
          </Button>
        }>
        <form onSubmit={editForm.onSubmit(handleUpdate)}>
          <Stack className="w-full h-full">
            <Flex gap={5} direction="column">
              <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
                <DateRangePickerInput
                  fl="From Date"
                  sl="To Date"
                  fp="From"
                  sp="To"
                  direction="row"
                  dateValue={dateRange}
                  setDateValue={(date) => {
                    setDateRange(date);
                  }}
                />
              </Flex>
              <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
                <TimePickerInput
                  label="OB Time In"
                  required
                  setValue={(e) => {
                    editForm.setValues({
                      TimeIn: e!,
                    });
                  }}
                />
                <TimePickerInput
                  label="OB Time  Out"
                  required
                  setValue={(e) => {
                    editForm.setValues({
                      TimeOut: e!,
                    });
                  }}
                />
              </Flex>
              <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }} align="end">
                <Select
                  label="Location"
                  className="w-full"
                  required
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
                  required
                  data={branches.map((item) => ({ value: item.id.toString(), label: item.name }))}
                  placeholder={viewItems.filing.location.locationBranch}
                />
              </Flex>
              <Stack>
                <TextArea
                  label="Reason"
                  required
                  rows={4}
                  placeholder={viewItems.filing.reason}
                  onChange={(e) => {
                    editForm.setValues({
                      Reason: e.target.value,
                    });
                  }}
                />
                <FileAttachment />
              </Stack>
            </Flex>
          </Stack>
        </form>
      </Modal>
    </Fragment>
  );
}
