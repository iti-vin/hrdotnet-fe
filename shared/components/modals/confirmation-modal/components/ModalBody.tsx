import styles from "../assets/style/modal.module.css";
import { ReactNode } from "react";

interface IModalBody {
  children: ReactNode;
}
export function ModalBody({ children }: IModalBody) {
  return (
    <div className={styles.bodyContainer}>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
