/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Divider, Flex, Modal, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import { PropsWithChildren, useEffect } from "react";

interface AlertProps extends PropsWithChildren {
  opened: boolean;
  onClose?(): void;

  size?: string;
  radius?: string | number;
  headerTitle?: string;
  successFilings?: string;
  failedFilings?: string;
}

export default function Alert({ opened, onClose, headerTitle, radius, successFilings, failedFilings }: AlertProps) {
  const small = useMediaQuery("(max-width: 40em)");

  useEffect(() => {
    if (opened) {
      const timer = setTimeout(onClose!, 5000);
      return () => clearTimeout(timer);
    }
  }, [opened, onClose]);

  if (!opened) return null;

  return (
    <Modal opened={opened} size="md" centered padding={small ? 20 : 30} radius={radius || 10} withCloseButton={false} onClose={onClose!} styles={{ body: { overflow: "hidden" } }}>
      <div className="flex justify-between">
        <Text fw={600} fz={small ? 15 : 22} c={"#559CDA"}>
          Batch {headerTitle}
        </Text>
      </div>
      <Divider size="xs" color="#6D6D6D" mt={10} />

      <div className="flex flex-col mt-3 w-full text-[#6d6d6d] items-start pt-4 gap-3 px-5">
        {successFilings ? (
          <Flex direction="row" gap={10} align="center" justify="center">
            <IconCircleCheck color="green" size={25} />
            <Text className="text-md font-semibold">{successFilings}</Text>
          </Flex>
        ) : null}
        {failedFilings ? (
          <Flex direction="row" gap={10} align="center" justify="center">
            <IconCircleX color="red" size={25} />
            <Text className="text-md font-semibold">{failedFilings}</Text>
          </Flex>
        ) : null}
      </div>
    </Modal>
  );
}
