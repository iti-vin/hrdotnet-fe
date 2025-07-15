/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { ModalProps } from "@shared/assets/types/Modal";
import Confirmation from "@shared/ui/modals/confirmation";

export default function CancelConfirmation({ opened, onClose }: ModalProps) {
  return (
    <Confirmation
      opened={opened}
      onClose={onClose}
      variant="warning"
      title="Cancel Request"
      description={<div>Are you sure you want to cancel this request? </div>}
      yes={{ onClick: () => {}, title: "Confirm" }}
      no={{ onClick: () => {}, title: "Discard" }}
    />
  );
}
