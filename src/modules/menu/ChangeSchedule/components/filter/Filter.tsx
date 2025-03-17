/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { ActionIcon, Flex, Group, Pill, Text } from "@mantine/core";
//--- Icons Modules
import { ListFilter } from "lucide-react";
import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
//--- Shared Modules
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
//--- Store
import useCOS from "../../store";

interface FilterProps {
  filterOpen(): void;
  clearFilter?(): void;
}

export default function Filter({ filterOpen, clearFilter }: FilterProps) {
  const { status, setStatus, documentNo, dateFiled, dateTransaction, requested } = useCOS();

  const selectedStatus = () => {
    const statusPill = [
      { value: 1, label: "Filed" },
      { value: 2, label: "Approve" },
      { value: 3, label: "Cancelled" },
      { value: 4, label: "Reviewed" },
    ];
    const selected = statusPill.filter((pill) => status.includes(pill.value));
    const handleRemove = (value: number) => setStatus(status.filter((s) => s !== value));
    console.log(handleRemove);
    return (
      <Pill.Group>
        {selected.map((item) => (
          <Pill key={item.value} onRemove={() => {}} withRemoveButton>
            {item.label}
          </Pill>
        ))}
      </Pill.Group>
    );
  };

  return (
    <Flex className="w-full rounded-md border-[1px] border-[#a8a8a8]" flex="row" justify="space-between" align="center">
      <Flex className="h-full flex flex-row items-center justify-center">
        <Flex bg="#eeeeee" className="w-auto h-full items-center px-2 gap-4 rounded-l-md">
          <ListFilter size={20} color="#6d6d6d" />
          <Text fw={500} c="#6d6d6d" visibleFrom="md">
            FILTERS APPLIED
          </Text>
        </Flex>
        <Group>
          {documentNo && (
            <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
              <Text>Doc No:</Text>
              <Pill withRemoveButton>{documentNo}</Pill>
              <Text size="xl" c="#eeeeee">
                |
              </Text>
            </Flex>
          )}
          {dateFiled[0] != null && dateFiled[1] != null ? (
            <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
              <Text>COS Range:</Text>
              <Pill withRemoveButton>
                {DateTimeUtils.getIsoDateWord(String(dateFiled[0]))} - {DateTimeUtils.getIsoDateWord(String(dateFiled[1]))}
              </Pill>
              <Text size="xl" c="#eeeeee">
                |
              </Text>
            </Flex>
          ) : null}

          {dateTransaction[0] != null && dateTransaction[1] != null ? (
            <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
              <Text>Date Transaction:</Text>
              <Pill>
                {DateTimeUtils.getIsoDateWord(String(dateTransaction[0]))} - {DateTimeUtils.getIsoDateWord(String(dateTransaction[1]))}
              </Pill>
              <Text size="xl" c="#eeeeee">
                |
              </Text>
            </Flex>
          ) : null}

          {requested && (
            <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
              <Text>Requested Schedule:</Text>
              <Pill>{requested}</Pill>
              <Text size="xl" c="#eeeeee">
                |
              </Text>
            </Flex>
          )}

          {/*{filterData?.processed && (
            <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
              <Text>Processed By:</Text>
              <Pill.Group>{processedBy}</Pill.Group>
              <Text size="xl" c="#eeeeee">
                |
              </Text>
            </Flex>
          )}*/}

          {status?.length! >= 1 && (
            <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
              <Text>Status:</Text>
              {selectedStatus()}
              <Text size="xl" c="#eeeeee">
                |
              </Text>
            </Flex>
          )}
        </Group>
      </Flex>

      <Flex pr={10} py={8} gap={5}>
        <ActionIcon variant="transparent" color="gray" size="md" aria-label="Settings" onClick={filterOpen}>
          <IconCirclePlus style={{ width: "100%", height: "100%" }} stroke={1.5} color="#6d6d6d" />
        </ActionIcon>
        <ActionIcon variant="transparent" color="gray" size="md" aria-label="Settings">
          <IconTrash style={{ width: "100%", height: "100%" }} stroke={1.5} color="#6d6d6d" onClick={clearFilter} />
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
