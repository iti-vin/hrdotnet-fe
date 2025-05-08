/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { useMutation } from "@tanstack/react-query";

import Alert from "@/layout/main/alert";
import { queryClient } from "@/services/client";

import { ModalProps } from "@shared/assets/types/Modal";
import { OffsetServices } from "../../../services/api";
import { useOffsetStore } from "../../../store";
import { ValidationErrorResponse } from "@shared/assets/types/Error";
import { SingleDataOffset } from "../../../assets/Values";

export default function CancelConfirmation({ opened, onClose }: ModalProps) {
  const { singleItem, setOpenConfirmation, setOpenAlert, setError } = useOffsetStore();

  const { mutate: singleCancel } = useMutation({
    mutationFn: async (id: number) => {
      const formData = SingleDataOffset(singleItem);
      return OffsetServices.singleCancelOFF(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request_offset"] });
      queryClient.invalidateQueries({ queryKey: ["reviewal_offset"] });
      queryClient.invalidateQueries({ queryKey: ["approval_offset"] });
      queryClient.invalidateQueries({ queryKey: ["filings_offset"] });
      setOpenConfirmation("");
      setOpenAlert("CancelAlert");
    },
    onError: (error: { response: { data: ValidationErrorResponse } }) => {
      //  setLoading(false);
      const errorData = error.response.data;
      const errorMessages = Object.values(errorData.errors).flat().join(", ");
      setError(errorMessages || "Internal Server Error");
    },
  });

  return (
    <Alert
      opened={opened}
      onClose={onClose}
      headerTitle="CANCEL REQUEST"
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
