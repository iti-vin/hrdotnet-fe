/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { Button, Divider, Modal, Stack, Text } from "@mantine/core";
import { useCTOStore } from "../../../store";

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
      <Text className="text-[#6d6d6d] mt-5">2 Compensatory Time-Off </Text>
      <div className="flex flex-col mt-3 w-full text-[#6d6d6d] items-center pt-4 gap-3 px-5">
        <Stack className="flex flex-row w-full justify-end mt-5">
          <Button variant="outline" className="rounded-md w-44" onClick={buttonClose}>
            CANCEL
          </Button>
          <Button className="rounded-md br-gradient border-none w-44" onClick={handleBatchCancel}>
            CONFIRM
          </Button>
        </Stack>
      </div>
    </Modal>
  );
}
