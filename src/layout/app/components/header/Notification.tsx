/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { Flex, Indicator, Popover, Tabs, Text } from "@mantine/core";
//--- Icons Modules
import { IconBell } from "@tabler/icons-react";
import Items from "./notifications/NotificationItems";

//--- Shared Icons
import MessageGradient from "@shared/assets/icons/MessageGradient";

export default function Notification() {
  return (
    <Popover>
      <Popover.Target>
        <Indicator inline processing color="red" size={12} className="cursor-pointer">
          <IconBell style={{ width: "100%", height: "100%" }} stroke={1.5} color="black" />
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown px={0}>
        <Flex justify="space-between" px={15}>
          <Text className="custom-gradient bg-clip-text text-transparent font-semibold text-xl pb-3 ">Notifications</Text>
          <MessageGradient size={22} tooltip="Mark All as Read" />
        </Flex>
        <Tabs color="orange" variant="pills" radius="xs" defaultValue="all">
          <Tabs.List grow justify="center" px={10} pb={10}>
            <Tabs.Tab value="all">All</Tabs.Tab>
            <Tabs.Tab value="approved">Approved</Tabs.Tab>
            <Tabs.Tab value="pending">Pending</Tabs.Tab>
            <Tabs.Tab value="reviewed">Reviewed</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all">
            <Items />
          </Tabs.Panel>
          <Tabs.Panel value="approved">
            <Items filingStatus="approved" />
          </Tabs.Panel>
          <Tabs.Panel value="pending">
            <Items filingStatus="cancelled" />
          </Tabs.Panel>
          <Tabs.Panel value="reviewed">
            <Items filingStatus="reviewed" />
          </Tabs.Panel>
        </Tabs>
      </Popover.Dropdown>
    </Popover>
  );
}
