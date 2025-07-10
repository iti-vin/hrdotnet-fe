/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Fragment } from "react";
//--- Mantine Modules
import { Flex, rem, Stack } from "@mantine/core";
//--- Tabler Icons
//-- Shared Template

import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { MissedLogServices } from "../../../services";
import { queryClient } from "@/services/client";
import { useMissedLogStore } from "../../../store/main";
import { Button, FileAttachment, Modal, Select, TextArea, TextInput, TimePickerInput } from "@shared/components";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

interface ModalRequest {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}
export default function NewRequest({ opened, onClose, buttonClose }: ModalRequest) {
  const { setOpenAlert, setOpenDialog, setError, dateFiled, setDateFiled } = useMissedLogStore();

  const newForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      DateFiled: "",
      LogTypeId: 0,
      LogTypeName: "",
      TimeInOut: "",
      Reason: "",
    },
  });

  const { mutate: editMissedLog } = useMutation({
    mutationFn: async (values: typeof newForm.values) => {
      const formattedValues = { ...values, DateFiled: dateFiled, TimeInOut: values.TimeInOut + ":00" };
      return MissedLogServices.createMissedLogRequest(formattedValues);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request_missedlog"] });
      setOpenDialog("");
      setOpenAlert("SuccessSubmit");
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

  const handleSubmit = (values: typeof newForm.values) => {
    editMissedLog(values);
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
        <form onSubmit={newForm.onSubmit(handleSubmit)}>
          <Stack className="w-full h-full">
            <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
              <DatePickerInput
                size="md"
                radius={8}
                withAsterisk
                label="Date"
                placeholder="MM/DD/YYYY"
                className="w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                rightSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                value={dateFiled}
                onChange={(value) => setDateFiled(new Date(value))}
              />
              <TextInput
                size="md"
                radius={8}
                label="Reference Number"
                placeholder="0000-0000-0000"
                className="w-full"
                max={14}
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                key={newForm.key("ReferenceNo")}
                {...newForm.getInputProps("ReferenceNo")}
              />
            </Flex>

            <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
              <Select
                className="w-full"
                label="Log Type"
                placeholder="Time In"
                data={[
                  { value: "1", label: "Time In" },
                  { value: "2", label: "Time Out" },
                ]}
                onChange={(selectedValue) => {
                  const selectedOption = [
                    { value: "1", label: "Time In" },
                    { value: "2", label: "Time Out" },
                  ].find((option) => option.value === selectedValue);
                  newForm.setValues({
                    LogTypeId: Number(selectedOption?.value),
                    LogTypeName: selectedOption?.label,
                  });
                }}
                required
              />
              <TimePickerInput
                size="md"
                label="Log Time"
                withAsterisk
                className="w-full"
                setValue={(e) => {
                  newForm.setValues({
                    TimeInOut: e!,
                  });
                }}
              />
            </Flex>
            <TextArea
              label="Reason"
              placeholder="Briefly state the reason for filing overtime"
              required
              className="w-full"
              key={newForm.key("Reason")}
              {...newForm.getInputProps("Reason")}
            />
            <FileAttachment />
          </Stack>
        </form>
      </Modal>
    </Fragment>
  );
}
