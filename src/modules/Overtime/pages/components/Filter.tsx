import {
  Button,
  Divider,
  Flex,
  Group,
  MultiSelect,
  Text,
  TextInput,
} from "@mantine/core";
import { IconDots, IconSearch } from "@tabler/icons-react";
import { Modal, DateRange } from "@shared/template/index";
import { useDateRangeStore } from "@shared/hooks/useDateRange";

interface ModalFilter {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}
export default function Filter({ opened, onClose, buttonClose }: ModalFilter) {
  const { value, setValue } = useDateRangeStore();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      buttonClose={buttonClose}
      title="Filter By"
    >
      <Group px={20} className="w-full">
        <TextInput
          size="sm"
          radius={8}
          label="Document Number"
          placeholder="Document Number"
          withAsterisk
          className="w-full"
          rightSection={<IconSearch />}
        />
        <Divider size={0.5} color="#edeeed" className="w-full" />
        <MultiSelect
          size="sm"
          label="Overtime Date"
          withAsterisk
          placeholder="Select Overtime Date"
          radius={8}
          data={["Vacation Leave", "Sick Leave", "Emergency Leave"]}
          rightSection={<IconDots />}
          className="border-none w-full"
        />
        <Divider size={0.5} color="#edeeed" className="w-full" />
        <DateRange
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
        <Flex className="w-full" justify="flex-end" gap={20}>
          <Button
            variant="outline"
            size="md"
            radius={10}
            w={127}
            children={<Text fw={500}>Clear</Text>}
          />
          <Button
            variant="transparent"
            className="br-gradient"
            size="md"
            radius={10}
            w={127}
            children={
              <Text fw={500} c="white">
                Filter
              </Text>
            }
          />
        </Flex>
      </Group>
    </Modal>
  );
}
