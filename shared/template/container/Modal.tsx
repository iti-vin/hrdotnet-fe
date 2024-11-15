import { Divider, Flex, Modal, Stack, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import "@shared/template/index.css";
interface ModalProps {
  opened: boolean;
  onClose: () => void;
  buttonClose?: () => void;
  size?: string;
  children?: React.ReactNode;
  centered?: boolean;
  title?: string;
  visibleClose?: boolean;
}
export default function ITIModal({
  opened,
  onClose,
  buttonClose,
  size = "xs",
  children,
  centered = true,
  title = "Modal",
  visibleClose = true,
}: ModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered={centered}
      size={size}
      withCloseButton={false}
    >
      <Stack className="w-full  py-4 px-6">
        <Flex direction="row" justify="space-between">
          <Text fw={600} fz={22} c="#559CDA">
            {title}
          </Text>
          {visibleClose && (
            <IconX
              className="cursor-pointer"
              onClick={buttonClose}
              size={30}
              color="gray"
            />
          )}
        </Flex>
        <Divider size={2} color="#c9cac9" className="w-full" />
      </Stack>
      <Stack>{children}</Stack>
    </Modal>
  );
}
