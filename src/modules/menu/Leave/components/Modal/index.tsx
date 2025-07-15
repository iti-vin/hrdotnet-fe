import BatchCancel from "./Dialog/BatchCancel";
import BatchApproval from "./Dialog/ApprovalRequest";
import BatchReviewal from "./Dialog/ReviewalRequest";
import CancelRequest from "./Dialog/CancelRequest";
import EditRequest from "./Dialog/EditRequest";
import NewFilings from "./Dialog/NewFilings";
import NewRequest from "./Dialog/NewRequest";
import ViewDetails from "./Dialog/ViewDetails";
import useLeaveStore from "../../store/LeaveStore";
import { Stack } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BatchData } from "../../models/request";
import { LeaveServices } from "../../services/main";
import Toast from "@/layout/main/alert/toast";
import SummaryDetails from "./Dialog/SummaryDetails";

interface ModalProps {
  panel?: "FILINGS" | "REQUEST" | "REVIEWAL" | "APPROVAL";
  endorse?: React.ReactNode;
  approve?: React.ReactNode;
}

export default function index({ panel, approve, endorse }: ModalProps) {
  const queryClient = useQueryClient();
  const { selectedRecords, setSelectedRecords, openDialog, setOpenDialog, error, setError } = useLeaveStore();

  const { mutate: batchCancelLeave } = useMutation({
    mutationFn: async () => {
      const formData = BatchData(selectedRecords);
      return LeaveServices.batchCancelLeave(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviewal_leave"] });
      queryClient.invalidateQueries({ queryKey: ["approval_leave"] });
      setOpenDialog("");
      setSelectedRecords([]);
      const successfulFilings = data.filings.filter((filing: { errors: string | any[] }) => filing.errors.length === 0).length;

      const failedFilings = data.filings.filter((filing: { errors: string | any[] }) => filing.errors.length > 0);

      console.log(`${successfulFilings} Successful Endorse`);

      failedFilings.forEach((filing: { errors: { code: string; message: string }[] }) => {
        filing.errors.forEach((error) => {
          console.log(`Error Code: ${error.code}, Message: ${error.message}`);
        });
      });
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

  const handleSubmit = () => {
    batchCancelLeave();
  };

  console.warn(handleSubmit);

  const rndrContentMessage = () => (
    <Stack>
      {Object.entries(
        selectedRecords.reduce((acc, item) => {
          acc[item.filing.leaveParameter.name] = (acc[item.filing.leaveParameter.name] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      ).map(([name, count]) => (
        <div key={name}>
          {count} {name}
        </div>
      ))}
    </Stack>
  );

  return (
    <>
      <NewFilings />
      <NewRequest />
      <CancelRequest />
      <EditRequest />
      <ViewDetails panel={panel} approve={approve} endorse={endorse} />
      <BatchCancel opened={openDialog === "BatchCancel"} onClose={() => setOpenDialog("")} />
      <BatchApproval message={rndrContentMessage()} />
      <BatchReviewal message={rndrContentMessage()} />
      <SummaryDetails opened={openDialog === "SummaryDetails"} onClose={() => setOpenDialog("")} buttonClose={() => setOpenDialog("")} />
      {/*  */}
      <Toast opened={error != ""} type="error" message={error} onClose={() => setError("")} />
    </>
  );
}
