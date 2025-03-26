/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import React from "react";
//--- Mantine Modules
import { ActionIcon, Button, Flex, rem, Textarea, TextInput, useMatches, Select, Stack, ScrollArea } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
//--- Tabler Icons
import { IconCalendar, IconCaretDownFilled, IconClock } from "@tabler/icons-react";
//-- Shared Template
import Dropzone from "@shared/template/Dropzone";
import Modal from "@/layout/main/dialog/Modal";
import { useMissedLogStore } from "../../../store/main";
import { useForm } from "@mantine/form";
import { UpdateMissedLog } from "../../../assets/Values";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { useMutation } from "@tanstack/react-query";
import { MissedLogServices } from "../../../services";
import { queryClient } from "@/services/client";

interface ModalRequest {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function EditRequest({ opened, onClose, buttonClose }: ModalRequest) {
  const { viewItems, setError, setOpenConfirmation, setOpenDialog } = useMissedLogStore();
  const size = useMatches({
    base: "100%",
    sm: "70%",
  });

  const ref = React.useRef<HTMLInputElement>(null);

  const editForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      DateFiled: "",
      LogTypeId: 0,
      LogTypeName: "",
      TimeInOut: "",
      Reason: "",
    },
  });

  const { mutate: updateMissedLog } = useMutation({
    mutationFn: async (values: typeof editForm.values) => {
      const formattedValues = {
        ...UpdateMissedLog(viewItems),
        DateFiled: values.DateFiled ? DateTimeUtils.getIsoDateToIso(String(values.DateFiled)) : viewItems.filing.dateFiled,
        LogTypeId: values.LogTypeId ? values.LogTypeId : viewItems.filing.logType.id,
        LogTypeName: values.LogTypeName ? values.LogTypeName : viewItems.filing.logType.name,
        TimeInOut: values.TimeInOut ? values.TimeInOut : viewItems.filing.timeInOut,
        Reason: values.Reason ? values.Reason : viewItems.filing.reason,
      };

      return MissedLogServices.updateMissedLogRequest(viewItems.filing.id, formattedValues);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request_missedlog"] });
      setOpenDialog("");
      setOpenConfirmation("UpdateRequest");
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

  const handleUpdate = (values: typeof editForm.values) => {
    updateMissedLog(values);
  };

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  return (
    <>
      <Modal opened={opened} onClose={onClose} centered size={size} buttonClose={buttonClose} title="Edit Request">
        <form onSubmit={editForm.onSubmit(handleUpdate)}>
          <Stack className="w-full h-full">
            <ScrollArea px={20} className="flex flex-col gap-5 mt-3 w-full text-[#6d6d6d] relative" h={650} styles={{ scrollbar: { display: "none" } }}>
              <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
                <DatePickerInput
                  size="md"
                  radius={8}
                  withAsterisk
                  label="Date"
                  className="w-full"
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  rightSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                  value={new Date(viewItems.filing.dateFiled!)}
                  onChange={(value) => {
                    editForm.setValues({
                      DateFiled: DateTimeUtils.getIsoDateToIso(String(value)).toString(),
                    });
                  }}
                />
                <TextInput
                  size="md"
                  radius={8}
                  label="Reference Number"
                  placeholder="0000-0000-0000"
                  className="w-full"
                  max={14}
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
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
                    editForm.setValues({
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
                    editForm.setValues({
                      TimeInOut: e.target.value,
                    });
                  }}
                />
              </Flex>
              <Textarea
                size="md"
                label="Reason"
                placeholder={viewItems.filing.reason}
                withAsterisk
                className="w-full"
                styles={{
                  input: { height: "100px" },
                  label: { fontSize: "16px", color: "#6d6d6d" },
                }}
                radius={8}
                key={editForm.key("Reason")}
                {...editForm.getInputProps("Reason")}
              />
              <Dropzone />
            </ScrollArea>
          </Stack>
          <Stack className="flex flex-col justify-end mt-3">
            <Button type="submit" className="w-2/4 sm:w-2/5 md:w-1/6  br-gradient self-end border-none" radius="md" size="md">
              SUBMIT
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
