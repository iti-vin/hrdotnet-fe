/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Alert from "@/layout/main/alert";
import { ModalProps } from "@shared/assets/types/Modal";
import { useEffect } from "react";

export default function Cancel({ opened, onClose }: ModalProps) {
  useEffect(() => {
    if (opened) {
      const timer = setTimeout(onClose!, 3000);
      return () => clearTimeout(timer);
    }
  }, [opened, onClose]);
  return <Alert opened={opened} onClose={onClose} headerTitle={`Requested Cancelled`} size="lg" icon="Danger" title={`Your request has been cancelled!`} />;
}
