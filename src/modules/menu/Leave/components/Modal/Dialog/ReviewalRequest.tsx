/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { PropsWithChildren } from "react";
//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { Stack, Text } from "@mantine/core";
import useLeaveStore from "../../../store/LeaveStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LeaveServices } from "../../../services/reviewal";
import { BatchData } from "../../../models/request";
import { Button, Confirmation } from "@shared/components";

interface AlertProps extends PropsWithChildren {
  message?: React.ReactNode;
  onClick?(): void;
}

export default function BatchReviewal({ message }: AlertProps) {
  const small = useMediaQuery("(max-width: 40em)");
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
      size="lg"
      centered
      title="Endorse Request"
      padding={small ? 20 : 30}
      radius={10}
      withCloseButton={false}
      onClose={() => setOpenDialog("")}
      styles={{ body: { overflow: "hidden" } }}
      footer={
        <Stack className="flex flex-row w-full justify-end mt-5">
          <Button
            variant="outline"
            className="border-[#559cda] text-[#559cda]"
            radius="md"
            h={40}
            w={100}
            onClick={() => {
              setSelectedRecords([]);
              setOpenDialog("");
            }}>
            BACK
          </Button>
          <Button variant="gradient" radius="md" type="submit" h={40} w={100} onClick={() => batchEndorseLeave()}>
            SUBMIT
          </Button>
        </Stack>
      }>
      <Text className="text-[#6d6d6d] mt-5">{message}</Text>
    </Confirmation>
  );
}
