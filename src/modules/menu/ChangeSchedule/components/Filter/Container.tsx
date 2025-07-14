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
import FilterPill from "./components/FilterPill";
import styles from "./style/filter.module.css";

interface DrawerFilterI {
  panel?: Panel;
}

export default function ContainerFilter({ panel }: DrawerFilterI) {
  const { storedFilters, setOpenDrawer, removeStoredFilter } = useChangeOfScheduleStore();
  const { onHandleClearFilter } = useChangeOfScheduleContext();

  const removeDocStatusId = useChangeOfScheduleStore((s) => s.removeDocStatusId);

  const selectedStatus = () => {
    const statusPill = [
      { value: 1, label: "Filed" },
      { value: 2, label: "Approve" },
      { value: 3, label: "Cancelled" },
      { value: 4, label: "Reviewed" },
    ];
    if (!storedFilters?.DocStatusIds?.length) return null;
    const selected = statusPill.filter((pill) => storedFilters.DocStatusIds.includes(pill.value));
    return (
      <div className={styles.pillGroupContainer}>
        <Pill.Group>
          {selected.map((item, index) => (
            <FilterPill key={item.value} onRemove={() => removeDocStatusId(item.value)} className={index === selected.length - 1 ? styles.lastPill : ""}>
              {item.label}
            </FilterPill>
          ))}
        </Pill.Group>
      </div>
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
          <Group mx={8}>
            {storedFilters.DocumentNo && (
              <FilterPill title="Doc no:" onRemove={() => removeStoredFilter("DocumentNo")}>
                {storedFilters.DocumentNo}
              </FilterPill>
            )}

            {storedFilters.DateFrom && storedFilters.DateTo && (
              <FilterPill
                title="Date transaction"
                onRemove={() => {
                  removeStoredFilter("DateFom");
                  removeStoredFilter("DateTo");
                }}>
                {storedFilters.DateFrom}- {storedFilters.DateTo}
              </FilterPill>
            )}
            {storedFilters.DocStatusIds! && (
              <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
                <Text className={styles.text}>Status:</Text>
                {selectedStatus()}
              </Flex>
            )}
          </Group>
        </Flex>

        <Flex pr={10} py={8} gap={5}>
          <ActionIcon className={styles.iconBtn} aria-label="Settings" onClick={() => setOpenDrawer(true)}>
            <IconCirclePlus className={styles.icon} />
          </ActionIcon>
          <ActionIcon className={styles.iconBtn} aria-label="Settings" onClick={onHandleClearFilter}>
            <IconTrash className={styles.icon} />
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
