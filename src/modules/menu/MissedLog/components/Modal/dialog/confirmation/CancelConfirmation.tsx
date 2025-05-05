/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Alert from "@/layout/main/alert";
import { CancelMissedLog } from "@/modules/menu/MissedLog/assets/Values";
import { MissedLogServices } from "@/modules/menu/MissedLog/services";
import { useMissedLogStore } from "@/modules/menu/MissedLog/store/main";
import { queryClient } from "@/services/client";
import { useMutation } from "@tanstack/react-query";

interface CancelConfirmationInterface {
  opened: boolean;
  onClose: () => void;
}

export default function CancelConfirmation({ opened, onClose }: CancelConfirmationInterface) {
  const { viewItems, setOpenConfirmation, setOpenAlert, setError } = useMissedLogStore();
  const { mutate: singleCancel } = useMutation({
    mutationFn: async (id: number) => {
      const formData = CancelMissedLog(viewItems);
      return MissedLogServices.cancelMissedLogRequest(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request_missedlog"] });
      queryClient.invalidateQueries({ queryKey: ["reviewal_missedlog"] });
      queryClient.invalidateQueries({ queryKey: ["approval_missedlog"] });
      setOpenConfirmation("");
      setOpenAlert("CancelAlert");
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

  return (
    <Alert
      opened={opened}
      onClose={onClose}
      headerTitle="CANCEL REQUEST"
      size="lg"
      icon="Warning"
      title="Are you sure you want to cancel this Missed Log request?"
      description="Filing deadline for this cutoff period will end in a day."
      yes={{
        onClick: () => singleCancel(viewItems.filing.id),
      }}
      no={{
        onClick: () => setOpenConfirmation(""),
      }}
    />
  );
}
