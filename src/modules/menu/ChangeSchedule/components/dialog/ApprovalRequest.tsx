/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { PropsWithChildren } from "react";
//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { Button, Divider, Modal, Stack, Text } from "@mantine/core";

interface AlertProps extends PropsWithChildren {
  opened: boolean;
  message?: number;
  onClick?(): void;
  onClose?(): void;
}

export default function BatchApproval({ opened, onClose, message, onClick }: AlertProps) {
  const small = useMediaQuery("(max-width: 40em)");

  return (
    <Modal opened={opened} size="lg" centered padding={small ? 20 : 30} radius={10} withCloseButton={false} onClose={onClose!} styles={{ body: { overflow: "hidden" } }}>
      <div className="flex justify-between">
        <Text fw={600} fz={small ? 15 : 22} c={"#559CDA"}>
          Batch Approve
        </Text>
      </div>
      <Divider size="xs" color="#6D6D6D" mt={10} />

      <Text className="text-[#6d6d6d] mt-5">{message} COS Request</Text>

      <div className="flex flex-col mt-3 w-full text-[#6d6d6d] items-center pt-4 gap-3 px-5">
        <Stack className="flex flex-row w-full justify-end mt-5">
          <Button variant="outline" className="rounded-md w-44" onClick={onClose}>
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
