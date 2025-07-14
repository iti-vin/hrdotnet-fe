/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { Fragment, useEffect, useState } from "react";
import { Stack, Flex } from "@mantine/core";

import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";

//--- Layouts
//--- Service
import { queryClient } from "@/services/client";

//-- Shared Template
import { useGlobalStore } from "@shared/store";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { ModalProps } from "@shared/assets/types/Modal";

//--- Official Business Module
import { useOfficialBusinessStore } from "../../../store";
import { useOfficialBusinessContext } from "../../../context";
import { OfficialBusinessServices } from "../../../services/api";
import { ValidationErrorResponse } from "../../../assets/Types";
import { Button, DateRangePickerInput, FileAttachment, Modal, Select, TextArea, TimePickerInput } from "@shared/components";

export default function NewRequest({ opened, onClose, buttonClose }: ModalProps) {
  const { locations, branches, setLoading, branchId, setBranchId, setError, setOpenAlert, setOpenDialog } = useOfficialBusinessStore();
  const { onFetchMaintenanceBranch } = useOfficialBusinessContext();
  const { twoDate, setTwoDate } = useGlobalStore();
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);

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
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        size="xl"
        buttonClose={buttonClose}
        title="New Request"
        footer={
          <Button type="submit" variant="gradient" size="lg">
            SUBMIT
          </Button>
        }>
        <form onSubmit={newForm.onSubmit(handleCreate)}>
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
                    newForm.setValues({
                      TimeIn: e!,
                    });
                  }}
                />
                <TimePickerInput
                  label="OB Time Out"
                  required
                  setValue={(e) => {
                    newForm.setValues({
                      TimeOut: e!,
                    });
                  }}
                />
              </Flex>
              <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }} align="end">
                <Select
                  label="Location"
                  className="w-full"
                  data={locations.map((item) => ({ value: item.id.toString(), label: item.name }))}
                  required
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
                  size="md"
                  data={branches.map((item) => ({ value: item.id.toString(), label: item.name }))}
                  required
                  // onChange={(selectedValue) => {
                  //   const selectedItem = locations.find((item) => item.id.toString() === selectedValue);
                  // }}
                />
              </Flex>

              <Stack>
                <TextArea label="Reason" rows={4} key={newForm.key("Reason")} {...newForm.getInputProps("Reason")} required />
                <FileAttachment />
              </Stack>
            </Flex>
          </Stack>
        </form>
      </Modal>
    </Fragment>
  );
}
