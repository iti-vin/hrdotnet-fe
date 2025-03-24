/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Layout
import Alert from "@/layout/main/alert";
import useLeaveStore from "../../../store/LeaveStore";
import { CancelData } from "../../../models/request";
import { LeaveServices } from "../../../services/main";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CancelRequest() {
  const queryClient = useQueryClient();
  const { openAlert, setOpenAlert, viewItems, setError } = useLeaveStore();

  const onHandleClear = async () => {
    clearRequest(viewItems.filing.id);
    setOpenAlert("");
  };

  const { mutate: clearRequest } = useMutation({
    mutationFn: async (id: number) => {
      const formData = CancelData(viewItems);
      return LeaveServices.cancelLeaveRequest(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request_leave"] });
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

  return (
    <Alert
      opened={openAlert === "Cancel"}
      onClose={() => setOpenAlert("")}
      headerTitle="Cancel Request"
      size="lg"
      icon="Warning"
      title="Are you sure you want to cancel this Leave request?"
      description="Filing deadline for this cutoff period will end in a day."
      yes={{
        onClick: () => onHandleClear(),
      }}
      no={{
        onClick: () => setOpenAlert(""),
      }}
    />
  );
}
