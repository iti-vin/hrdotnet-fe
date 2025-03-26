/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { Button, Divider, Modal, Stack, Text } from "@mantine/core";
import { useMissedLogStore } from "@/modules/menu/MissedLog/store/main";
import { useMutation } from "@tanstack/react-query";
import { MissedLogServices } from "@/modules/menu/MissedLog/services";
import { queryClient } from "@/services/client";
import { BatchMissedLog } from "@/modules/menu/MissedLog/assets/Values";

interface BatchInterface {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function BatchEndorse({ opened, onClose, buttonClose }: BatchInterface) {
  const small = useMediaQuery("(max-width: 40em)");
  const { selectedRecords, setSelectedRecords, setError, setWarning, setSuccess, setOpenAlert, setOpenConfirmation } = useMissedLogStore();

  const { mutate: batchEndorseMissedLog } = useMutation({
    mutationFn: async () => {
      const formData = BatchMissedLog(selectedRecords);
      return MissedLogServices.batchEndorseMissedLog(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviewal_missedlog"] });
      const successfulFilings = data.filings.filter((filing: { errors: string | any[] }) => filing.errors.length === 0).length;
      const failedFilings = data.filings.filter((filing: { errors: string | any[] }) => filing.errors.length > 0).length;
      setOpenConfirmation("");
      const added = () => {
        let text: string;
        if (failedFilings != 0) {
          text = `and ${failedFilings} filings doesn't`;
        } else text = "";

        return text;
      };
      setSelectedRecords([]);
      if (successfulFilings >= 1) {
        setOpenAlert("SuccessEndorse");
        setSuccess(`${successfulFilings}   filings has been successfully endorsed!  ${added()}`);
      }
      setWarning(`${failedFilings}   filings failed to endorsed!`);
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

  return (
    <Modal opened={opened} size="lg" centered padding={small ? 20 : 30} radius={10} withCloseButton={false} onClose={onClose} styles={{ body: { overflow: "hidden" } }}>
      <div className="flex justify-between">
        <Text fw={600} fz={small ? 15 : 22} c={"#559CDA"}>
          Endorse Request
        </Text>
      </div>
      <Divider size="xs" color="#6D6D6D" mt={10} />
      <Text className="text-[#6d6d6d] mt-5">{selectedRecords.length} Missed Log</Text>
      <div className="flex flex-col mt-3 w-full text-[#6d6d6d] items-center pt-4 gap-3 px-5">
        <Stack className="flex flex-row w-full justify-end mt-5">
          <Button variant="outline" className="rounded-md w-44" onClick={buttonClose}>
            CANCEL
          </Button>
          <Button className="rounded-md br-gradient border-none w-44" onClick={() => batchEndorseMissedLog()}>
            CONFIRM
          </Button>
        </Stack>
      </div>
    </Modal>
  );
}
