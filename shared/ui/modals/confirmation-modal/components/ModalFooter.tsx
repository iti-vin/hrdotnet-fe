import { ReactNode } from "react";
import styles from "../assets/style/modal.module.css";

interface IModalFooter {
  children?: ReactNode;
}

export function ModalFooter({ children }: IModalFooter) {
  return <div className={styles.footer}>{children}</div>;
}
