import { Button, Divider, Flex, Modal, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ModalProps } from "@shared/assets/types/Modal";
import { IconCircleCheckFilled } from "@tabler/icons-react";

export default function SummaryDetails({ opened, onClose, buttonClose }: ModalProps) {
  const small = useMediaQuery("(max-width: 40em)");
  return (
    <Modal
      opened={opened}
      size="lg"
      centered
      padding={small ? 20 : 30}
      radius={10}
      withCloseButton={false}
      onClose={onClose}
      styles={{ body: { overflow: "hidden" } }}>
      <Stack className="flex justify-between">
        <Text fw={600} fz={small ? 15 : 22} c={"#559CDA"}>
          Summary Details
        </Text>
      </Stack>
      <Divider size="xs" color="#6D6D6D" mt={10} />
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

      <Stack className="flex flex-row w-full justify-end mt-5">
        <Button variant="outline" className="rounded-md w-44" onClick={buttonClose}>
          BACK
        </Button>
        <Button className="rounded-md br-gradient border-none w-44" onClick={() => {}}>
          SUBMIT
        </Button>
      </Stack>
    </Modal>
  );
}
