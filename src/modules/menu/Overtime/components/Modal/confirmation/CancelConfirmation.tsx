/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { useMutation } from "@tanstack/react-query";

import Alert from "@/layout/main/alert";
import { queryClient } from "@/services/client";

import { ModalProps } from "@shared/assets/types/Modal";
import { useOvertimeStore } from "../../../store";
import { OvertimeServices } from "../../../services/api";
import { SingleDataOvertime } from "../../../assets/Values";

export default function index({ opened, onClose }: ModalProps) {
  const { singleItem, setOpenConfirmation, setOpenAlert, setError } = useOvertimeStore();

  const { mutate: singleCancel } = useMutation({
    mutationFn: async (id: number) => {
      const formData = SingleDataOvertime(singleItem);
      return OvertimeServices.singleCancelOT(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request_overtime"] });
      queryClient.invalidateQueries({ queryKey: ["reviewal_overtime"] });
      queryClient.invalidateQueries({ queryKey: ["approval_overtime"] });
      queryClient.invalidateQueries({ queryKey: ["filings_overtime"] });
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
      headerTitle="Cancel Request"
      size="lg"
      icon="Warning"
      title="Are you sure you want to cancel this Overtime request?"
      description="Filing deadline for this cutoff period will end in a day."
      yes={{
        onClick: () => singleCancel(singleItem.filing.id),
      }}
      no={{
        onClick: () => setOpenConfirmation(""),
      }}
    />
  );
}
