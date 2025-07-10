/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { PropsWithChildren } from "react";
//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { Stack, Text } from "@mantine/core";
import useLeaveStore from "../../../store/LeaveStore";
import { Button, Confirmation, TextArea } from "@shared/components";

interface AlertProps extends PropsWithChildren {
  message?: React.ReactNode;
  onClick?(): void;
}

export default function BatchCancel({ message, onClick }: AlertProps) {
  const small = useMediaQuery("(max-width: 40em)");
  const { openDialog, setOpenDialog, setSelectedRecords } = useLeaveStore();

  return (
    <Confirmation
      opened={openDialog === "BatchCancel"}
      size="lg"
      centered
      padding={small ? 20 : 30}
      radius={10}
      withCloseButton={false}
      onClose={() => setOpenDialog("")}
      styles={{ body: { overflow: "hidden" } }}
      formProps={{ onSubmit: () => {} }}
      footer={
        <Stack className="flex flex-row w-full justify-end mt-5">
          <Button
            variant="outline"
            className="border-[#559cda] text-[#559cda]"
            radius="md"
            h={40}
            w={100}
            onClick={() => {
              setSelectedRecords([]);
              setOpenDialog("");
            }}>
            BACK
          </Button>
          <Button variant="gradient" radius="md" type="submit" h={40} w={100} onClick={onClick}>
            SUBMIT
          </Button>
        </Stack>
      }>
      <Text className="text-[#6d6d6d] mt-5">{message}</Text>

      <TextArea label="Reason" required className="mt-5" />
    </Confirmation>
  );
}
