import { Divider, Modal, ModalProps } from "@mantine/core";
import styles from "./index.module.css";
import { PropsWithChildren, useEffect } from "react";
import { getModalIcon } from "./hooks/icon";

export interface IAlertModal extends ModalProps, PropsWithChildren {
  opened: boolean;
  onClose: () => void;
  variant?: "primary" | "warning";
  header?: string;
  body?: string;
  duration?: number;
  successFilings?: string;
  failedFilings?: string;
}
export default function AlertModal({ opened, onClose, variant = "warning", header, body, duration = 5000, overlayProps }: IAlertModal) {
  const variantOverlayProps = {
    primary: { backgroundOpacity: 0.03 },
    warning: { backgroundOpacity: 0.1 },
  };
  const resolvedOverlayProps = overlayProps ?? variantOverlayProps[variant];
  useEffect(() => {
    if (opened) {
      const timeout = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [opened, duration, onClose]);
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        withCloseButton={false}
        centered
        overlayProps={resolvedOverlayProps}
        size="auto"
        styles={{
          content: {
            padding: 0,
            margin: 0,
            borderRadius: "10px",
            boxShadow: "none",
            maxWidth: "none",
          },
          body: {
            padding: 0,
            margin: 0,
            borderRadius: "10px",
          },
        }}>
        <div className={styles.container}>
          <h1 className={`${styles.header} ${variant === "primary" ? styles.primaryHeader : styles.warningHeader}`}>{header}</h1>
          <Divider className={styles.divider} />
          {getModalIcon(variant)}
          <p className={styles.body}>{body}</p>
        </div>
      </Modal>
    </>
  );
}
