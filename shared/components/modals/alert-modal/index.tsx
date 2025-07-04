import { Modal } from "@mantine/core";
import { ModalBody } from "./components/ModalBody";
import styles from "./assets/style/modal.module.css";
import { useModalStore } from "./store/useModalStore";
import { ModalHeader } from "./components/ModalHeader";

export function AlertModal() {
  const { isOpen, width, closeModal } = useModalStore();

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      size={width ?? "md"}
      centered
      withCloseButton={false}
      padding={0}
      overlayProps={{
        backgroundOpacity: 0.1,
      }}
      styles={{
        content: {
          padding: 0,
          margin: "auto",
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
      }}
      className="flex w-screen m-auto justify-center items-center">
      <div className={styles.container}>
        <ModalHeader />
        <ModalBody />
      </div>
    </Modal>
  );
}
