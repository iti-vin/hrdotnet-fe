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
import Drawer from "./Drawer";
import { Panel } from "@shared/assets/types/Global";
import { useChangeOfScheduleStore } from "../../store";
import { useChangeOfScheduleContext } from "../../context";

interface DrawerFilterI {
  panel?: Panel;
}

export default function ContainerFilter({ panel }: DrawerFilterI) {
  const { setOpenDrawer, storedFilters } = useChangeOfScheduleStore();
  const { onHandleClearFilter } = useChangeOfScheduleContext();

  const selectedStatus = () => {
    const statusPill = [
      { value: 1, label: "Filed" },
      { value: 2, label: "Approve" },
      { value: 3, label: "Cancelled" },
      { value: 4, label: "Reviewed" },
    ];

    if (!storedFilters || !storedFilters.DocStatusIds || storedFilters.DocStatusIds.length === 0) {
      return null;
    }

    const selected = statusPill.filter(
      (pill) => Array.isArray(storedFilters.DocStatusIds) && storedFilters.DocStatusIds.includes(pill.value)
    );

    return (
      <Pill.Group>
        {selected.map((item) => (
          <Pill key={item.value} onRemove={() => {}}>
            {item.label}
          </Pill>
        ))}
      </Pill.Group>
    );
  };

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
                <Pill classNames={{ root: "bg-[#d9d9d9]", label: "text-[#6D6D6D] font-semibold" }} withRemoveButton>
                  {storedFilters.DocumentNo}
                </Pill>
                <Text size="xl" c="#eeeeee">
                  |
                </Text>
              </Flex>
            )}
            {storedFilters.DateFrom && storedFilters.DateTo && (
              <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
                <Text>Date Transaction:</Text>
                <Pill classNames={{ root: "bg-[#d9d9d9]", label: "text-[#6D6D6D] font-semibold" }} withRemoveButton>
                  {storedFilters.DateFrom}- {storedFilters.DateTo}
                </Pill>
                <Text size="xl" c="#eeeeee">
                  |
                </Text>
              </Flex>
            )}
            {storedFilters.DocStatusIds! && (
              <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
                <Text>Status:</Text>
                {selectedStatus()}
              </Flex>
            )}
          </Group>
        </Flex>

        <Flex pr={10} py={8} gap={5}>
          <ActionIcon
            variant="transparent"
            color="gray"
            size="md"
            aria-label="Settings"
            onClick={() => setOpenDrawer(true)}>
            <IconCirclePlus style={{ width: "100%", height: "100%" }} stroke={1.5} color="#6d6d6d" />
          </ActionIcon>
          <ActionIcon variant="transparent" color="gray" size="md" aria-label="Settings">
            <IconTrash
              style={{ width: "100%", height: "100%" }}
              stroke={1.5}
              color="#6d6d6d"
              onClick={onHandleClearFilter}
            />
          </ActionIcon>
        </Flex>
      </Flex>
      <Drawer
        {...(panel !== "REQUEST" && {
          isNotUser: true,
        })}
      />
    </Fragment>
  );
}
