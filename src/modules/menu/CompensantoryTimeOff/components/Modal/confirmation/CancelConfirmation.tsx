/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Alert from "@/layout/main/alert";

import { ModalProps } from "@shared/assets/types/Modal";

export default function CancelConfirmation({ opened, onClose }: ModalProps) {
  return (
    <Alert
      opened={opened}
      onClose={onClose}
      headerTitle="CANCEL REQUEST"
      size="lg"
      icon="Warning"
      title="Are you sure you want to cancel this Overtime request?"
      description="Filing deadline for this cutoff period will end in a day."
      yes={{
        onClick: () => {},
      }}
      no={{
        onClick: () => {},
      }}
    />
  );
}
