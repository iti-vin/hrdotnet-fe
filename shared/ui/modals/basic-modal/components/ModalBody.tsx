import type { ReactNode } from "react";
import styles from "../modal.module.css";

interface IModalBody {
  children: ReactNode;
}
export function ModalBody({ children }: IModalBody) {
  return <div className={styles.body}>{children}</div>;
}
