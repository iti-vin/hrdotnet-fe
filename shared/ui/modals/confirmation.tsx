/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Button, MantineRadius, MantineSize, Modal, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCircleCheck, IconExclamationMark, IconQuestionMark, IconX } from "@tabler/icons-react";
import { PropsWithChildren, ReactNode } from "react";

interface AlertProps extends PropsWithChildren {
  opened: boolean;
  onClose?(): void;
  size?: string | MantineSize;
  radius?: string | number | MantineRadius;
  variant?: "success" | "danger" | "warning";
  title?: ReactNode;
  description?: ReactNode;
  no?: {
    onClick(): void;
    title?: string;
  };
  yes?: {
    onClick(): void;
    title?: string;
  };
}

export default function Confirmation({ opened, onClose, radius, size, variant = "success", title, description, no, yes, children }: AlertProps) {
  const small = useMediaQuery("(max-width: 40em)");

  const rndrIcon = () => {
    if (variant === "warning") {
      return <IconQuestionMark size={85} stroke={1} className="text-[#6d6d6d] border-4 border-[#6d6d6d] rounded-full" />;
    } else if (variant === "success") {
      return <IconCircleCheck size={100} stroke={1} className="text-[#1E8449]" />;
    } else if (variant === "danger") {
      return <IconExclamationMark size={85} stroke={1} className="border-4 text-[#FF4B34] border-[#FF4B34] rounded-full" />;
    }
  };

  return (
    <Modal
      opened={opened}
      size={size ? size : "md"}
      centered
      padding={small ? 20 : 25}
      radius={radius || 10}
      withCloseButton={false}
      onClose={onClose!}
      styles={{ body: { overflow: "hidden" } }}>
      <div className="flex justify-end">
        <IconX color="#6D6D6D" className="cursor-pointer" size={20} onClick={onClose!} />
      </div>

      <div className="flex flex-col mt-3 w-full text-[#6d6d6d] items-center pt-4 gap-3 px-5">
        <div>{rndrIcon()}</div>
        <div className="text-[#6d6d6d] font-semibold text-xl text-center">{title}</div>
        <div className="text-md text-center">{description}</div>

        {children && <div className="w-full bg-white shadow-inner rounded-md p-4 flex justify-center items-center">{children}</div>}

        <Stack className="flex flex-row w-full justify-evenly mt-5">
          {no && (
            <Button variant="outline" className="rounded-md w-full" onClick={no.onClick}>
              {no.title ? no.title : "NO"}
            </Button>
          )}

          {yes && (
            <Button className="rounded-md br-gradient border-none w-full" onClick={yes.onClick}>
              {yes.title ? yes.title : "YES"}
            </Button>
          )}
        </Stack>
      </div>
    </Modal>
  );
}
