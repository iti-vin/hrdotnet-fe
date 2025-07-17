/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { ActionIcon, Avatar, Flex, Menu, Text, Transition } from "@mantine/core";
import { useLogoWidth } from "@shared/hooks/useWidth";
//--- Tabler Icons
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

//--- Sample-Image
import { useState } from "react";

export default function SwitchCompany() {
  const { isLogowordVisible } = useLogoWidth();
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <Menu
      shadow="md"
      width={220}
      position="bottom-end"
      radius={10}
      transitionProps={{ transition: "fade-down", duration: 100 }}
      onOpen={() => setMenuOpened(true)}
      onClose={() => setMenuOpened(false)}>
      <Menu.Target>
        <Flex justify="space-between" className="cursor-pointer" align="center" direction="row" wrap="wrap" gap={10}>
          <Flex gap={10}>
            <Avatar color="#71c7d4" variant="filled" radius="md" children="TW" />
            {isLogowordVisible && (
              <Flex direction="column">
                <Text fz={12} fw={700} c="#6d6d6d" children="Twice Once Inc." />
                <Text fz={10} fw={200} c="#6d6d6d" children="Main Company" />
              </Flex>
            )}
          </Flex>
          <Transition mounted={isLogowordVisible ? true : false} transition="scale" duration={200} timingFunction="ease" enterDelay={5} exitDuration={3}>
            {(styles) => (
              <ActionIcon variant="white" aria-label="Toggle">
                {menuOpened ? (
                  <IconChevronUp style={{ ...styles, width: "70%", height: "70%" }} stroke={1.5} color="#6d6d6d" />
                ) : (
                  <IconChevronDown style={{ ...styles, width: "70%", height: "70%" }} stroke={1.5} color="#6d6d6d" />
                )}
              </ActionIcon>
            )}
          </Transition>
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label className="p-2">
          <Text fz={13} c="#6d6d6d" fw={700}>
            Switch Company
          </Text>
        </Menu.Label>
        <Menu.Divider />

        {/* Main Company */}
        <Menu.Label>
          <Text fz={13} fw={600}>
            Main Company
          </Text>
        </Menu.Label>
        <Menu.Item
          className={`poppins ${location.pathname == "" && "text-white custom-gradient"}`}
          color="#6d6d6d"
          fw={700}
          fz={12}
          leftSection={<Avatar size="sm" color="#71c7d4" variant="filled" radius="md" children="TW" />}>
          Twice Once Inc.
        </Menu.Item>

        {/* Sister Companies */}
        <Menu.Label>
          <Text fz={13} fw={600}>
            Sister Companies
          </Text>
        </Menu.Label>
        <Menu.Item
          className={`poppins ${location.pathname == "" && "text-white custom-gradient"}`}
          color="#6d6d6d"
          fw={700}
          fz={12}
          leftSection={<Avatar size="sm" color="orange" variant="filled" radius="md" children="BM" />}>
          Baby Monster
        </Menu.Item>
        <Menu.Item
          className={`poppins ${location.pathname == "" && "text-white custom-gradient"}`}
          color="#6d6d6d"
          fw={700}
          fz={12}
          leftSection={<Avatar size="sm" color="pink" variant="filled" radius="md" children="BP" />}>
          Black Pink
        </Menu.Item>
        <Menu.Item
          className={`poppins ${location.pathname == "" && "text-white custom-gradient"}`}
          color="#6d6d6d"
          fw={700}
          fz={12}
          leftSection={<Avatar size="sm" color="purple" variant="filled" radius="md" children="NJ" />}>
          New Jeans
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
