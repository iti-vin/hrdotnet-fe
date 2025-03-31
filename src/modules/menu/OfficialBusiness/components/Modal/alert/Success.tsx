/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Alert from "@/layout/main/alert";
import { ModalProps } from "@shared/assets/types/Modal";
import { useEffect } from "react";

interface SuccessProps extends ModalProps {
  message?: string;
  title?: string;
}

export default function Success({ message = "Sample", opened, onClose, title }: SuccessProps) {
  useEffect(() => {
    if (opened) {
      const timer = setTimeout(onClose!, 3000);
      return () => clearTimeout(timer);
    }
  }, [opened, onClose]);
  return <Alert opened={opened} onClose={onClose} headerTitle={`${title}`} size="lg" icon="Success" title={`${message}`} />;
}
