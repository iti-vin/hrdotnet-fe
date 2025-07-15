/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { useMissedLogStore } from "@/modules/menu/MissedLog/store/main";
import Confirmation from "@shared/ui/modals/confirmation";

interface CancelConfirmationInterface {
  opened: boolean;
  onClose: () => void;
}

export default function index({ opened, onClose }: CancelConfirmationInterface) {
  const { setOpenConfirmation, setOpenAlert } = useMissedLogStore();

  const onHandleUpdate = () => {
    setOpenConfirmation("");
    setOpenAlert("SuccessUpdate");
  };
  return (
    <Confirmation
      opened={opened}
      onClose={onClose}
      variant="warning"
      title="Update Request"
      description="Are you sure you want to update this request? this will override your existing filing details"
      yes={{ onClick: () => onHandleUpdate(), title: "Confirm" }}
      no={{ onClick: () => setOpenConfirmation(""), title: "Keep Editing" }}
    />
  );
}
