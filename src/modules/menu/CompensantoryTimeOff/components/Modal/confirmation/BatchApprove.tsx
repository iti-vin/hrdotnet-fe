/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { Stack, Text } from "@mantine/core";
import { useCTOStore } from "../../../store";
import { Button, Confirmation } from "@shared/components";

interface BatchInterface {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function BatchApprove({ opened, onClose, buttonClose }: BatchInterface) {
  const small = useMediaQuery("(max-width: 40em)");
  const { setOpenAlert, setOpenConfirmation } = useCTOStore();

  const handleBatchApprove = () => {
    setOpenConfirmation("");
    setOpenAlert("BatchApprove");
  };

  return (
    <Confirmation
      opened={opened}
      title="Batch Approve"
      size="lg"
      centered
      padding={small ? 20 : 30}
      radius={10}
      withCloseButton={false}
      onClose={onClose}
      styles={{ body: { overflow: "hidden" } }}
      footer={
        <Stack className="flex flex-row w-full justify-end">
          <Button variant="outline" className="text-[#559cda] border-[#559cda]" w={100} h={35} onClick={buttonClose}>
            CANCEL
          </Button>
          <Button variant="gradient" w={100} h={35} onClick={() => handleBatchApprove()}>
            CONFIRM
          </Button>
        </Stack>
      }>
      <Text className="text-[#6d6d6d] mt-5">2 Compensatory Time-Off </Text>
    </Confirmation>
  );
}
