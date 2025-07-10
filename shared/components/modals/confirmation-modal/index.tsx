import { Modal } from "@mantine/core";
import { ModalHeader } from "./components/ModalHeader";
import { ModalBody } from "./components/ModalBody";
import { ModalFooter } from "./components/ModalFooter";
import styles from "./assets/style/modal.module.css";
import { useModalStore } from "./store/useModalStore";

export function ConfirmationModal() {
  const { isOpen, header, body, footer, width, closeModal } = useModalStore();

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      size={width ?? "md"}
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
        {header && <ModalHeader>{header}</ModalHeader>}
        {body && <ModalBody>{body}</ModalBody>}
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </div>
    </Modal>
  );
}
