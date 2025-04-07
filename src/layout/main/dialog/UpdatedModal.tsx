import { Divider, Modal, Text, Popover, Stack } from "@mantine/core";
import { IconFileDownload, IconX } from "@tabler/icons-react";
import "@shared/template/index.css";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  buttonClose?: () => void;
  size?: string;
  children?: React.ReactNode;
  centered?: boolean;
  title?: string;
  radius?: string | number;
  isIconsActionsRequired?: boolean;
  downloadBtn?(): void;
}
export default function index({ ...props }: ModalProps) {
  const {
    opened,
    onClose,
    buttonClose,
    size = "xs",
    children,
    centered = true,
    title = "Modal",
    radius,
    isIconsActionsRequired = true,
    downloadBtn,
  } = props;
  const [openedExport, { close: closeExport, open: openExport }] = useDisclosure(false);
  const small = useMediaQuery("(max-width: 40em)");
  return (
    <Modal
      radius={radius || 10}
      opened={opened}
      onClose={onClose}
      centered={centered}
      size={small ? "100%" : size}
      withCloseButton={false}
      className="p-0"
      styles={{ body: { overflow: "hidden", padding: 0 } }}>
      <Stack className="gap-0 px-10 pt-10">
        <div className="flex justify-between">
          <Text fw={600} fz={small ? 15 : 22} c="#559CDA">
            {title}
          </Text>
          <div className="flex gap-2">
            {isIconsActionsRequired && (
              <Popover width={"auto"} position="bottom" withArrow shadow="md" opened={openedExport}>
                <Popover.Target>
                  <IconFileDownload
                    onClick={downloadBtn}
                    onMouseEnter={openExport}
                    onMouseLeave={closeExport}
                    className="cursor-pointer"
                    size={30}
                    color="gray"
                  />
                </Popover.Target>
                <Popover.Dropdown style={{ pointerEvents: "none" }}>
                  <Text size="xs">Download</Text>
                </Popover.Dropdown>
              </Popover>
            )}
            <IconX className="cursor-pointer" onClick={buttonClose} size={30} color="gray" />
          </div>
        </div>
        <Divider size="xs" color="#6D6D6D" mt={10} />
      </Stack>

      <Stack className="flex flex-col gap-5 mt-3 w-full text-[#6d6d6d] pb-10">{children}</Stack>
    </Modal>
  );
}
