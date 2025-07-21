/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import {
  ActionIcon,
  Menu,
  // rem
} from "@mantine/core";
//--- Tabler Icons
import {
  IconSettings,
  // IconUserCircle,
  // IconBuildings,
  // IconLock
} from "@tabler/icons-react";

export default function Settings() {
  return (
    <Menu shadow="md" width={250} position="bottom-end" radius={10} transitionProps={{ transition: "fade-down", duration: 100 }}>
      <Menu.Target>
        <ActionIcon variant="transparent" size="lg" aria-label="Settings">
          <IconSettings style={{ width: "70%", height: "70%" }} stroke={2} color="#6d6d6d" />
        </ActionIcon>
      </Menu.Target>

      {/* <Menu.Dropdown className="p-2">
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item className="poppins" color="#6d6d6d" fw={500} leftSection={<IconUserCircle visibility="sm" style={{ width: rem(20), height: rem(20) }} />}>
          Administrator Settings
        </Menu.Item>
        <Menu.Item className="poppins" color="#6d6d6d" fw={500} leftSection={<IconBuildings style={{ width: rem(20), height: rem(20) }} />}>
          Company Settings
        </Menu.Item>
        <Menu.Item className="poppins" color="#6d6d6d" fw={500} leftSection={<IconLock style={{ width: rem(20), height: rem(20) }} />}>
          Security
        </Menu.Item>
      </Menu.Dropdown> */}
    </Menu>
  );
}
