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

export default function BatchCancel({ opened, onClose, buttonClose }: BatchInterface) {
  const { setOpenAlert, setOpenConfirmation } = useCTOStore();
  const [selectedRecords, setSelectedRecords] = useState<[]>([]);

  const handleBatchCancel = () => {
    setOpenConfirmation("");
    setOpenAlert("BatchCancel");
    setSelectedRecords([]);
  };

  return (
    <Confirmation
      opened={opened}
      onClose={onClose}
      variant="warning"
      title="Batch Cancel"
      description={<div>Are you sure you want to batch cancel {selectedRecords.length > 1 ? "these" : "this"} request? </div>}
      children={<div>{selectedRecords.length} Offset Request</div>}
      yes={{ onClick: handleBatchCancel, title: "Confirm" }}
      no={{ onClick: buttonClose, title: "Discard" }}
    />
  );
}
