import { Flex, Popover, Stack, Text } from "@mantine/core";
import { Button } from "@shared/components/button";
import useResponsive from "@shared/hooks/useResponsive";
import { IconCircleCheck, IconFilePlus, IconForbid2 } from "@tabler/icons-react";
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

  const { isSmallHeight, isSmallWidth } = useResponsive();

  const handleClose = () => setOpened(false);

  const { title = "Title Header", normalBtn, popoverBtn } = props;
  return (
    <Flex direction={{ base: "column", sm: "row" }} justify={{ base: "center", sm: "space-between" }} align={{ base: "center", sm: "space-between" }} className="w-full">
      <Text className="text-xl font-semibold text-[#559CDA]" fz={isSmallHeight || isSmallWidth ? 20 : 22}>
        {title}
      </Text>
      <Flex justify="center" gap={13}>
        {normalBtn && (
          <Button
            className="flex justify-between"
            radius="md"
            type="button"
            onClick={normalBtn.onClick!}
            color="#559CDA"
            leftSection={normalBtn.icon ? normalBtn.icon : <IconFilePlus size={25} stroke={2} />}
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
                  leftSection={<IconForbid2 size={25} stroke={2} />}
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
