/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Alert from "@/layout/main/alert";
import { ModalProps } from "@shared/assets/types/Modal";

export default function index({ opened, onClose }: ModalProps) {
  return (
    <Alert
      opened={opened}
      onClose={onClose}
      headerTitle="Update Request"
      size="lg"
      icon="Warning"
      title="Are you sure you want to update this request? this will override your existing filing details"
      yes={{
        onClick: () => {},
      }}
      no={{
        onClick: () => {},
      }}
    />
  );
}
