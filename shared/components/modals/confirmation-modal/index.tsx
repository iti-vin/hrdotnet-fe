import { Modal, ModalProps } from "@mantine/core";
import { ModalHeader } from "./components/ModalHeader";
import { ModalBody } from "./components/ModalBody";
import { ModalFooter } from "./components/ModalFooter";
import styles from "./assets/style/modal.module.css";
import { ReactNode } from "react";

export interface IConfirmationModal extends Omit<ModalProps, "children"> {
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  containerClassName?: string;
  closeButton?: ReactNode;
  buttonClose?: () => void;
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
}

export function ConfirmationModal({
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
  formProps,
  ...rest
}: IConfirmationModal) {
  return (
    <Modal
      {...rest}
      opened={opened}
      onClose={onClose}
      size={size}
      centered
      withCloseButton={false}
      radius={12}
      padding={0}
      overlayProps={{
        backgroundOpacity: 0.1,
      }}
      classNames={{
        content: styles.modalOverrides,
        body: styles.modalOverrides,
        inner: styles.modalOverrides,
      }}
      styles={{
        content: {
          padding: 0,
          margin: 0,
          border: "none",
          background: "transparent",
          boxShadow: "none",
          justifyItems: "center",
        },
        body: {
          padding: 0,
          margin: 0,
          boxShadow: "none",
        },
      }}>
      <div className={styles.modalContainer}>
        {title && <ModalHeader>{title}</ModalHeader>}

        {formProps ? (
          <form {...formProps} className="h-full flex flex-col justify-between">
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </form>
        ) : (
          <>
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </>
        )}
      </div>
    </Modal>
  );
}
