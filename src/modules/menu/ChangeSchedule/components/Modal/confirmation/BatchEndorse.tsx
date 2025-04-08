/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { Button, Divider, Modal, Stack, Text } from "@mantine/core";

import { ModalProps } from "@shared/assets/types/Modal";
import { useChangeOfScheduleStore } from "../../../store";
import { useMutation } from "@tanstack/react-query";
import { BatchDataFiling } from "@shared/assets/values/Batch";
import { CosServices } from "../../../services/api";
import { queryClient } from "@/services/client";
import { countFilingsByError } from "@shared/utils/Errors";

export default function BatchEndorse({ opened, onClose, buttonClose }: ModalProps) {
  const small = useMediaQuery("(max-width: 40em)");
  const { setOpenConfirmation, setSelectedRecords, setSuccess, setWarning, setOpenAlert, setError, selectedRecords } =
    useChangeOfScheduleStore();

  const { mutate: batchEndorseCos } = useMutation({
    mutationFn: async () => {
      const formData = BatchDataFiling(selectedRecords);
      return CosServices.batchEndorseCOS(formData);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["reviewal_cos"] });
      setOpenConfirmation("");
      setSelectedRecords([]);
      const successfulFilings = countFilingsByError({ filings: data.filings, success: true });
      const failedFilings = countFilingsByError({ filings: data.filings, success: false });
      setOpenConfirmation("");
      setSelectedRecords([]);

      if (successfulFilings > 0 && failedFilings === 0) {
        setSuccess(`${successfulFilings} filings have been endorsed!`);
      } else if (successfulFilings === 0 && failedFilings > 0) {
        setWarning(`${failedFilings} filings failed to endorse!`);
      } else if (successfulFilings > 0 && failedFilings > 0) {
        setSuccess(`${successfulFilings} filings have been endorsed!`);
        setWarning(`${failedFilings} filings failed to endorse`);
      }
      setOpenAlert("BatchEndorse");
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
          Endorse Request
        </Text>
      </div>
      <Divider size="xs" color="#6D6D6D" mt={10} />
      <Text className="text-[#6d6d6d] mt-5">{selectedRecords.length} Change of Schedule</Text>
      <div className="flex flex-col mt-3 w-full text-[#6d6d6d] items-center pt-4 gap-3 px-5">
        <Stack className="flex flex-row w-full justify-end mt-5">
          <Button variant="outline" className="rounded-md w-44" onClick={buttonClose}>
            CANCEL
          </Button>
          <Button className="rounded-md br-gradient border-none w-44" onClick={() => batchEndorseCos()}>
            CONFIRM
          </Button>
        </Stack>
      </div>
    </Modal>
  );
}
