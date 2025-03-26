/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { Button, Divider, Modal, Stack, Text, Textarea } from "@mantine/core";
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

export default function BatchCancel({ opened, onClose, buttonClose }: BatchInterface) {
  const small = useMediaQuery("(max-width: 40em)");
  const { selectedRecords, setError, setWarning, setSuccess, setOpenAlert, setSelectedRecords, setOpenConfirmation } = useMissedLogStore();

  const { mutate: batchCancelMissedLog } = useMutation({
    mutationFn: async () => {
      const formData = BatchMissedLog(selectedRecords);
      return MissedLogServices.batchCancelMissedLog(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviewal_missedlog"] });
      queryClient.invalidateQueries({ queryKey: ["approval_missedlog"] });
      setOpenConfirmation("");
      setSelectedRecords([]);
      const successfulFilings = data.filings.filter((filing: { errors: string | any[] }) => filing.errors.length === 0).length;
      const failedFilings = data.filings.filter((filing: { errors: string | any[] }) => filing.errors.length > 0).length;
      setOpenConfirmation("");
      setSelectedRecords([]);
      const added = () => {
        let text: string;
        if (failedFilings != 0) {
          text = `and ${failedFilings} filings doesn't`;
        } else text = "";

        return text;
      };
      if (successfulFilings >= 1) {
        setOpenAlert("SuccessCancel");
        setSuccess(`${successfulFilings}   filings has been canceled!  ${added()}`);
      }
      setWarning(`${failedFilings}   filings failed to cancel!`);
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

  return (
    <Modal opened={opened} size="lg" centered padding={small ? 20 : 30} radius={10} withCloseButton={false} onClose={onClose} styles={{ body: { overflow: "hidden" } }}>
      <div className="flex justify-between">
        <Text fw={600} fz={small ? 15 : 22} c={"#559CDA"}>
          Cancel Request
        </Text>
      </div>
      <Divider size="xs" color="#6D6D6D" mt={10} />
      <Text className="text-[#6d6d6d] mt-5">{selectedRecords.length} Missed Log</Text>
      <Textarea label="Reason" required className="mt-5" />
      <div className="flex flex-col mt-3 w-full text-[#6d6d6d] items-center pt-4 gap-3 px-5">
        <Stack className="flex flex-row w-full justify-end mt-5">
          <Button variant="outline" className="rounded-md w-44" onClick={buttonClose}>
            CANCEL
          </Button>
          <Button className="rounded-md br-gradient border-none w-44" onClick={() => batchCancelMissedLog()}>
            CONFIRM
          </Button>
        </Stack>
      </div>
    </Modal>
  );
}
