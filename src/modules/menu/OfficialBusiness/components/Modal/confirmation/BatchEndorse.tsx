/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/services/client";
import { ModalProps } from "@shared/assets/types/Modal";
import { countFilingsByError } from "@shared/utils/Errors";

import { useOfficialBusinessStore } from "../../../store";
import { BatchDataOfficialBusiness } from "../../../assets/Values";
import { OfficialBusinessServices } from "../../../services/api";
import Confirmation from "@shared/ui/modals/confirmation";

export default function BatchEndorse({ opened, onClose, buttonClose }: ModalProps) {
  const { selectedRecords, setError, setWarning, setSuccess, setOpenAlert, setSelectedRecords, setOpenConfirmation } = useOfficialBusinessStore();

  const { mutate: batchEndorseOB } = useMutation({
    mutationFn: async () => {
      const formData = BatchDataOfficialBusiness(selectedRecords);
      return OfficialBusinessServices.batchEndorseOB(formData);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["reviewal_officialbusiness"] });
      setOpenConfirmation("");
      setSelectedRecords([]);
      const successfulFilings = countFilingsByError({ filings: data.filings, success: true });
      const failedFilings = countFilingsByError({ filings: data.filings, success: false });
      setOpenConfirmation("");
      setSelectedRecords([]);

      if (successfulFilings > 0 && failedFilings === 0) {
        setSuccess(`${successfulFilings} filings have been endorsed!`);
      } else if (successfulFilings === 0 && failedFilings > 0) {
        setWarning(`${failedFilings} filings failed to endorse!`);
      } else if (successfulFilings > 0 && failedFilings > 0) {
        setSuccess(`${successfulFilings} filings have been endorsed!`);
        setWarning(`${failedFilings} filings failed to endorse`);
      }
      setOpenAlert("BatchEndorse");
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
      title="Batch Reviewal"
      description={<div>Are you sure you want to batch endorse {selectedRecords.length > 1 ? "these" : "this"} request? </div>}
      children={<div>{selectedRecords.length} Official Business Request</div>}
      yes={{ onClick: batchEndorseOB, title: "Confirm" }}
      no={{ onClick: buttonClose!, title: "Discard" }}
    />
  );
}
