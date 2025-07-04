import { X } from "lucide-react";
import styles from "../modal.module.css";
import { useModalStore } from "../store/useModalStore";

interface Props {
  title: string;
}

export const ModalHeader: React.FC<Props> = ({ title }) => {
  const closeModal = useModalStore((state) => state.closeModal);
  const handleCloseModal = () => {
    closeModal();
  };
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <button onClick={handleCloseModal}>
        <X className={styles.closeIcon} />
      </button>
    </div>
  );
};
