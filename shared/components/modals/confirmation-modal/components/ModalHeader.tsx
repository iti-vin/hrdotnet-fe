import { ReactNode } from "react";
import styles from "../assets/style/modal.module.css";

interface IModalHeader {
  children: ReactNode;
}

export function ModalHeader({ children }: IModalHeader) {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{children}</div>
    </div>
  );
}
