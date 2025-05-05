/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { useMutation } from "@tanstack/react-query";

import Alert from "@/layout/main/alert";
import { queryClient } from "@/services/client";

import { useOfficialBusinessStore } from "../../../store";
import { OfficialBusinessServices } from "../../../services/api";
import { SingleDataOfficialBusiness } from "../../../assets/Values";
import { ModalProps } from "@shared/assets/types/Modal";

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
    <Alert
      opened={opened}
      onClose={onClose}
      headerTitle="CANCEL REQUEST"
      size="lg"
      icon="Warning"
      title="Are you sure you want to cancel this Official Business request?"
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
