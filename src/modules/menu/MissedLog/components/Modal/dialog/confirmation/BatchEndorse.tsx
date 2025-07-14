/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMissedLogStore } from "@/modules/menu/MissedLog/store/main";
import { useMutation } from "@tanstack/react-query";
import { MissedLogServices } from "@/modules/menu/MissedLog/services";
import { queryClient } from "@/services/client";
import { BatchMissedLog } from "@/modules/menu/MissedLog/assets/Values";
import Confirmation from "@shared/ui/modals/confirmation";

interface BatchInterface {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function BatchEndorse({ opened, onClose, buttonClose }: BatchInterface) {
  const { selectedRecords, setSelectedRecords, setError, setWarning, setSuccess, setOpenAlert, setOpenConfirmation } = useMissedLogStore();

  const { mutate: batchEndorseMissedLog } = useMutation({
    mutationFn: async () => {
      const formData = BatchMissedLog(selectedRecords);
      return MissedLogServices.batchEndorseMissedLog(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviewal_missedlog"] });
      const successfulFilings = data.filings.filter((filing: { errors: string | any[] }) => filing.errors.length === 0).length;
      const failedFilings = data.filings.filter((filing: { errors: string | any[] }) => filing.errors.length > 0).length;
      setOpenConfirmation("");
      const added = () => {
        let text: string;
        if (failedFilings != 0) {
          text = `and ${failedFilings} filings doesn't`;
        } else text = "";

        return text;
      };
      setSelectedRecords([]);
      if (successfulFilings >= 1) {
        setOpenAlert("SuccessEndorse");
        setSuccess(`${successfulFilings}   filings has been successfully endorsed!  ${added()}`);
      }
      setWarning(`${failedFilings}   filings failed to endorsed!`);
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
      yes={{ onClick: batchEndorseMissedLog, title: "Confirm" }}
      no={{ onClick: buttonClose!, title: "Discard" }}
    />
  );
}
