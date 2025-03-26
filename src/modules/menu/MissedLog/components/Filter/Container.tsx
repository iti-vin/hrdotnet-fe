/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { ActionIcon, Flex, Group, Pill, Text } from "@mantine/core";
//--- Icons Modules
import { ListFilter } from "lucide-react";
import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
//--- React Modules
import { Fragment } from "react";
//---
import DrawerFilter from "./Drawer";
import { useMissedLogStore } from "../../store/main";

interface MissedLogFilterI {
  panel?: "FILINGS" | "REQUEST" | "REVIEWAL" | "APPROVAL" | "LEDGER";
}

export default function index({ panel }: MissedLogFilterI) {
  const { setShowDrawer, storedFilters, setStoredFilters } = useMissedLogStore();
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
          <Group>
            {storedFilters.DocumentNo && (
              <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
                <Text>Doc No:</Text>
                <Pill withRemoveButton>{storedFilters.DocumentNo}</Pill>
                <Text size="xl" c="#eeeeee">
                  |
                </Text>
              </Flex>
            )}

            {storedFilters.DateFrom && storedFilters.DateTo && (
              <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
                <Text>Date Transaction:</Text>
                <Pill withRemoveButton>
                  {storedFilters.DateFrom}- {storedFilters.DateTo}
                </Pill>
                <Text size="xl" c="#eeeeee">
                  |
                </Text>
              </Flex>
            )}
          </Group>
        </Flex>

        <Flex pr={10} py={8} gap={5}>
          <ActionIcon variant="transparent" color="gray" size="md" aria-label="Settings" onClick={() => setShowDrawer(true)}>
            <IconCirclePlus style={{ width: "100%", height: "100%" }} stroke={1.5} color="#6d6d6d" />
          </ActionIcon>
          <ActionIcon variant="transparent" color="gray" size="md" aria-label="Settings">
            <IconTrash style={{ width: "100%", height: "100%" }} stroke={1.5} color="#6d6d6d" onClick={() => setStoredFilters({})} />
          </ActionIcon>
        </Flex>
      </Flex>
      <DrawerFilter
        {...(panel !== "REQUEST" && {
          isNotUser: true,
        })}
      />
    </Fragment>
  );
}
