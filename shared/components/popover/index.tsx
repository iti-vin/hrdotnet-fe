import { ReactNode } from "react";
import styles from "./PopOver.module.css";
import { X } from "lucide-react";

interface IPopover {
  open: boolean;
  onClose: () => void;
  size?: "profile" | "settings" | "standard" | "small" | string;
  position?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
  header?: ReactNode;
  subHeader?: ReactNode;
  body?: ReactNode;
  backdropClickClose?: boolean;
}

export function Popover({
  open,
  onClose,
  size = "standard",
  position = "top",
  showCloseButton = false,
  header,
  subHeader,
  body,
  backdropClickClose = true,
}: IPopover) {
  if (!open) return null;

  const positionClass = {
    top: "items-start justify-center",
    bottom: "items-end justify-center",
    left: "items-center justify-start",
    right: "items-center justify-end",
    center: "items-center justify-center",
  }[position ?? "top"];

  const popoverClass = `${styles.container} ${styles[size]}`;
  const isProfileOrSettings = ["profile", "settings"].includes(size);

  const headerClass = `${styles.headerContainer} ${isProfileOrSettings ? styles.profileHeader : styles.standardHeader}`;

  const headerText = isProfileOrSettings ? styles.profileText : styles.standardText;

  const handleBackdropClick = () => {
    if (backdropClickClose) onClose();
  };

  return (
    <div className={`fixed inset-0 z-[100] flex ${positionClass} bg-black/5 p-4`} onClick={handleBackdropClick}>
      <div className={popoverClass} data-size={size} data-position={position} onClick={(e) => e.stopPropagation()}>
        <div className={headerClass}>
          <h1 className={headerText}>{header}</h1>
          {isProfileOrSettings && <p className={styles.subHeader}>{subHeader}</p>}
          {showCloseButton && (
            <button onClick={onClose}>
              <X className={styles.closeBtn} />
            </button>
          )}
        </div>
        <div className={styles.bodyContainer}>{body}</div>
      </div>
    </div>
  );
}
