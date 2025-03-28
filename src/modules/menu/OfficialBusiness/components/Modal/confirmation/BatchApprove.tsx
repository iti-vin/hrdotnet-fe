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

import { useOfficialBusinessStore } from "../../../store";
import { OfficialBusinessServices } from "../../../services/api";
import { BatchDataOfficialBusiness } from "../../../assets/Values";

interface BatchInterface {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function BatchApprove({ opened, onClose, buttonClose }: BatchInterface) {
  const small = useMediaQuery("(max-width: 40em)");
  const { selectedRecords, setError, setWarning, setSuccess, setOpenAlert, setSelectedRecords, setOpenConfirmation } =
    useOfficialBusinessStore();
  const { mutate: batchApproveOB } = useMutation({
    mutationFn: async () => {
      const formData = BatchDataOfficialBusiness(selectedRecords);
      return OfficialBusinessServices.batchApproveOB(formData);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["approval_officialbusiness"] });
      setOpenConfirmation("");
      setSelectedRecords([]);
      const successfulFilings = data.filings && countFilingsByError(data.filings, false);
      const failedFilings = data.filings && countFilingsByError(data.filings, true);
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
          Approve Request
        </Text>
      </div>
      <Divider size="xs" color="#6D6D6D" mt={10} />
      <Text className="text-[#6d6d6d] mt-5">{selectedRecords.length} Official Business</Text>
      <div className="flex flex-col mt-3 w-full text-[#6d6d6d] items-center pt-4 gap-3 px-5">
        <Stack className="flex flex-row w-full justify-end mt-5">
          <Button variant="outline" className="rounded-md w-44" onClick={buttonClose}>
            CANCEL
          </Button>
          <Button className="rounded-md br-gradient border-none w-44" onClick={() => batchApproveOB()}>
            CONFIRM
          </Button>
        </Stack>
      </div>
    </Modal>
  );
}
