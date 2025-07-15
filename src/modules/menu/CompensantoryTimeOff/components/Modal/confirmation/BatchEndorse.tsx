/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { ModalProps } from "@shared/assets/types/Modal";
import { useCTOStore } from "../../../store";
import Confirmation from "@shared/ui/modals/confirmation";
import { useState } from "react";

export default function BatchEndorse({ opened, onClose, buttonClose }: ModalProps) {
  const { setOpenAlert, setOpenConfirmation } = useCTOStore();
  const [selectedRecords, setSelectedRecords] = useState<[]>([]);

  const handleBatchEndorse = () => {
    setOpenConfirmation("");
    setOpenAlert("BatchEndorse");
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
      yes={{ onClick: handleBatchEndorse, title: "Confirm" }}
      no={{ onClick: buttonClose!, title: "Discard" }}
    />
  );
}
