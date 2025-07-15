/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Button, Divider, Modal, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChecklist, IconExclamationCircle, IconQuestionMark } from "@tabler/icons-react";
import { PropsWithChildren } from "react";

interface AlertProps extends PropsWithChildren {
  opened: boolean;
  onClose?(): void;

  size?: string;
  radius?: string | number;
  headerTitle?: string;
  icon?: "Success" | "Danger" | "Warning";
  title?: string;
  description?: string;
  no?: {
    onClick(): void;
    title?: string;
  };
  yes?: {
    onClick(): void;
    title?: string;
  };
}

export default function Alert({ opened, onClose, headerTitle, radius, size, icon = "Success", title, description, no, yes }: AlertProps) {
  const small = useMediaQuery("(max-width: 40em)");
  const rndrIcon = () => {
    if (icon === "Success") {
      return <IconChecklist size={100} stroke={1} className="text-[#559cda]" />;
    } else if (icon === "Danger") {
      return <IconExclamationCircle size={100} stroke={1} className="text-[#FF4B34]" />;
    } else if (icon === "Warning") {
      return <IconQuestionMark size={100} stroke={1} className="border-2 text-[#559cda] border-[#559cda] rounded-full" />;
    }
  };
  return (
    <Modal
      opened={opened}
      size={size ? size : "xs"}
      centered
      padding={small ? 20 : 30}
      radius={radius || 10}
      withCloseButton={false}
      onClose={onClose!}
      styles={{ body: { overflow: "hidden" } }}>
      <div className="flex justify-between">
        <Text fw={600} fz={small ? 15 : 22} c={icon === "Danger" ? "#FF4B34" : "#559CDA"}>
          {headerTitle ? headerTitle : "Modal"}
        </Text>
      </div>
      <Divider size="xs" color="#6D6D6D" mt={10} />

      <div className="flex flex-col mt-3 w-full text-[#6d6d6d] items-center pt-4 gap-3 px-5">
        <div>{rndrIcon()}</div>
        <div className="text-[#6d6d6d] font-semibold text-[25px] text-center">{title}</div>
        <div className="text-sm">{description}</div>

        {no && yes ? (
          <Stack className="flex flex-row w-full justify-evenly mt-10">
            <Button variant="outline" className="rounded-md w-44" onClick={no.onClick}>
              {no.title ? no.title : "NO"}
            </Button>
            <Button className="rounded-md br-gradient border-none w-44" onClick={yes.onClick}>
              {yes.title ? yes.title : "YES"}
            </Button>
          </Stack>
        ) : null}
      </div>
    </Modal>
  );
}
