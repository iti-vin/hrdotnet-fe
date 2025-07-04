import { Modal } from "@mantine/core";
import { ModalHeader } from "./ModalHeader";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import styles from "./modal.module.css";
import { useModalStore } from "../store/useModalStore";

export const ModalFactory = () => {
  const { isOpen, title, subtitle, content, footer, type, width, closeModal } = useModalStore();

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
      transitionProps={{
        transition: "slide-up",
        duration: 300,
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
      <div className={`${styles.modalContainer}`} data-type={type}>
        <ModalHeader title={title} subtitle={subtitle} type={type} />
        <ModalBody>{content}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </div>
    </Modal>
  );
};
