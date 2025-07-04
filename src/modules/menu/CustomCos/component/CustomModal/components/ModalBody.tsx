import type { ReactNode } from "react";
import styles from "./modal.module.css";

export const ModalBody: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.body}>{children}</div>;
};
