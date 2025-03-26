/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Alert from "@/layout/main/alert";
import { useMissedLogStore } from "@/modules/menu/MissedLog/store/main";

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
    <Alert
      opened={opened}
      onClose={onClose}
      headerTitle="Update Request"
      size="lg"
      icon="Warning"
      title="Are you sure you want to update this request? this will override your existing filing details"
      yes={{
        onClick: onHandleUpdate,
      }}
      no={{
        onClick: () => setOpenConfirmation(""),
      }}
    />
  );
}
