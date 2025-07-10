import { Modal, ModalProps } from "@mantine/core";
import { ModalHeader } from "./components/ModalHeader";
import { ModalBody } from "./components/ModalBody";
import { ModalFooter } from "./components/ModalFooter";
import styles from "./modal.module.css";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface IBasicModal extends Omit<ModalProps, "children"> {
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  containerClassName?: string;
  closeButton?: ReactNode;
  buttonClose?: () => void;
}

export function BasicModal({
  opened,
  onClose,
  buttonClose,
  title,
  children,
  footer,
  size = "md",
  centered = true,
  withCloseButton = false,
  overlayProps = { backgroundOpacity: 0.1 },
  radius = 12,
  padding = 0,
  classNames,
  styles: sx,
  containerClassName,
  closeButton,
  ...rest
}: IBasicModal) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size={size}
      centered={centered}
      withCloseButton={withCloseButton}
      radius={radius}
      padding={padding}
      overlayProps={overlayProps}
      classNames={{
        content: styles.modalOverrides,
        body: styles.modalOverrides,
        inner: styles.modalOverrides,
        ...classNames,
      }}
      styles={{
        content: {
          padding: 0,
          margin: 0,
          border: "none",
          background: "transparent",
          boxShadow: "none",
        },
        body: {
          padding: 0,
          margin: 0,
          boxShadow: "none",
        },
        ...sx,
      }}
      {...rest}>
      <div className={cn(styles.modalContainer, containerClassName)}>
        <ModalHeader title={title} onClose={buttonClose} />

        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </div>
    </Modal>
  );
}
