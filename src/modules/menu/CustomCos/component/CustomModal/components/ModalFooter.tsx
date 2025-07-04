import type { ReactNode } from "react";
import styles from "./modal.module.css";

export const ModalFooter: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.footer}>{children}</div>;
};
