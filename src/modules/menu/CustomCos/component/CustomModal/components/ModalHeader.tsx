import { X } from "lucide-react";
import styles from "./modal.module.css";
import { ActionIcon } from "@mantine/core";
import { useModalStore } from "../store/useModalStore";

interface Props {
  title: string;
  subtitle?: string;
  type: "info" | "warning" | "success" | "error";
}

export const ModalHeader: React.FC<Props> = ({ title, type }) => {
  const closeModal = useModalStore((state) => state.closeModal);
  const handleCloseModal = () => {
    closeModal();
  };
  return (
    <div className={styles.header} data-type={type}>
      <div className={styles.headerContent}>
        <div className={styles.title}>{title}</div>
        <ActionIcon variant="transparent" onClick={handleCloseModal} color="#6D6D6D">
          <X />
        </ActionIcon>
      </div>
    </div>
  );
};
