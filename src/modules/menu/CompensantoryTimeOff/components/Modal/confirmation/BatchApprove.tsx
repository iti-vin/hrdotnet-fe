/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useCTOStore } from "../../../store";
import Confirmation from "@shared/ui/modals/confirmation";
import { useState } from "react";

interface BatchInterface {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function BatchApprove({ opened, onClose, buttonClose }: BatchInterface) {
  const { setOpenAlert, setOpenConfirmation } = useCTOStore();
  const [selectedRecords, setSelectedRecords] = useState<[]>([]);

  const handleBatchApprove = () => {
    setOpenConfirmation("");
    setOpenAlert("BatchApprove");
    setSelectedRecords([]);
  };

  return (
    <Confirmation
      opened={opened}
      onClose={onClose}
      variant="warning"
      title="Batch Approval"
      description={<div>Are you sure you want to batch approve {selectedRecords.length > 1 ? "these" : "this"} request? </div>}
      children={<div>{selectedRecords.length} Offset Request</div>}
      yes={{ onClick: handleBatchApprove, title: "Confirm" }}
      no={{ onClick: buttonClose, title: "Discard" }}
    />
  );
}
