/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { PropsWithChildren } from "react";
//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { Button, Divider, Modal, Stack, Text, Textarea } from "@mantine/core";
import useLeaveStore from "../../../store/LeaveStore";

interface AlertProps extends PropsWithChildren {
  message?: React.ReactNode;
  onClick?(): void;
}

export default function BatchCancel({ message, onClick }: AlertProps) {
  const small = useMediaQuery("(max-width: 40em)");
  const { openDialog, setOpenDialog, setSelectedRecords } = useLeaveStore();

  return (
    <Modal
      opened={openDialog === "BatchCancel"}
      size="lg"
      centered
      padding={small ? 20 : 30}
      radius={10}
      withCloseButton={false}
      onClose={() => setOpenDialog("")}
      styles={{ body: { overflow: "hidden" } }}>
      <div className="flex justify-between">
        <Text fw={600} fz={small ? 15 : 22} c={"#559CDA"}>
          Cancel Request
        </Text>
      </div>
      <Divider size="xs" color="#6D6D6D" mt={10} />

      <Text className="text-[#6d6d6d] mt-5">{message}</Text>

      <Textarea label="Reason" required className="mt-5" />

      <div className="flex flex-col mt-3 w-full text-[#6d6d6d] items-center pt-4 gap-3 px-5">
        <Stack className="flex flex-row w-full justify-end mt-5">
          <Button
            variant="outline"
            className="rounded-md w-44"
            onClick={() => {
              setSelectedRecords([]);
              setOpenDialog("");
            }}>
            CANCEL
          </Button>
          <Button className="rounded-md br-gradient border-none w-44" onClick={onClick}>
            CONFIRM
          </Button>
        </Stack>
      </div>
    </Modal>
  );
}
