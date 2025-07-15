/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { Flex, Stack } from "@mantine/core";

//--- Tabler Icons
import { IconCaretDownFilled } from "@tabler/icons-react";
//-- Shared Template

import { useMissedLogStore } from "../../../store/main";
import { useForm } from "@mantine/form";
import { UpdateMissedLog } from "../../../assets/Values";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { useMutation } from "@tanstack/react-query";
import { MissedLogServices } from "../../../services";
import { queryClient } from "@/services/client";
import { DatePickerInput, TimePickerInput, Select, FileAttachment, TextArea, Button, Modal, ReferenceNoInput } from "@shared/components";

interface ModalRequest {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function EditRequest({ opened, onClose, buttonClose }: ModalRequest) {
  const { viewItems, setError, setOpenConfirmation, setOpenDialog } = useMissedLogStore();

  // const ref = React.useRef<HTMLInputElement>(null);

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

  // const pickerControl = (
  //   <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
  //     <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
  //   </ActionIcon>
  // );

  return (
    <>
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
            <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
              <DatePickerInput
                size="md"
                label="Date"
                required
                value={viewItems.filing.dateFiled!}
                setValue={(value) => {
                  editForm.setValues({
                    DateFiled: DateTimeUtils.getIsoDateToIso(String(value)).toString(),
                  });
                }}
              />
              <ReferenceNoInput code="edit-request" label="Reference Number" placeholder="0000-0000-0000" className="w-full" max={14} required />
            </Flex>

            <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
              <Select
                label="Log Type"
                placeholder="Time In"
                required
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
                className=" w-full"
              />
              <TimePickerInput
                size="md"
                label="Log Time"
                value={viewItems.filing.timeInOut}
                setValue={(e) => {
                  editForm.setValues({
                    TimeInOut: e!,
                  });
                }}
              />
            </Flex>
            <TextArea label="Reason" placeholder={viewItems.filing.reason} required className="w-full" key={editForm.key("Reason")} {...editForm.getInputProps("Reason")} />
            <FileAttachment />
          </Stack>
        </form>
      </Modal>
    </>
  );
}
