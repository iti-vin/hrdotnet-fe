/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/services/client";
import { countFilingsByError } from "@shared/utils/Errors";

import { useOvertimeStore } from "../../../store";
import { OvertimeServices } from "../../../services/api";
import { BatchDataOvertime } from "../../../assets/Values";

import Confirmation from "@shared/ui/modals/confirmation";

interface BatchInterface {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function BatchCancel({ opened, onClose, buttonClose }: BatchInterface) {
  const { selectedRecords, setError, setWarning, setSuccess, setOpenAlert, setSelectedRecords, setOpenConfirmation } = useOvertimeStore();
  const { mutate: batchCancelOT } = useMutation({
    mutationFn: async () => {
      const formData = BatchDataOvertime(selectedRecords);
      return OvertimeServices.batchCancelOT(formData);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["request_overtime"] });
      queryClient.invalidateQueries({ queryKey: ["reviewal_overtime"] });
      queryClient.invalidateQueries({ queryKey: ["approval_overtime"] });
      queryClient.invalidateQueries({ queryKey: ["filings_overtime"] });
      setOpenConfirmation("");
      setSelectedRecords([]);
      const successfulFilings = countFilingsByError({ filings: data.filings, success: true });
      const failedFilings = countFilingsByError({ filings: data.filings, success: false });
      setOpenConfirmation("");
      setSelectedRecords([]);

      if (successfulFilings > 0 && failedFilings === 0) {
        setSuccess(`${successfulFilings} filings have been cancelled!`);
      } else if (successfulFilings === 0 && failedFilings > 0) {
        setWarning(`${failedFilings} filings failed to cancel!`);
      } else if (successfulFilings > 0 && failedFilings > 0) {
        setSuccess(`${successfulFilings} filings have been cancelled!`);
        setWarning(`${failedFilings} filings failed to cancel!`);
      }
      setOpenAlert("BatchCancel");
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
      title="Batch Cancel"
      description={<div>Are you sure you want to batch cancel {selectedRecords.length > 1 ? "these" : "this"} request? </div>}
      children={<div>{selectedRecords.length} Overtime Request</div>}
      yes={{ onClick: batchCancelOT, title: "Confirm" }}
      no={{ onClick: buttonClose, title: "Discard" }}
    />
  );
}
