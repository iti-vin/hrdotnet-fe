/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { PropsWithChildren } from "react";
//--- Mantine Modules
import useLeaveStore from "../../../store/LeaveStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LeaveServices } from "../../../services/reviewal";
import { BatchData } from "../../../models/request";
import Confirmation from "@shared/ui/modals/confirmation";

interface AlertProps extends PropsWithChildren {
  message?: React.ReactNode;
  onClick?(): void;
}

export default function BatchReviewal({ message }: AlertProps) {
  const queryClient = useQueryClient();
  const { openDialog, setOpenDialog, selectedRecords, setSelectedRecords, setError } = useLeaveStore();
  const { mutate: batchEndorseLeave } = useMutation({
    mutationFn: async () => {
      const formData = BatchData(selectedRecords);
      return LeaveServices.batchEndorseLeave(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviewal_leave"] });
      queryClient.invalidateQueries({ queryKey: ["approval_leave"] });
      setOpenDialog("");
      setSelectedRecords([]);
      console.log(data);
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
  return (
    <Confirmation
      opened={openDialog === "BatchEndorse"}
      onClose={() => setOpenDialog("")}
      variant="warning"
      title="Batch Endorse"
      description={<div>Are you sure you want to batch endorse {selectedRecords.length > 1 ? "these" : "this"} request? </div>}
      children={message}
      yes={{ onClick: batchEndorseLeave, title: "Confirm" }}
      no={{
        onClick: () => {
          setSelectedRecords([]);
          setOpenDialog("");
        },
        title: "Discard",
      }}
    />
  );
}
