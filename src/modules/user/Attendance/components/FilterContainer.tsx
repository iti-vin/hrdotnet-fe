/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { ActionIcon, Flex, Group, Text } from "@mantine/core";
//--- Icons Modules
import { ListFilter } from "lucide-react";
import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
//--- React Modules
import { Fragment } from "react";
//---
import DrawerFilter from "./FilterDrawer";

export default function index() {
  return (
    <Fragment>
      <Flex className="filter-container">
        <Flex className="h-full flex flex-row items-center justify-center">
          <Flex bg="#eeeeee" className="w-auto h-full items-center px-2 gap-4 rounded-l-md">
            <ListFilter size={20} color="#6d6d6d" />
            <Text fw={500} c="#6d6d6d" visibleFrom="md">
              FILTERS APPLIED
            </Text>
          </Flex>
          <Group></Group>
        </Flex>

        <Flex pr={10} py={8} gap={5}>
          <ActionIcon variant="transparent" color="gray" size="md" aria-label="Settings" onClick={() => {}}>
            <IconCirclePlus style={{ width: "100%", height: "100%" }} stroke={1.5} color="#6d6d6d" />
          </ActionIcon>
          <ActionIcon variant="transparent" color="gray" size="md" aria-label="Settings">
            <IconTrash style={{ width: "100%", height: "100%" }} stroke={1.5} color="#6d6d6d" onClick={undefined} />
          </ActionIcon>
        </Flex>
      </Flex>
      <DrawerFilter />
    </Fragment>
  );
}
