/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/services/client";

import { ModalProps } from "@shared/assets/types/Modal";
import { useOvertimeStore } from "../../../store";
import { OvertimeServices } from "../../../services/api";
import { SingleDataOvertime } from "../../../assets/Values";
import Confirmation from "@shared/ui/modals/confirmation";

export default function CancelConfirmation({ opened, onClose }: ModalProps) {
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
    <Confirmation
      opened={opened}
      onClose={onClose}
      variant="warning"
      title="Cancel Request"
      description={<div>Are you sure you want to cancel this request? </div>}
      yes={{ onClick: () => singleCancel(singleItem.filing.id), title: "Confirm" }}
      no={{ onClick: () => setOpenConfirmation(""), title: "Discard" }}
    />
  );
}
