import React from "react";
import {
  IconCalendar,
  IconChevronDown,
  IconDots,
  IconNotes,
} from "@tabler/icons-react";
import { Modal } from "@shared/template/";

import {
  Button,
  Container,
  Flex,
  Group,
  MultiSelect,
  Select,
  Text,
  Textarea,
  TextInput,
  useMatches,
} from "@mantine/core";
import { DatePickerInput, DateTimePicker, TimeInput } from "@mantine/dates";
import Attachment from "@shared/template/main/Dropzone";
import { useOvertimeStore } from "@/modules/Overtime/store/useOT";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";

interface ModalViewProps {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function ViewDetails({
  opened,
  onClose,
  buttonClose,
}: ModalViewProps) {
  const size = useMatches({
    base: "100%",
    sm: "70%",
  });

  const { selectedData, setSelectedData } = useOvertimeStore();

  let color;
  switch (selectedData.filingStatus) {
    case "Filed":
      color = "#9B51E0";
      break;
    case "Approved":
      color = "#1E8449";
      break;
    case "Cancelled":
      color = "#FF4B34";
      break;
    case "Reviewed":
      color = "#FF7800";
      break;
    default:
      color = "gray";
  }
  const [timeValue, setTimeValue] = React.useState("10:30 AM");

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setSelectedData({});
        onClose();
      }}
      centered
      size={size}
      buttonClose={() => {
        setSelectedData({});
        buttonClose();
      }}
      title="View Details"
    >
      <Container size="lg" className="container-view">
        <Text className="text-[#559cda] font-bold">General Information</Text>
        <Group gap={10}>
          <MultiSelect
            size="md"
            label="Overtime Date"
            withAsterisk
            placeholder={selectedData.dateFiled}
            radius={8}
            data={["React", "Angular", "Vue", "Svelte"]}
            rightSection={<IconDots />}
            className="border-none w-full"
          />
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            className="w-full"
            gap={20}
          >
            <Select
              size="md"
              label="Shift"
              withAsterisk
              placeholder="Schedule 001"
              radius={8}
              data={["React", "Angular", "Vue", "Svelte"]}
              rightSection={<IconChevronDown />}
              className="border-none w-full"
            />
            <TextInput
              size="md"
              radius={8}
              label="Reference No."
              placeholder="0000-0000-0000"
              withAsterisk
              className="w-full"
              disabled
            />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            className="w-full"
            gap={20}
          >
            <TimeInput
              size="md"
              radius={8}
              label="Actual OT In"
              withAsterisk
              className="w-full"
              value={timeValue}
              placeholder={timeValue}
              onChange={(value: any) => setTimeValue(value)}
            />
            <TimeInput
              size="md"
              radius={8}
              label="Actual OT out"
              value={DateTimeUtils.getIsoTimeDefaultWithUnits(
                selectedData.actualFrom
              )}
              placeholder={DateTimeUtils.getIsoTimeDefaultWithUnits(
                selectedData.actualFrom
              )}
              withAsterisk
              className="w-full"
            />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            className="w-full"
            gap={20}
          >
            <TimeInput
              size="md"
              radius={8}
              label="OT From"
              withAsterisk
              className="w-full"
            />
            <TimeInput
              size="md"
              radius={8}
              label="OT To"
              withAsterisk
              className="w-full"
            />
          </Flex>
          <DatePickerInput
            valueFormat="YYYY MMM DD"
            label="Duration"
            placeholder="Pick date"
            className="w-full"
            size="md"
            radius={8}
            withAsterisk
            rightSection={<IconCalendar />}
          />
        </Group>
      </Container>

      <Container size="lg" className="container-view">
        <Text className="text-[#559cda] font-bold">Detailed Information</Text>

        <Group className="w-full">
          <Flex direction="column" className="w-full" gap={2}>
            <Text size="md" fw={500} className=" flex gap-1">
              Status
              <span className="text-red-400 font-semibold">*</span>
            </Text>
            <Text
              size="md"
              className="w-full flex flex-col text-center justify-center h-10 rounded-md"
              c="white"
              bg={color}
              children={selectedData.filingStatus}
            />
          </Flex>

          <Flex
            direction={{ base: "column", sm: "row" }}
            className="w-full"
            gap={20}
          >
            <TextInput
              size="md"
              radius={8}
              label="Document No."
              placeholder={selectedData.documentNo}
              withAsterisk
              className="w-full"
            />
            <DatePickerInput
              valueFormat="YYYY MMM DD"
              label="Transaction Date"
              placeholder={selectedData.dateTransaction}
              className="w-full"
              size="md"
              radius={8}
              withAsterisk
              rightSection={<IconCalendar />}
            />
          </Flex>

          <Flex
            direction={{ base: "column", sm: "row" }}
            className="w-full"
            gap={20}
          >
            <DateTimePicker
              valueFormat="YYYY MMM DD"
              label="Endorsement Date and Time"
              placeholder="mm/dd/yyyy h:mm"
              className="w-full"
              size="md"
              radius={8}
              withAsterisk
              rightSection={<IconCalendar />}
            />
            <TextInput
              size="md"
              radius={8}
              label="Endorsed By"
              placeholder="Reviewer's Name"
              withAsterisk
              className="w-full"
            />
            <TextInput
              size="md"
              radius={8}
              label="Endorsement Type"
              placeholder="Manual"
              withAsterisk
              className="w-full"
            />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            className="w-full"
            gap={20}
          >
            <DateTimePicker
              valueFormat="YYYY MMM DD"
              label="Endorsement Date and Time"
              placeholder="mm/dd/yyyy h:mm"
              className="w-full"
              size="md"
              radius={8}
              withAsterisk
              rightSection={<IconCalendar />}
            />
            <TextInput
              size="md"
              radius={8}
              label="Endorsed By"
              placeholder="Reviewer's Name"
              withAsterisk
              className="w-full"
            />
            <TextInput
              size="md"
              radius={8}
              label="Endorsement Type"
              placeholder="Manual"
              withAsterisk
              className="w-full"
            />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            className="w-full"
            gap={20}
          >
            <DateTimePicker
              valueFormat="YYYY MMM DD"
              label="Endorsement Date and Time"
              placeholder="mm/dd/yyyy h:mm"
              className="w-full"
              size="md"
              radius={8}
              withAsterisk
              rightSection={<IconCalendar />}
            />
            <TextInput
              size="md"
              radius={8}
              label="Endorsed By"
              placeholder="Reviewer's Name"
              withAsterisk
              className="w-full"
            />
            <TextInput
              size="md"
              radius={8}
              label="Endorsement Type"
              placeholder="Manual"
              withAsterisk
              className="w-full"
            />
          </Flex>
        </Group>
      </Container>

      <Container size="lg" className="container-view">
        <Textarea
          size="md"
          label="Reason"
          placeholder={selectedData.reason}
          withAsterisk
          className="w-full"
          styles={{ input: { height: "100px" } }}
          radius={8}
          classNames={{ label: "text-[#559cda] font-bold" }}
        />
      </Container>

      <Container size="lg" className="container-view">
        <Attachment
          isColored
          isBold
          content={
            <Flex gap={5} direction="column" align="center">
              <Flex direction="row" align="center" gap={5}>
                <IconNotes color="#6d6d6d" />
                <Text
                  size="md"
                  c="#6d6d6d"
                  fw={500}
                  inline
                  className="flex justify-center"
                >
                  File: Attachment.pdf Size: 20mb
                </Text>
              </Flex>
              <Text size="xs" c="#6d6d6d">
                Replace existing
                <span className="text-blue-400 underline">File.</span>
              </Text>
            </Flex>
          }
        />
      </Container>

      <Container size="lg" className="container-view">
        <Textarea
          size="md"
          label="Edit Log"
          disabled
          placeholder="Briefly state the reason for filing overtime"
          className="w-full"
          styles={{ input: { height: "100px" } }}
          radius={8}
          classNames={{ label: "text-[#559cda] font-bold" }}
        />
      </Container>

      <Flex px={10} align="center" justify="flex-end" gap={10}>
        <Button variant="outline" size="md" radius={10} w={180}>
          Cancel
        </Button>
        <Button size="md" radius={10} w={180} classNames={{ root: "test" }}>
          Update
        </Button>
      </Flex>
    </Modal>
  );
}
