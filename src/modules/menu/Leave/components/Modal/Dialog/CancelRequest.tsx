/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Layout
import useLeaveStore from "../../../store/LeaveStore";
import { CancelData } from "../../../models/request";
import { LeaveServices } from "../../../services/main";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Confirmation from "@shared/ui/modals/confirmation";

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
    <Confirmation
      opened={openAlert === "Cancel"}
      onClose={() => setOpenAlert("")}
      variant="warning"
      title="Cancel Request"
      description={<div>Are you sure you want to cancel this request? </div>}
      yes={{ onClick: () => clearRequest(viewItems.filing.id), title: "Confirm" }}
      no={{ onClick: onHandleClear, title: "Discard" }}
    />
  );
}
