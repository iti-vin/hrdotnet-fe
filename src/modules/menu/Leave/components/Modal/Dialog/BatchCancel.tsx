/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
//--- Mantine Modules
import useLeaveStore from "../../../store/LeaveStore";
import Confirmation from "@shared/ui/modals/confirmation";
import { ModalProps } from "@shared/assets/types/Modal";

export default function BatchCancel({ opened, onClose, buttonClose }: ModalProps) {
  const { selectedRecords } = useLeaveStore();

  return (
    <Confirmation
      opened={opened}
      size="lg"
      onClose={onClose}
      variant="warning"
      title="Batch Cancel"
      description={<div>Are you sure you want to batch cancel this request? </div>}
      children={<div>{selectedRecords.length} Official Business Request</div>}
      yes={{ onClick: () => {}, title: "Confirm" }}
      no={{ onClick: buttonClose!, title: "Discard" }}
    />
  );
}
