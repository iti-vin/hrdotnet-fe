import { Menu, ActionIcon, rem } from "@mantine/core";
import {
  IconSettings,
  IconUserCircle,
  IconBuildings,
  IconLock,
} from "@tabler/icons-react";

export const Settings = () => {
  return (
    <Menu
      shadow="md"
      width={250}
      position="bottom-end"
      radius={20}
      zIndex={9999}
      transitionProps={{ transition: "fade-down", duration: 100 }}
    >
      <Menu.Target>
        <ActionIcon variant="transparent" size="lg" aria-label="Settings">
          <IconSettings
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
            color="black"
          />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown className="p-2">
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          className="poppins"
          fw={500}
          leftSection={
            <IconUserCircle
              visibility="sm"
              style={{ width: rem(20), height: rem(20) }}
            />
          }
        >
          Administrator Settings
        </Menu.Item>
        <Menu.Item
          className="poppins"
          fw={500}
          leftSection={
            <IconBuildings style={{ width: rem(20), height: rem(20) }} />
          }
        >
          Company Settings
        </Menu.Item>
        <Menu.Item
          className="poppins"
          fw={500}
          leftSection={<IconLock style={{ width: rem(20), height: rem(20) }} />}
        >
          Security
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
