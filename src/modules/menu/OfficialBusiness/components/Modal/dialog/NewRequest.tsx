/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { Fragment, useEffect } from "react";
import { Button, useMatches, Stack, ScrollArea, Select, Flex, Textarea } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";

//--- Layouts
import Modal from "@/layout/main/dialog/Modal";
//--- Service
import { queryClient } from "@/services/client";

//-- Shared Template
import Dropzone from "@shared/template/Dropzone";
import RndrDateRange from "@shared/template/base/DateRange";
import { useGlobalStore } from "@shared/store";
import { useTimePicker } from "@shared/hooks/useTimePicker";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { ModalProps } from "@shared/assets/types/Modal";

//--- Official Business Module
import { useOfficialBusinessStore } from "../../../store";
import { useOfficialBusinessContext } from "../../../context";
import { OfficialBusinessServices } from "../../../services/api";
import { ValidationErrorResponse } from "../../../assets/Types";
import { useMediaQuery } from "@mantine/hooks";

export default function NewRequest({ opened, onClose, buttonClose }: ModalProps) {
  const { locations, branches, setLoading, branchId, setBranchId, setError, setOpenAlert, setOpenDialog } =
    useOfficialBusinessStore();
  const { onFetchMaintenanceBranch } = useOfficialBusinessContext();
  const { twoDate, setTwoDate } = useGlobalStore();
  const size = useMatches({ base: "100%", sm: "70%" });
  const small = useMediaQuery("(max-width: 40em)");

  const { ref: refTimeIn, pickerControl: pickerControlTimeIn } = useTimePicker();
  const { ref: refTimeOut, pickerControl: pickerControlTimeOut } = useTimePicker();

  useEffect(() => {
    onFetchMaintenanceBranch(String(branchId));
  }, [branchId]);

  const newForm = useForm({
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

  const { mutate: createOfficialBusiness } = useMutation({
    mutationFn: async (values: typeof newForm.values) => {
      const formattedValues = {
        ...values,
        DateFrom: DateTimeUtils.isoToDateDash(String(twoDate[0])),
        DateTo: DateTimeUtils.isoToDateDash(String(twoDate[1])),
        TimeIn: values.TimeIn + ":00",
        TimeOut: values.TimeOut + ":00",
      };
      setLoading(true);
      return OfficialBusinessServices.createOBRequest(formattedValues);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request_officialbusiness"] });
      setOpenDialog("");
      setLoading(false);
      setOpenAlert("SuccessSubmit");
      setTwoDate([null, null]);
    },
    onError: (error: { response: { data: ValidationErrorResponse } }) => {
      setLoading(false);
      const errorData = error.response.data;
      const errorMessages = Object.values(errorData.errors).flat().join(", ");
      setError(errorMessages || "Internal Server Error");
    },
  });

  const handleCreate = (values: typeof newForm.values) => {
    createOfficialBusiness(values);
  };

  return (
    <Fragment>
      <Modal opened={opened} onClose={onClose} centered size={size} buttonClose={buttonClose} title="New Request">
        <form onSubmit={newForm.onSubmit(handleCreate)}>
          <Stack className="w-full h-full">
            <ScrollArea
              px={small ? 20 : 30}
              className="flex flex-col mt-3 w-full text-[#6d6d6d] relative"
              h={650}
              styles={{ scrollbar: { display: "none" } }}>
              <Flex gap={5} direction="column">
                <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
                  <RndrDateRange
                    dateProps={twoDate}
                    fl="From Date"
                    sl="To Date"
                    fp="From"
                    sp="To"
                    direction="row"
                    setDateProps={(newValue) => setTwoDate(newValue)}
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
                    onChange={(e) => {
                      newForm.setValues({
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
                    onChange={(e) => {
                      newForm.setValues({
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
                    data={locations.map((item) => ({ value: item.id.toString(), label: item.name }))}
                    size="md"
                    radius={8}
                    withAsterisk
                    onChange={(selectedValue) => {
                      const selectedItem = locations.find((item) => item.id.toString() === selectedValue);
                      if (selectedItem) {
                        setBranchId(selectedItem.id);
                        newForm.setValues({
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
                    data={branches.map((item) => ({ value: item.id.toString(), label: item.name }))}
                    radius={8}
                    withAsterisk
                    // onChange={(selectedValue) => {
                    //   const selectedItem = locations.find((item) => item.id.toString() === selectedValue);
                    // }}
                  />
                </Flex>

                <Textarea
                  label="Reason"
                  withAsterisk
                  rows={4}
                  key={newForm.key("Reason")}
                  {...newForm.getInputProps("Reason")}
                />
                <Dropzone />
              </Flex>
            </ScrollArea>
          </Stack>
          <Stack className="flex flex-col justify-end mt-3" px={small ? 20 : 30}>
            <Button
              type="submit"
              className="w-2/4 sm:w-2/5 md:w-1/6  br-gradient self-end border-none"
              radius="md"
              size="md">
              SUBMIT
            </Button>
          </Stack>
        </form>
      </Modal>
    </Fragment>
  );
}
