import { ActionIcon, Button, Flex, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import { IconCalendarFilled, IconCirclePlus, IconTrash, IconX } from "@tabler/icons-react";

import { useDrawerStore } from "../CustomDrawer/store/useDrawerStore";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { DrawerFactory } from "../CustomDrawer/components/DrawerFactory";
import { useFilterStore } from "../../store/useFilterStore";
import { ListFilter } from "lucide-react";

export const Filters = () => {
  const CalendarIcon = <IconCalendarFilled size={18} stroke={1.5} />;
  const openDrawer = useDrawerStore((state) => state.openDrawer);
  const { filters, removeFilter, clearFilters } = useFilterStore();

  const handleOpenDrawer = () => {
    openDrawer({
      width: "sm",
      title: "New Request",
      content: (
        <Stack>
          <TextInput
            label="Document No."
            placeholder="Type Document No."
            onChange={(e) => useFilterStore.getState().setFilter("documentNo", e.currentTarget.value)}
          />
          <Text>COS Range</Text>
          <DateInput
            label="From"
            placeholder="mm/dd/yyyy"
            rightSection={CalendarIcon}
            clearable
            onChange={(d) => useFilterStore.getState().setFilter("cosFrom", dayjs(d).format("YYYY-MM-DD"))}
          />
          <DateInput
            label="To"
            placeholder="mm/dd/yyyy"
            rightSection={CalendarIcon}
            clearable
            onChange={(d) => useFilterStore.getState().setFilter("cosTo", dayjs(d).format("YYYY-MM-DD"))}
          />
          <Select
            label="Request Schedule"
            placeholder="Select Schedule"
            data={["Same Day", "Rest Day", "Regular"]}
            onChange={(v) => v && useFilterStore.getState().setFilter("schedule", v)}
          />
          <Text>Transaction Date</Text>
          <DateInput
            label="From"
            placeholder="mm/dd/yyyy"
            rightSection={CalendarIcon}
            clearable
            onChange={(d) => useFilterStore.getState().setFilter("txnFrom", dayjs(d).format("YYYY-MM-DD"))}
          />
          <DateInput
            label="To"
            placeholder="mm/dd/yyyy"
            rightSection={CalendarIcon}
            clearable
            onChange={(d) => useFilterStore.getState().setFilter("txnTo", dayjs(d).format("YYYY-MM-DD"))}
          />
          <TextInput
            label="Processed By"
            placeholder="Type Processed By"
            onChange={(e) => useFilterStore.getState().setFilter("processedBy", e.currentTarget.value)}
          />
        </Stack>
      ),
      footer: (
        <Group>
          <Button
            variant="default"
            onClick={clearFilters}
            className="text-xs font-medium text-[#559CDA] border border-[#559CDA] rounded-[7px] h-[28px] w-[90px] uppercase">
            Reset
          </Button>
          <Button
            variant="default"
            className="text-white  rounded-[7px] h-[28px] w-[90px] uppercase"
            style={{
              background: "linear-gradient(90deg, #559CDA 0%, #7BADFF 24%, #FFB58D 73%, #ED8028 100%)",
              borderRadius: "10px",
              color: "white",
            }}>
            Filter
          </Button>
        </Group>
      ),
    });
  };

  return (
    <>
      <Group justify="space-between" className="border border-[#a8a8a8] rounded-md pr-2">
        <Group className="">
          <Flex className="bg-[#eeeeee] gap-2 py-3 px-2 rounded-l-md">
            <ListFilter size={20} className="text-[#6d6d6d]" />
            <Text className="font-medium text-base uppercase text-[#6d6d6d]"> Filters Applied</Text>
          </Flex>

          <Group ml="md" gap="xs" wrap="wrap">
            {Object.entries(filters).map(([key, val]) => (
              <Group key={key} className=" px-2 py-1 text-sm">
                <Text className="text-[#6D6D6D] font-semibold text-sm">{key}:</Text>
                <Flex
                  justify="center"
                  align="center"
                  className="bg-[#D9D9D9] text-[#6D6D6D] pl-[13px] pr-[7px] py-1 rounded-full text-sm">
                  <Text className="text-xs"> {val}</Text>
                  <ActionIcon variant="transparent" size="xs" onClick={() => removeFilter(key as keyof typeof filters)}>
                    <IconX size={12} color="#A8A8A8" />
                  </ActionIcon>
                </Flex>
              </Group>
            ))}
          </Group>
        </Group>
        <Group>
          <ActionIcon onClick={handleOpenDrawer} variant="transparent" size="md">
            <IconCirclePlus stroke={1.5} color="#6d6d6d" />
          </ActionIcon>
          <ActionIcon onClick={clearFilters} variant="transparent" size="md">
            <IconTrash stroke={1.5} color="#6d6d6d" />
          </ActionIcon>
        </Group>
      </Group>
      <DrawerFactory />
    </>
  );
};
