/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import React from "react";
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
import { useMediaQuery } from "@mantine/hooks";

interface ModalRequest {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

interface OvertimeData {
  date: string;
  schedule: string;
  actualIn: string;
  actualOut: string;
}

export default function NewFilings({ opened, onClose, buttonClose }: ModalRequest) {
  const small = useMediaQuery("(max-width: 40em)");
  const size = useMatches({
    base: "100%",
    sm: "70%",
  });

  React.useState<OvertimeData | null>(null);

  const [value, setValue] = React.useState<string>("");
  const [date, setDate] = React.useState<Date | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, "");
    const formattedValue = formatInput(input);
    setValue(formattedValue);
  };

  const formatInput = (input: string): string => {
    const regex = /(\d{0,4})(\d{0,4})(\d{0,4})/;
    const matches = input.match(regex);
    if (!matches) return "";

    const part1 = matches[1] || "";
    const part2 = matches[2] || "";
    const part3 = matches[3] || "";

    return `${part1}${part2 ? "-" + part2 : ""}${part3 ? "-" + part3 : ""}`.trim();
  };

  const ref = React.useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  return (
    <>
      <Modal opened={opened} onClose={onClose} centered size={size} buttonClose={buttonClose} title="New Filing">
        <form onSubmit={() => console.log(value)}>
          <Stack className="w-full h-full">
            <ScrollArea
              px={small ? 20 : 30}
              className="flex flex-col gap-5 mt-3 w-full text-[#6d6d6d] relative"
              h={650}
              styles={{ scrollbar: { display: "none" } }}>
              <Select
                size="md"
                label="Employee Name"
                placeholder="Select Employee"
                radius={8}
                withAsterisk
                rightSection={<IconCaretDownFilled size={18} />}
                className="border-none w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
              <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
                <DatePickerInput
                  size="md"
                  radius={8}
                  withAsterisk
                  value={date}
                  onChange={setDate}
                  label="Date"
                  placeholder="MM/DD/YYYY"
                  className="w-full"
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  rightSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                />
                <TextInput
                  size="md"
                  radius={8}
                  label="Reference Number"
                  placeholder="0000-0000-0000"
                  className="w-full"
                  value={value}
                  onChange={handleChange}
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
                  data={["Time In", "Time Out"]}
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
              />
              <Dropzone />
            </ScrollArea>
          </Stack>
          <Stack className="flex flex-col justify-end mt-3">
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
    </>
  );
}
