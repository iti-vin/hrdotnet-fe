import { useEffect } from "react";
import { Notification } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";

interface ToastProps {
  opened: boolean;
  type: "success" | "error";
  message: string;
  onClose?: () => void;
}

export default function Toast({ opened, type, message, onClose }: ToastProps) {
  useEffect(() => {
    if (opened) {
      const timer = setTimeout(onClose!, 3000);
      return () => clearTimeout(timer);
    }
  }, [opened, onClose]);

  if (!opened) return null;

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      <Notification icon={type === "success" ? <IconCheck size={20} /> : <IconX size={20} />} color={type === "success" ? "teal" : "red"} onClose={onClose}>
        {message}
      </Notification>
    </div>
  );
}
