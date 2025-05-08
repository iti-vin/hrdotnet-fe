import { Divider, Modal, Text, Popover, Stack } from "@mantine/core";
import { IconClipboard, IconCopy, IconFileDownload, IconX } from "@tabler/icons-react";
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
  exportBtn?(): void;
  copyBtn?(): void;
  pasteBtn?(): void;
}
export default function CustomModal({ ...props }: ModalProps) {
  const {
    opened,
    onClose,
    buttonClose,
    size = "xs",
    children,
    centered = true,
    title = "Modal",
    radius,
    exportBtn,
    copyBtn,
    pasteBtn,
  } = props;
  const [openedCopy, { close: closeCopy, open: openCopy }] = useDisclosure(false);
  const [openedPaste, { close: closePaste, open: openPaste }] = useDisclosure(false);
  const [openedExport, { close: closeExport, open: openExport }] = useDisclosure(false);
  const small = useMediaQuery("(max-width: 40em)");
  const smallSizing = small ? 20 : 30;
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
      <Stack className="gap-0" px={smallSizing} pt={smallSizing}>
        <div className="flex justify-between">
          <Text fw={600} fz={small ? 15 : 22} c="#559CDA">
            {title}
          </Text>
          <div className="flex gap-2">
            {copyBtn && (
              <Popover width={"auto"} position="bottom" withArrow shadow="md" opened={openedCopy}>
                <Popover.Target>
                  <IconCopy
                    onClick={copyBtn}
                    onMouseEnter={openCopy}
                    onMouseLeave={closeCopy}
                    className="cursor-pointer"
                    size={smallSizing}
                    color="gray"
                  />
                </Popover.Target>
                <Popover.Dropdown style={{ pointerEvents: "none" }}>
                  <Text size="xs">Copy</Text>
                </Popover.Dropdown>
              </Popover>
            )}
            {pasteBtn && (
              <Popover width={"auto"} position="bottom" withArrow shadow="md" opened={openedPaste}>
                <Popover.Target>
                  <IconClipboard
                    onClick={pasteBtn}
                    onMouseEnter={openPaste}
                    onMouseLeave={closePaste}
                    className="cursor-pointer"
                    size={smallSizing}
                    color="gray"
                  />
                </Popover.Target>
                <Popover.Dropdown style={{ pointerEvents: "none" }}>
                  <Text size="xs">Paste</Text>
                </Popover.Dropdown>
              </Popover>
            )}
            {exportBtn && (
              <Popover width={"auto"} position="bottom" withArrow shadow="md" opened={openedExport}>
                <Popover.Target>
                  <IconFileDownload
                    onClick={exportBtn}
                    onMouseEnter={openExport}
                    onMouseLeave={closeExport}
                    className="cursor-pointer"
                    size={smallSizing}
                    color="gray"
                  />
                </Popover.Target>
                <Popover.Dropdown style={{ pointerEvents: "none" }}>
                  <Text size="xs">Export</Text>
                </Popover.Dropdown>
              </Popover>
            )}
            <IconX className="cursor-pointer" onClick={buttonClose} size={smallSizing} color="gray" />
          </div>
        </div>
        <Divider size="xs" color="#6D6D6D" mt={10} />
      </Stack>

      <Stack className="flex flex-col gap-5 mt-3 w-full text-[#6d6d6d]" pb={smallSizing}>
        {children}
      </Stack>
    </Modal>
  );
}
