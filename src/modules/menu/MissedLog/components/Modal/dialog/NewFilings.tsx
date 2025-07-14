/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import React from "react";
//--- Mantine Modules
import { Flex, rem, Stack } from "@mantine/core";
//--- Tabler Icons
import { IconCalendar, IconCaretDownFilled } from "@tabler/icons-react";
//-- Shared Template
import { TextArea, TextInput, Select, Button, FileAttachment, Modal, DatePickerInput, TimePickerInput } from "@shared/components";

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
  React.useState<OvertimeData | null>(null);

  const [value, setValue] = React.useState<string>("");
  const [date, setDate] = React.useState<string | null>(null);

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

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        size="xl"
        buttonClose={buttonClose}
        title="New Filing"
        footer={
          <Button type="submit" variant="gradient" size="lg">
            SUBMIT
          </Button>
        }>
        <form onSubmit={() => console.log(value)}>
          <Stack className="w-full h-full">
            <Select label="Employee Name" placeholder="Select Employee" required className=" w-full" />
            <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
              <DatePickerInput
                size="md"
                required
                value={date}
                setValue={setDate}
                label="Date"
                placeholder="MM/DD/YYYY"
                className="w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                rightSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
              />
              <TextInput label="Reference Number" placeholder="0000-0000-0000" className="w-full" value={value} onChange={handleChange} max={14} required />
            </Flex>

            <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
              <Select
                label="Log Type"
                placeholder="Time In"
                required
                data={["Time In", "Time Out"]}
                rightSection={<IconCaretDownFilled size={18} />}
                className="border-none w-full"
              />
              <TimePickerInput size="md" label="Log Time" required />
            </Flex>
            <TextArea label="Reason" placeholder="Briefly state the reason for filing overtime" required className="w-full" />
            <FileAttachment />
          </Stack>
        </form>
      </Modal>
    </>
  );
}
