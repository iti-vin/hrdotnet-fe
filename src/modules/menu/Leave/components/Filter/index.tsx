import { ListFilter } from "lucide-react";
import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
import { ActionIcon, Flex, Group, Pill, Text } from "@mantine/core";
import "./index.css";
import DrawerFilter from "./DrawerFilter";
import useLeaveStore from "../../store/LeaveStore";
import { useLeave } from "../../context";

export default function index() {
  const { setOpenDialog, dataFilter } = useLeaveStore();
  const { onHandleClearFilter } = useLeave();
  return (
    <>
      <Flex className="filter-container">
        <Flex className="h-full flex flex-row items-center justify-center">
          <Flex bg="#eeeeee" className="w-auto h-full items-center px-2 gap-4 rounded-l-md">
            <ListFilter size={20} color="#6d6d6d" />
            <Text fw={500} c="#6d6d6d" visibleFrom="md">
              FILTERS APPLIED
            </Text>
          </Flex>
          <Group>
            {dataFilter.DocumentNo && (
              <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
                <Text>Doc No:</Text>

                <Pill classNames={{ root: "bg-[#d9d9d9]", label: "text-[#6D6D6D] font-semibold" }} withRemoveButton>
                  {dataFilter.DocumentNo}
                </Pill>
                <Text size="xl" c="#eeeeee">
                  |
                </Text>
              </Flex>
            )}

            {dataFilter.LeaveParameter && (
              <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
                <Text>Leave Type:</Text>

                <Pill classNames={{ root: "bg-[#d9d9d9]", label: "text-[#6D6D6D] font-semibold" }} withRemoveButton>
                  {dataFilter.LeaveParameter}
                </Pill>
                <Text size="xl" c="#eeeeee">
                  |
                </Text>
              </Flex>
            )}

            {dataFilter.DateFrom && dataFilter.DateTo && (
              <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
                <Text>Date Transaction:</Text>

                <Pill classNames={{ root: "bg-[#d9d9d9]", label: "text-[#6D6D6D] font-semibold" }} withRemoveButton>
                  {dataFilter.DateFrom}- {dataFilter.DateTo}
                </Pill>
                <Text size="xl" c="#eeeeee">
                  |
                </Text>
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
            onClick={() => setOpenDialog("DrawerFilter")}>
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
      <DrawerFilter />
    </>
  );
}
