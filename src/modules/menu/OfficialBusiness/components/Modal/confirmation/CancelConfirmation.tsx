/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/services/client";

import { useOfficialBusinessStore } from "../../../store";
import { OfficialBusinessServices } from "../../../services/api";
import { SingleDataOfficialBusiness } from "../../../assets/Values";
import { ModalProps } from "@shared/assets/types/Modal";
import Confirmation from "@shared/ui/modals/confirmation";

export default function CancelConfirmation({ opened, onClose }: ModalProps) {
  const { viewItems, setOpenConfirmation, setOpenAlert, setError } = useOfficialBusinessStore();

  const { mutate: singleCancel } = useMutation({
    mutationFn: async (id: number) => {
      const formData = SingleDataOfficialBusiness(viewItems);
      return OfficialBusinessServices.singleCancelOB(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request_officialbusiness"] });
      queryClient.invalidateQueries({ queryKey: ["reviewal_officialbusiness"] });
      queryClient.invalidateQueries({ queryKey: ["approval_officialbusiness"] });
      queryClient.invalidateQueries({ queryKey: ["filings_officialbusiness"] });
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
      yes={{ onClick: () => singleCancel(viewItems.filing.id), title: "Confirm" }}
      no={{ onClick: () => setOpenConfirmation(""), title: "Discard" }}
    />
  );
}
