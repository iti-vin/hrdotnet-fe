/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import React, { Fragment } from "react";
//--- Mantine Modules
import {
  ActionIcon,
  Button,
  Flex,
  rem,
  Textarea,
  TextInput,
  useMatches,
  Select,
  Stack,
  ScrollArea,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
//--- Tabler Icons
import { IconCalendar, IconCaretDownFilled, IconClock } from "@tabler/icons-react";
//-- Shared Template
import Dropzone from "@shared/template/Dropzone";
import Modal from "@/layout/main/dialog/Modal";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { MissedLogServices } from "../../../services";
import { queryClient } from "@/services/client";
import { useMissedLogStore } from "../../../store/main";
import { useMediaQuery } from "@mantine/hooks";

interface ModalRequest {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}
export default function NewRequest({ opened, onClose, buttonClose }: ModalRequest) {
  const { setOpenAlert, setOpenDialog, setError, dateFiled, setDateFiled } = useMissedLogStore();
  const size = useMatches({ base: "100%", sm: "70%" });
  const small = useMediaQuery("(max-width: 40em)");
  const ref = React.useRef<HTMLInputElement>(null);
  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

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
      <Modal opened={opened} onClose={onClose} centered size={size} buttonClose={buttonClose} title="New Request">
        <form onSubmit={newForm.onSubmit(handleSubmit)}>
          <Stack className="w-full h-full">
            <ScrollArea
              px={small ? 20 : 30}
              className="flex flex-col gap-5 mt-3 w-full text-[#6d6d6d] relative"
              h={650}
              styles={{ scrollbar: { display: "none" } }}>
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
                  size="md"
                  label="Log Type"
                  placeholder="Time In"
                  radius={8}
                  withAsterisk
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
                  rightSection={<IconCaretDownFilled size={18} />}
                  className="border-none w-full"
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
                <TimeInput
                  size="md"
                  radius={8}
                  label="Log Time"
                  withAsterisk
                  className="w-full"
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  ref={ref}
                  rightSection={pickerControl}
                  onChange={(e) => {
                    newForm.setValues({
                      TimeInOut: e.target.value,
                    });
                  }}
                />
              </Flex>
              <Textarea
                size="md"
                label="Reason"
                placeholder="Briefly state the reason for filing overtime"
                withAsterisk
                className="w-full"
                styles={{
                  input: { height: "100px" },
                  label: { fontSize: "16px", color: "#6d6d6d" },
                }}
                radius={8}
                key={newForm.key("Reason")}
                {...newForm.getInputProps("Reason")}
              />
              <Dropzone />
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
