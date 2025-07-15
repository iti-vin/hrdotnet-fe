import { useEffect } from "react";
import { Notification } from "@mantine/core";
import { IconX, IconExclamationCircleFilled, IconCircleCheckFilled } from "@tabler/icons-react";

interface ToastProps {
  opened: boolean;
  type: "success" | "error" | "warning";
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

  const icon = type === "success" ? <IconCircleCheckFilled size={20} /> : type === "error" ? <IconX size={20} /> : <IconExclamationCircleFilled size={20} />;

  const color = type === "success" ? "green" : type === "error" ? "red" : "blue";

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      <Notification icon={icon} color={color} onClose={onClose}>
        {message}
      </Notification>
    </div>
  );
}
