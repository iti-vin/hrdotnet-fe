/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */
//--- React Modules
import { NavLink } from "react-router-dom";
//--- Mantine Modules
import { ActionIcon, AppShell, Burger, Flex, Group } from "@mantine/core";
//--- Tabler Icons
import { IconArrowLeftBar } from "@tabler/icons-react";

//--- Header Components
import Settings from "./header/Settings";
import Profile from "./header/Profile";
import Notification from "./header/Notification";
//--- Header Assets
import { HeaderProps } from "../assets/types";

export default function Header({ opened, toggle, visibleBack }: HeaderProps) {
  return (
    <AppShell.Header>
      {visibleBack && (
        <Flex justify="center" align="center" pl={20}>
          <NavLink to="/">
            <ActionIcon variant="outline" size="xl" aria-label="Settings">
              <IconArrowLeftBar style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </NavLink>
        </Flex>
      )}
      <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
      </Group>
      <Group h="100%" px="md" flex="">
        <Flex align="center" gap="xs">
          <Notification />
          <Settings />
          <Profile />
        </Flex>
      </Group>
    </AppShell.Header>
  );
}
