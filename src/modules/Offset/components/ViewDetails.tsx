import {
  IconCalendar,
  IconChevronDown,
  IconDots,
  IconNotes,
} from "@tabler/icons-react";
import { Modal } from "@shared/template/";

import {
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
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size={size}
      buttonClose={buttonClose}
      title="View Details"
    >
      <Container size="lg" className="container-view">
        <Text className="text-[#559cda] font-bold">General Information</Text>

        <Group gap={10}>
          <MultiSelect
            size="md"
            label="Offset Date"
            withAsterisk
            placeholder="Select Offset Date"
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
              placeholder="Shift"
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
              label="Actual Offset In"
              withAsterisk
              className="w-full"
            />
            <TimeInput
              size="md"
              radius={8}
              label="Actual Offset out"
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
              label="Offset From"
              withAsterisk
              className="w-full"
            />
            <TimeInput
              size="md"
              radius={8}
              label="Offset To"
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
              Status<span className="text-red-400 font-semibold">*</span>
            </Text>
            <Text
              size="md"
              className="w-full flex flex-col text-center justify-center h-10 rounded-md"
              c="white"
              bg="violet"
              children="Filed"
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
              placeholder="0000-0000-0000"
              withAsterisk
              className="w-full"
            />
            <DatePickerInput
              valueFormat="YYYY MMM DD"
              label="Transaction Date"
              placeholder="mm/dd/yyyy"
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
          placeholder="Briefly state the reason for filing overtime"
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
    </Modal>
  );
}
