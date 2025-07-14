/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { ModalProps } from "@shared/assets/types/Modal";
import Confirmation from "@shared/ui/modals/confirmation";

export default function index({ opened, onClose }: ModalProps) {
  return (
    <Confirmation
      opened={opened}
      onClose={onClose}
      variant="warning"
      title="Update Request"
      description="Are you sure you want to update this request? this will override your existing filing details"
      yes={{ onClick: () => {}, title: "Confirm" }}
      no={{ onClick: () => {}, title: "Keep Editing" }}
    />
  );
}
