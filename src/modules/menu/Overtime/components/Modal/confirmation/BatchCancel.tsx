/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { Button, Divider, Modal, Stack, Text } from "@mantine/core";

import { queryClient } from "@/services/client";
import { countFilingsByError } from "@shared/utils/Errors";

import { useOvertimeStore } from "../../../store";
import { OvertimeServices } from "../../../services/api";
import { BatchDataOvertime } from "../../../assets/Values";

interface BatchInterface {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function BatchCancel({ opened, onClose, buttonClose }: BatchInterface) {
  const small = useMediaQuery("(max-width: 40em)");
  const { selectedRecords, setError, setWarning, setSuccess, setOpenAlert, setSelectedRecords, setOpenConfirmation } =
    useOvertimeStore();
  const { mutate: batchCancelOB } = useMutation({
    mutationFn: async () => {
      const formData = BatchDataOvertime(selectedRecords);
      return OvertimeServices.batchCancelOT(formData);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["request_overtime"] });
      queryClient.invalidateQueries({ queryKey: ["reviewal_overtime"] });
      queryClient.invalidateQueries({ queryKey: ["approval_overtime"] });
      queryClient.invalidateQueries({ queryKey: ["filings_overtime"] });
      setOpenConfirmation("");
      setSelectedRecords([]);
      const successfulFilings = countFilingsByError({ filings: data.filings, success: true });
      const failedFilings = countFilingsByError({ filings: data.filings, success: false });
      setOpenConfirmation("");
      setSelectedRecords([]);

      if (successfulFilings > 0 && failedFilings === 0) {
        setSuccess(`${successfulFilings} filings have been cancelled!`);
      } else if (successfulFilings === 0 && failedFilings > 0) {
        setWarning(`${failedFilings} filings failed to cancel!`);
      } else if (successfulFilings > 0 && failedFilings > 0) {
        setSuccess(`${successfulFilings} filings have been cancelled!`);
        setWarning(`${failedFilings} filings failed to cancel!`);
      }
      setOpenAlert("BatchCancel");
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

  return (
    <Modal
      opened={opened}
      size="lg"
      centered
      padding={small ? 20 : 30}
      radius={10}
      withCloseButton={false}
      onClose={onClose}
      styles={{ body: { overflow: "hidden" } }}>
      <div className="flex justify-between">
        <Text fw={600} fz={small ? 15 : 22} c={"#559CDA"}>
          CANCEL REQUEST
        </Text>
      </div>
      <Divider size="xs" color="#6D6D6D" mt={10} />
      <Text className="text-[#6d6d6d] mt-5">{selectedRecords.length} Overtime</Text>
      <div className="flex flex-col mt-3 w-full text-[#6d6d6d] items-center pt-4 gap-3 px-5">
        <Stack className="flex flex-row w-full justify-end mt-5">
          <Button variant="outline" className="rounded-md w-44" onClick={buttonClose}>
            CANCEL
          </Button>
          <Button className="rounded-md br-gradient border-none w-44" onClick={() => batchCancelOB()}>
            CONFIRM
          </Button>
        </Stack>
      </div>
    </Modal>
  );
}
