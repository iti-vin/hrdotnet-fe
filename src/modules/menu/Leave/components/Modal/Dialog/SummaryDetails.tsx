import { Flex, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ModalProps } from "@shared/assets/types/Modal";
import { Button, Confirmation } from "@shared/components";

export default function SummaryDetails({ opened, onClose, buttonClose }: ModalProps) {
  const small = useMediaQuery("(max-width: 40em)");
  return (
    <Confirmation
      opened={opened}
      title="Summary Details"
      size="lg"
      centered
      padding={small ? 20 : 30}
      radius={10}
      withCloseButton={false}
      onClose={onClose}
      styles={{ body: { overflow: "hidden" } }}
      formProps={{ onSubmit: () => {} }}
      footer={
        <Stack className="flex flex-row w-full justify-end mt-5">
          <Button variant="outline" className="border-[#559cda] text-[#559cda]" radius="md" h={40} w={100} onClick={buttonClose}>
            BACK
          </Button>
          <Button variant="gradient" radius="md" type="submit" h={40} w={100} onClick={() => {}}>
            SUBMIT
          </Button>
        </Stack>
      }>
      <Stack className="w-full h-full p-4">
        <Flex gap={10} align="center">
          <Text c="#559cda" fw={700}>
            Leave Date From & Leave Date To :
          </Text>
          <Text c="#6d6d6d" fw={400}>
            January 01-03, 2002
          </Text>
        </Flex>
        <Flex gap={10} align="center">
          <Text c="#559cda" fw={700}>
            Leave Type :
          </Text>
          <Text c="#6d6d6d" fw={400}>
            Sick Leave
          </Text>
        </Flex>
        <Flex gap={10} align="center">
          <Text c="#559cda" fw={700}>
            Leave Option :
          </Text>
          <Text c="#6d6d6d" fw={400}>
            Whole Day
          </Text>
        </Flex>
        <Flex gap={10} align="center">
          <Text c="#559cda" fw={700}>
            Reason:
          </Text>
          <Text c="#6d6d6d" fw={400}>
            I don't wanna live forever cause I know I'll be living in vain
          </Text>
        </Flex>
      </Stack>
    </Confirmation>
  );
}
