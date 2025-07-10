import { Flex, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ModalProps } from "@shared/assets/types/Modal";
import { Button, Confirmation } from "@shared/components";

export default function SummaryDetails({ opened, onClose, buttonClose }: ModalProps) {
  const small = useMediaQuery("(max-width: 40em)");
  return (
    <Confirmation
      opened={opened}
      size="lg"
      title="Summary Details"
      centered
      padding={small ? 20 : 30}
      radius={10}
      withCloseButton={false}
      onClose={onClose}
      styles={{ body: { overflow: "hidden" } }}
      footer={
        <Stack className="flex flex-row w-full justify-end">
          <Button variant="outline" className="text-[#559cda] border-[#559cda]" w={100} h={35} onClick={buttonClose}>
            BACK
          </Button>
          <Button variant="gradient" w={100} h={35} onClick={() => {}}>
            SUBMIT
          </Button>
        </Stack>
      }>
      <Stack className="w-full h-full p-4">
        <Flex gap={10} align="center">
          <Text c="#559cda" fw={700}>
            Date Filed :
          </Text>
          <Text c="#6d6d6d" fw={400}>
            January 01, 2002
          </Text>
        </Flex>
        <Flex gap={10} align="center">
          <Text c="#559cda" fw={700}>
            Actual Time In and Out :
          </Text>
          <Text c="#6d6d6d" fw={400}>
            Same Day
          </Text>
        </Flex>
        <Flex gap={10} align="center">
          <Text c="#559cda" fw={700}>
            Requested Time In and Out :
          </Text>
          <Text c="#6d6d6d" fw={400}>
            08:00 AM - 05:00 PM
          </Text>
        </Flex>
        <Flex gap={10} align="center">
          <Text c="#559cda" fw={700}>
            Rest Day :
          </Text>
          <Text c="#6d6d6d" fw={400}>
            08:00 AM - 05:00 PM
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
