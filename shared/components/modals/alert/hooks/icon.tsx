import { IconChecklist, IconExclamationCircle } from "@tabler/icons-react";
import styles from "../index.module.css";

export const getModalIcon = (variant: "primary" | "warning") => {
  switch (variant) {
    case "primary":
      return <IconChecklist size={32} className={styles.primaryIcon} />;

    case "warning":
      return <IconExclamationCircle size={32} className={styles.warningIcon} />;
    default:
      return null;
  }
};
