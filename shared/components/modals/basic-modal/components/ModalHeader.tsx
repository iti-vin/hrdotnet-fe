import { X } from "lucide-react";
import styles from "../modal.module.css";
import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  onClose?: () => void;
}

export const ModalHeader: React.FC<Props> = ({ title = "Sample", onClose }) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <button onClick={onClose}>
        <X className={styles.closeIcon} />
      </button>
    </div>
  );
};
