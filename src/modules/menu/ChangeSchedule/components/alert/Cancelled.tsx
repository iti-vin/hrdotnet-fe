/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Alert from "@/layout/main/alert";
import { useEffect } from "react";

interface SuccessProps {
  opened: boolean;
  onClose?(): void;
}

export default function Cancelled({ opened, onClose }: SuccessProps) {
  useEffect(() => {
    if (opened) {
      const timer = setTimeout(onClose!, 3000);
      return () => clearTimeout(timer);
    }
  }, [opened, onClose]);
  return <Alert opened={opened} onClose={onClose} headerTitle={`Requested Cancelled`} size="lg" icon="Danger" title={`Your request has been cancelled!`} />;
}
