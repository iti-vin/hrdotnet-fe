import { Button, Flex, Popover, Stack, Text } from "@mantine/core";
import { IconCircleCheck, IconCirclePlus, IconCircleX } from "@tabler/icons-react";
import React from "react";

interface HeaderProps {
  buttonClick?: () => void;
  title?: string;
  buttonLabel2?: string;

  normalBtn?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };

  popoverBtn?: {
    label: string;
    icon: React.ReactNode;
    innerLabel?: string;
    fOnClick: () => void;
    sOnClick: () => void;
  };
}

export default function Header({ ...props }: HeaderProps) {
  const [opened, setOpened] = React.useState(false);

  const handleClose = () => setOpened(false);

  const { buttonClick, title = "Title Header", buttonLabel2, normalBtn, popoverBtn } = props;
  return (
    <Flex direction={{ base: "column", sm: "row" }} justify={{ base: "center", sm: "space-between" }} align={{ base: "center", sm: "space-between" }} className="w-full">
      <Text className="text-xl font-semibold text-[#559CDA]" fz={22}>
        {title}
      </Text>
      <Flex justify="center" gap={13}>
        {buttonLabel2 && (
          <Button className="flex justify-between" radius="md" onClick={buttonClick} color="#559CDA" leftSection={<IconCirclePlus size={25} stroke={2} />} h={36}>
            {buttonLabel2}
          </Button>
        )}
        {normalBtn && (
          <Button
            className="flex justify-between"
            radius="md"
            onClick={normalBtn.onClick}
            color="#559CDA"
            leftSection={normalBtn.icon ? normalBtn.icon : <IconCirclePlus size={25} stroke={2} />}
            h={36}>
            {normalBtn.label}
          </Button>
        )}
        {popoverBtn && (
          <Popover width={200} trapFocus position="bottom" withArrow shadow="md" opened={opened} onChange={setOpened}>
            <Popover.Target>
              <Button className="flex justify-between" radius="md" color="#559CDA" leftSection={popoverBtn.icon} h={36} onClick={() => setOpened((o) => !o)}>
                {popoverBtn.label}
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack className="w-full flex flex-col">
                <Button
                  className="w-full flex justify-between"
                  radius="md"
                  onClick={() => {
                    popoverBtn.fOnClick();
                    handleClose();
                  }}
                  color="#559CDA"
                  leftSection={<IconCircleCheck size={25} stroke={2} />}
                  h={36}>
                  {popoverBtn.innerLabel}
                </Button>
                <Button
                  className="w-full flex justify-between"
                  radius="md"
                  onClick={() => {
                    popoverBtn.sOnClick();
                    handleClose();
                  }}
                  color="#559CDA"
                  leftSection={<IconCircleX size={25} stroke={2} />}
                  h={36}>
                  CANCEL
                </Button>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        )}
      </Flex>
    </Flex>
  );
}
