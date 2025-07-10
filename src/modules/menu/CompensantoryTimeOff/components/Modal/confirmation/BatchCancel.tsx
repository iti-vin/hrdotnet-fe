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

export default function BatchCancel({ opened, onClose, buttonClose }: BatchInterface) {
  const small = useMediaQuery("(max-width: 40em)");
  const { setOpenAlert, setOpenConfirmation } = useCTOStore();

  const handleBatchCancel = () => {
    setOpenConfirmation("");
    setOpenAlert("BatchCancel");
  };

  return (
    <Confirmation
      opened={opened}
      size="lg"
      title="Cancel Request"
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
          <Button variant="gradient" w={100} h={35} onClick={handleBatchCancel}>
            CONFIRM
          </Button>
        </Stack>
      }>
      <Text className="text-[#6d6d6d] mt-5">2 Compensatory Time-Off </Text>
    </Confirmation>
  );
}
