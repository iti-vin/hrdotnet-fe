/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Alert from "@/layout/main/alert";

import { ModalProps } from "@shared/assets/types/Modal";
import { useChangeOfScheduleStore } from "../../../store";
import { useMutation } from "@tanstack/react-query";
import { CosServices } from "../../../services/api";
import { queryClient } from "@/services/client";
import { SingleData } from "../../../models/request";
import { cosQueryKeys } from "../../../assets/query";

export default function CancelConfirmation({ opened, onClose }: ModalProps) {
  const { singleItem, setOpenConfirmation, setOpenAlert, setError } = useChangeOfScheduleStore();

  const { mutate: singleCancel } = useMutation({
    mutationFn: async (id: number) => {
      const formData = SingleData(singleItem);
      return CosServices.singleCancelCOS(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cosQueryKeys.base });
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
      title="Are you sure you want to cancel this Change of Schedule request?"
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
