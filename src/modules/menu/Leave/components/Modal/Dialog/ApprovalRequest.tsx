/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { PropsWithChildren } from "react";
//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { Button, Divider, Modal, Stack, Text } from "@mantine/core";
import useLeaveStore from "../../../store/LeaveStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BatchData } from "../../../models/request";
import { LeaveServices } from "../../../services/approval";

interface AlertProps extends PropsWithChildren {
  message?: React.ReactNode;
}

export default function BatchApproval({ message }: AlertProps) {
  const small = useMediaQuery("(max-width: 40em)");

  const queryClient = useQueryClient();
  const { openDialog, setOpenDialog, selectedRecords, setSelectedRecords, setError } = useLeaveStore();
  const { mutate: batchApproveLeave } = useMutation({
    mutationFn: async () => {
      const formData = BatchData(selectedRecords);
      return LeaveServices.batchApproveLeave(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviewal_leave"] });
      queryClient.invalidateQueries({ queryKey: ["approval_leave"] });
      setOpenDialog("");
      setSelectedRecords([]);
      console.log(data);
      const successfulFilings = data.filings.filter((filing: { errors: string | any[] }) => filing.errors.length === 0).length;

      const failedFilings = data.filings.filter((filing: { errors: string | any[] }) => filing.errors.length > 0);

      console.log(`${successfulFilings} Successful Approve`);

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
    <Modal
      opened={openDialog === "BatchApprove"}
      size="lg"
      centered
      padding={small ? 20 : 30}
      radius={10}
      withCloseButton={false}
      onClose={() => setOpenDialog("")}
      styles={{ body: { overflow: "hidden" } }}>
      <div className="flex justify-between">
        <Text fw={600} fz={small ? 15 : 22} c={"#559CDA"}>
          Batch Approve
        </Text>
      </div>
      <Divider size="xs" color="#6D6D6D" mt={10} />

      <Text className="text-[#6d6d6d] mt-5">{message}</Text>

      <div className="flex flex-col mt-3 w-full text-[#6d6d6d] items-center pt-4 gap-3 px-5">
        <Stack className="flex flex-row w-full justify-end mt-5">
          <Button
            variant="outline"
            className="rounded-md w-44"
            onClick={() => {
              setSelectedRecords([]);
              setOpenDialog("");
            }}>
            CANCEL
          </Button>
          <Button className="rounded-md br-gradient border-none w-44" onClick={() => batchApproveLeave()}>
            CONFIRM
          </Button>
        </Stack>
      </div>
    </Modal>
  );
}
