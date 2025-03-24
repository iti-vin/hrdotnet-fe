import { Flex, Popover, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { IconCalendarMonth } from "@tabler/icons-react";

interface DateRangeProps {
  fp?: string;
  sp?: string;
  fl?: string;
  sl?: string;
  dateProps: [Date | null, Date | null];
  setDateProps(value: [Date | null, Date | null]): void;
  direction?: "row" | "column";
}
export default function RndrDateRange({ fp, sp, fl, sl, dateProps, setDateProps, direction }: DateRangeProps) {
  return (
    <Flex direction={direction} justify="space-between" align="end" className="w-full gap-4">
      <Popover position="bottom" shadow="md" trapFocus={true} returnFocus={true}>
        <Popover.Target>
          <TextInput
            value={dateProps[0] === null ? "" : DateTimeUtils.dayWithDate(`${dateProps[0]?.toString()}`)}
            radius="md"
            size="md"
            readOnly
            label={fl}
            required
            placeholder={fp}
            className="w-full cursor-default"
            rightSection={<IconCalendarMonth />}
            styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
          />
        </Popover.Target>
        <Popover.Dropdown className="w-full">
          <DatePicker firstDayOfWeek={0} numberOfColumns={2} type="range" value={dateProps} onChange={setDateProps} />
        </Popover.Dropdown>
      </Popover>
      <Popover position="bottom" shadow="md">
        <Popover.Target>
          <TextInput
            value={dateProps[1] === null ? "" : DateTimeUtils.dayWithDate(`${dateProps[1]?.toString()}`)}
            radius="md"
            size="md"
            readOnly
            label={sl}
            placeholder={sp}
            rightSection={<IconCalendarMonth />}
            className="w-full"
            styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <DatePicker numberOfColumns={2} type="range" value={dateProps} onChange={setDateProps} />
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
}
