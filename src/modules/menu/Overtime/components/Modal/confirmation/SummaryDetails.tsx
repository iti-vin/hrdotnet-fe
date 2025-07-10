import { Button, Flex, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ModalProps } from "@shared/assets/types/Modal";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { ConfirmationModal as Modal } from "@shared/components/modals/confirmation-modal";

export default function SummaryDetails({ opened, onClose, buttonClose }: ModalProps) {
  const small = useMediaQuery("(max-width: 40em)");
  return (
    <Modal
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
          <Button variant="outline" className="rounded-md w-44" onClick={buttonClose}>
            BACK
          </Button>
          <Button className="rounded-md br-gradient border-none w-44" onClick={() => {}}>
            SUBMIT
          </Button>
        </Stack>
      }>
      <Stack className="w-full h-full p-4">
        <Flex gap={10} align="center">
          <Text c="#559cda" fw={700}>
            Date From & Date To :
          </Text>
          <Text c="#6d6d6d" fw={400}>
            January 01-03, 2002
          </Text>
        </Flex>
        <Flex gap={10} align="center">
          <Text c="#559cda" fw={700}>
            Requested Schedule :
          </Text>
          <Text c="#6d6d6d" fw={400}>
            Same Day
          </Text>
        </Flex>
        <Flex gap={10} align="center">
          <Text c="#559cda" fw={700}>
            Reference No :
          </Text>
          <Text c="#6d6d6d" fw={400}>
            RFN1932782264
          </Text>
        </Flex>
        <Flex gap={10} align="center">
          <Text c="#559cda" fw={700}>
            Rest Day :
          </Text>
          <IconCircleCheckFilled size={20} color="green" />
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
    </Modal>
  );
}
