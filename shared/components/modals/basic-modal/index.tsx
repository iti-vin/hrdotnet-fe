import { Modal } from "@mantine/core";
import { ModalHeader } from "./components/ModalHeader";
import { ModalBody } from "./components/ModalBody";
import { ModalFooter } from "./components/ModalFooter";
import styles from "./modal.module.css";
import { useModalStore } from "./store/useModalStore";

export function BasicModal() {
  const { isOpen, title, content, footer, width, closeModal } = useModalStore();

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
        },
        body: {
          padding: 0,
          margin: 0,
          boxShadow: "none",
        },
      }}>
      <div className={styles.modalContainer}>
        <ModalHeader title={title} />
        <ModalBody>{content}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </div>
    </Modal>
  );
}
