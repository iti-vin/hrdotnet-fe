/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { ModalProps } from "@shared/assets/types/Modal";
import Alert from "@shared/ui/modals/alert";
import { ReactNode, useEffect } from "react";

interface Props extends ModalProps {
  title: string;
  message: ReactNode;
}

export default function Success({ opened, onClose, title, message }: Props) {
  useEffect(() => {
    if (opened) {
      const timer = setTimeout(onClose!, 3000);
      return () => clearTimeout(timer);
    }
  }, [opened, onClose]);

  return <Alert opened={opened} onClose={onClose} variant="success" title={title} description={message} confirm={{ onClick: onClose, title: "Done" }} />;
}
