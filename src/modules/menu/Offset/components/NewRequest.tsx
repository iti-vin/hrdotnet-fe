import { IconCaretDownFilled, IconClock, IconDots, IconReload } from "@tabler/icons-react";
import { Modal, Dropzone } from "@shared/template/";

import { ActionIcon, Button, Flex, Group, rem, Select, Text, Textarea, TextInput, useMatches, Popover } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { SuccessRequest } from "@/modules/menu/Offset/components/AlertOffset";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { DataTable } from "mantine-datatable";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";

interface ModalRequest {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

interface OffsetData {
  date: string;
  schedule: string;
  actualIn: string;
  actualOut: string;
}

export default function NewRequest({ opened, onClose, buttonClose }: ModalRequest) {
  const size = useMatches({
    base: "100%",
    sm: "70%",
  });

  const [openedReload, { close: closeExport, open: openReload }] = useDisclosure(false);
  const [searchBy, setSearchBy] = useState("Date");
  const [successReq, { open: successReqOpen, close: successReqClose }] = useDisclosure(false);
  const [show, setShow] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<OffsetData | null>(null);

  const [value, setValue] = React.useState<string>("");

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

  const data: OffsetData[] = [
    {
      date: "10/11/2024",
      schedule: "Next Day",
      actualIn: "6:00PM",
      actualOut: "10:00PM",
    },
    {
      date: "10/12/2024",
      schedule: "Next Day",
      actualIn: "7:00PM",
      actualOut: "10:00PM",
    },
    {
      date: "10/13/2024",
      schedule: "Same Day",
      actualIn: "8:00PM",
      actualOut: "10:00PM",
    },
    {
      date: "10/14/2024",
      schedule: "Next Day",
      actualIn: "9:00PM",
      actualOut: "10:00PM",
    },
    {
      date: "10/15/2024",
      schedule: "Next Day",
      actualIn: "9:00PM",
      actualOut: "10:00PM",
    },
    {
      date: "10/16/2024",
      schedule: "Next Day",
      actualIn: "9:00PM",
      actualOut: "10:00PM",
    },
  ];

  const handleSelectClick = () => {
    setShow(true);
  };

  const handleOptionSelect = (option: OffsetData) => {
    setSelectedOption(option);
    setShow(false);
  };

  const ref = React.useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  return (
    <>
      <Modal opened={opened} onClose={onClose} centered size={size} buttonClose={buttonClose} title="New Request">
        <Group px={20} className="w-full">
          <Select
            size="md"
            label="Offset Date"
            withAsterisk
            placeholder={selectedOption ? `(${selectedOption.date})  ${selectedOption.actualIn} - ${selectedOption.actualOut}` : ""}
            radius={8}
            onClick={handleSelectClick}
            rightSection={<IconDots />}
            className="border-none w-full"
            styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            readOnly
          />

          <Modal opened={show} onClose={() => setShow(false)} buttonClose={() => setShow(false)} title="Select Offset Date" size="lg">
            <Flex direction={{ base: "column", sm: "row" }} align="center" gap={10}>
              <Text size="sm">Search By:</Text>
              <Select
                variant="outline"
                size="md"
                radius={8}
                value={searchBy}
                onChange={(data) => setSearchBy(data as string)}
                data={["Date", "Schedule", "OT In", "OT Out"]}
                rightSection={<IconCaretDownFilled size={18} />}
                className="border-none w-2/6"
                styles={{
                  input: {
                    backgroundColor: "#deecff",
                    color: "#559CDA",
                    fontWeight: 600,
                  },
                }}
              />
              <TextInput
                variant="outline"
                size="md"
                value="Search"
                radius={8}
                styles={{
                  input: {
                    backgroundColor: "#deecff",
                    color: "#559CDA",
                    fontWeight: 600,
                  },
                }}
                // rightSection={<IconSearch color="#559cda" />}
              />

              <Popover width={200} position="bottom" withArrow shadow="md" opened={openedReload}>
                <Popover.Target>
                  <IconReload
                    onMouseEnter={openReload}
                    onMouseLeave={closeExport}
                    className="cursor-pointer rounded-md p-1"
                    style={{ background: "#dfecfd" }}
                    size={40}
                    color="#559CDA"
                  />
                </Popover.Target>
                <Popover.Dropdown style={{ pointerEvents: "none" }}>
                  <Text size="sm">Refresh</Text>
                </Popover.Dropdown>
              </Popover>
            </Flex>
            <DataTable
              columns={[
                {
                  accessor: "date",
                  title: "Date",
                  render: ({ date }: { date: string }) => {
                    return DateTimeUtils.dayWithDate(date);
                  },
                },
                { accessor: "schedule", title: "Schedule" },
                { accessor: "actualIn", title: "Actual In" },
                { accessor: "actualOut", title: "Actual Out" },
              ]}
              idAccessor="date"
              key="date"
              records={data}
              striped={true}
              highlightOnHover={true}
              withTableBorder={true}
              className="select-none"
              onRowClick={(data: any) => {
                handleOptionSelect(data.record);
              }}
              page={1}
              onPageChange={() => {}}
              totalRecords={data.length}
              recordsPerPage={5}
              paginationText={({ totalRecords }) => `${totalRecords} items found in (0.225) seconds`}
              styles={{
                header: {
                  color: "rgba(109, 109, 109, 0.6)",
                  fontWeight: 500,
                },
                root: {
                  color: "rgba(0, 0, 0, 0.6)",
                },
              }}
            />
          </Modal>

          <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
            <Select
              size="md"
              label="Shift"
              placeholder="Schedule 001"
              withAsterisk
              radius={8}
              data={["Next Day", "Same Day"]}
              rightSection={<IconCaretDownFilled size={18} />}
              className="border-none w-full"
              styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            />
            <TextInput
              size="md"
              radius={8}
              label="Reference No."
              placeholder="0000-0000-0000"
              withAsterisk
              className="w-full"
              value={value}
              onChange={handleChange}
              max={14}
              styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            />
          </Flex>

          <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
            <TimeInput
              size="md"
              radius={8}
              label="Actual Offset In"
              disabled
              // withAsterisk
              className="w-full"
              styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            />
            <TimeInput
              size="md"
              radius={8}
              label="Actual Offset out"
              disabled
              // withAsterisk
              className="w-full"
              styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            />
          </Flex>

          <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
            <TimeInput
              size="md"
              radius={8}
              label="Offset From"
              withAsterisk
              className="w-full"
              styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              ref={ref}
              rightSection={pickerControl}
            />
            <TimeInput
              size="md"
              radius={8}
              label="Offset From"
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
            placeholder="Briefly state the reason for filing offset"
            withAsterisk
            className="w-full"
            styles={{
              input: { height: "100px" },
              label: { fontSize: "16px", color: "#6d6d6d" },
            }}
            radius={8}
          />
          <Dropzone
            content={
              <Group gap={5}>
                <Text size="xl" c="#6d6d6d" inline className="flex justify-center">
                  Drag & drop files or
                </Text>
                <Text size="xl" className="text-blue-400 underline">
                  Browse
                </Text>
              </Group>
            }
          />
          <Flex justify="flex-end" className="w-full">
            <Button
              variant="transparent"
              size="md"
              radius={10}
              w={127}
              onClick={() => {
                successReqOpen();
                onClose();
              }}
              children={
                <Text fw={500} c="white">
                  SUBMIT
                </Text>
              }
              classNames={{ root: "br-gradient" }}
            />
          </Flex>
        </Group>
      </Modal>
      <SuccessRequest opened={successReq} onClose={successReqClose} buttonClose={successReqClose} />
    </>
  );
}
