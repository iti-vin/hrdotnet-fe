import {
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  MultiSelect,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { DateRange } from "@shared/template";
import {
  IconCaretDownFilled,
  IconDots,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { useDateRangeStore } from "@shared/hooks/useDateRange";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  opened: boolean;
  closed: () => void;
}

export default function DrawerFilter({ opened, closed }: Props) {
  const { value, setValue } = useDateRangeStore();
  const isMobile = useMediaQuery("(max-width: 425px)");
  return (
    <Drawer
      opened={opened}
      onClose={closed}
      position="right"
      size={isMobile ? "100%" : "xs"}
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0, blur: 0 }}
    >
      <Stack px={10} className="w-full h-full" style={{ height: "100%" }}>
        <Group className="w-full">
          <Flex className="w-full" direction="column" gap={10}>
            <Flex direction="row" justify="space-between">
              <Text fw={600} fz={22} c="#559CDA">
                Filter By
              </Text>
              <IconX
                className="cursor-pointer"
                onClick={closed}
                size={30}
                color="gray"
              />
            </Flex>
            <Divider size={2} color="#c9cac9" className="w-full" />
          </Flex>
        </Group>
        <Group style={{ flex: 1 }}>
          <TextInput
            size="sm"
            radius={8}
            label="Document Number"
            placeholder="Type Document Number"
            withAsterisk
            className="w-full"
          />
          <Divider size={0.5} color="#edeeed" className="w-full" />
          <MultiSelect
            size="sm"
            label="Overtime Date"
            withAsterisk
            placeholder="Select Overtime Date"
            radius={8}
            data={["Vacation Leave", "Sick Leave", "Emergency Leave"]}
            rightSection={<IconCaretDownFilled />}
            className="border-none w-full"
          />
          <Divider size={0.5} color="#edeeed" className="w-full" />
          <DateRange
            isColumn
            value={value}
            setValue={setValue}
            fLabel="Leave From"
            lLabel="Leave To"
            fPlaceholder="Start Date"
            lPlaceholder="End Date"
          />
          <Divider size={0.5} color="#edeeed" className="w-full" />
          <Group gap={2} className="w-full">
            <Text size="sm" fw={500}>
              Transaction Date
            </Text>
            <DateRange
              isColumn
              value={value}
              setValue={setValue}
              fLabel="From"
              lLabel="To"
              fPlaceholder="Start Date"
              lPlaceholder="End Date"
            />
          </Group>
          <Divider size={0.5} color="#edeeed" className="w-full" />
          <TextInput
            size="sm"
            radius={8}
            label="Processed By"
            placeholder="Name"
            withAsterisk
            className="w-full"
            rightSection={<IconSearch />}
          />
          <Divider size={0.5} color="#edeeed" className="w-full" />
          <MultiSelect
            size="sm"
            label="Status"
            withAsterisk
            placeholder="Select Status"
            radius={8}
            data={["Filed", "Approved", "Cancelled", "Reviewed"]}
            rightSection={<IconDots />}
            className="border-none w-full mb-5"
          />
          <Divider size={0.5} color="#edeeed" className="w-full" />
        </Group>
        <Group className="w-full">
          <Flex className="w-full" justify="flex-end" gap={10}>
            <Button
              variant="outline"
              size="xs"
              radius={10}
              w={100}
              children={<Text fw={500}>Clear</Text>}
            />
            <Button
              variant="transparent"
              className="br-gradient"
              size="xs"
              radius={10}
              w={100}
              children={
                <Text fw={500} c="white">
                  Filter
                </Text>
              }
            />
          </Flex>
        </Group>
      </Stack>
    </Drawer>
  );
}
