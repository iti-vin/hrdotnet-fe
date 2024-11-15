import { IconCaretDownFilled, IconDots } from "@tabler/icons-react";
import { Modal, Dropzone } from "@shared/template/";

import {
  Button,
  Flex,
  Group,
  MultiSelect,
  Select,
  Text,
  Textarea,
  TextInput,
  useMatches,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";

interface ModalRequest {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function NewRequest({
  opened,
  onClose,
  buttonClose,
}: ModalRequest) {
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
      title="New Request"
    >
      <Group px={20} className="w-full">
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
            radius={8}
            data={["React", "Angular", "Vue", "Svelte"]}
            rightSection={<IconCaretDownFilled />}
            className="border-none w-full"
          />
          <TextInput
            variant="filled"
            size="md"
            radius={8}
            label="Reference No."
            placeholder="0000-0000-0000"
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
        <Textarea
          size="md"
          label="Reason"
          placeholder="Briefly state the reason for filing overtime"
          withAsterisk
          className="w-full"
          styles={{ input: { height: "100px" } }}
          radius={8}
        />
        <Dropzone
          content={
            <Group gap={5}>
              <Text
                size="xl"
                c="#6d6d6d"
                inline
                className="flex justify-center"
              >
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
            children={
              <Text fw={500} c="white">
                Filter
              </Text>
            }
            classNames={{ root: "br-gradient" }}
          />
        </Flex>
      </Group>
    </Modal>
  );
}
