/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/services/client";
import { countFilingsByError } from "@shared/utils/Errors";

import { OffsetServices } from "../../../services/api";
import { useOffsetStore } from "../../../store";
import { BatchDataFiling } from "@shared/assets/values/Batch";
import Confirmation from "@shared/ui/modals/confirmation";

interface BatchInterface {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function BatchApprove({ opened, onClose, buttonClose }: BatchInterface) {
  const { setOpenConfirmation, setSelectedRecords, setSuccess, setWarning, setOpenAlert, setError, selectedRecords } = useOffsetStore();

  const { mutate: batchApproveOff } = useMutation({
    mutationFn: async () => {
      const formData = BatchDataFiling(selectedRecords);
      return OffsetServices.batchApproveOFF(formData);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["approval_offset"] });
      setOpenConfirmation("");
      setSelectedRecords([]);
      const successfulFilings = countFilingsByError({ filings: data.filings, success: true });
      const failedFilings = countFilingsByError({ filings: data.filings, success: false });
      setOpenConfirmation("");
      setSelectedRecords([]);

      if (successfulFilings > 0 && failedFilings === 0) {
        setSuccess(`${successfulFilings} filings have been approved!`);
      } else if (successfulFilings === 0 && failedFilings > 0) {
        setWarning(`${failedFilings} filings failed to approve!`);
      } else if (successfulFilings > 0 && failedFilings > 0) {
        setSuccess(`${successfulFilings} filings have been approved!`);
        setWarning(`${failedFilings} filings failed to approve`);
      }
      setOpenAlert("BatchApprove");
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

  return (
    <Confirmation
      opened={opened}
      onClose={onClose}
      variant="warning"
      title="Batch Approval"
      description={<div>Are you sure you want to batch approve {selectedRecords.length > 1 ? "these" : "this"} request? </div>}
      children={<div>{selectedRecords.length} Offset Request</div>}
      yes={{ onClick: batchApproveOff, title: "Confirm" }}
      no={{ onClick: buttonClose, title: "Discard" }}
    />
  );
}
