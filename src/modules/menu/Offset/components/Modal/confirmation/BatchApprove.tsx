/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { Stack, Text } from "@mantine/core";

import { queryClient } from "@/services/client";
import { countFilingsByError } from "@shared/utils/Errors";

import { OffsetServices } from "../../../services/api";
import { useOffsetStore } from "../../../store";
import { BatchDataFiling } from "@shared/assets/values/Batch";
import { Button, Confirmation } from "@shared/components";

interface BatchInterface {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function BatchApprove({ opened, onClose, buttonClose }: BatchInterface) {
  const small = useMediaQuery("(max-width: 40em)");
  const { setOpenConfirmation, setSelectedRecords, setSuccess, setWarning, setOpenAlert, setError, selectedRecords } = useOffsetStore();

  const { mutate: batchApproveOff } = useMutation({
    mutationFn: async () => {
      const formData = BatchDataFiling(selectedRecords);
      return OffsetServices.batchApproveOFF(formData);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["approval_offset"] });
      setOpenConfirmation("");
      setSelectedRecords([]);
      const successfulFilings = countFilingsByError({ filings: data.filings, success: true });
      const failedFilings = countFilingsByError({ filings: data.filings, success: false });
      setOpenConfirmation("");
      setSelectedRecords([]);

      if (successfulFilings > 0 && failedFilings === 0) {
        setSuccess(`${successfulFilings} filings have been approved!`);
      } else if (successfulFilings === 0 && failedFilings > 0) {
        setWarning(`${failedFilings} filings failed to approve!`);
      } else if (successfulFilings > 0 && failedFilings > 0) {
        setSuccess(`${successfulFilings} filings have been approved!`);
        setWarning(`${failedFilings} filings failed to approve`);
      }
      setOpenAlert("BatchApprove");
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

  return (
    <Confirmation
      opened={opened}
      title="Approve Request"
      size="lg"
      centered
      padding={small ? 20 : 30}
      radius={10}
      withCloseButton={false}
      onClose={onClose}
      styles={{ body: { overflow: "hidden" } }}
      footer={
        <Stack className="flex flex-row w-full justify-end">
          <Button variant="outline" className="border-[#559cda] text-[#559cda]" radius="md" h={40} w={100} onClick={buttonClose}>
            CANCEL
          </Button>
          <Button variant="gradient" radius="md" type="submit" h={40} w={100} onClick={() => batchApproveOff()}>
            CONFIRM
          </Button>
        </Stack>
      }>
      <Text className="text-[#6d6d6d] mt-5">{selectedRecords.length} Offset</Text>
    </Confirmation>
  );
}
