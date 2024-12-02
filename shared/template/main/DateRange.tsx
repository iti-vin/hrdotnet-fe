//--- Mantine Modules
import { Popover, Flex, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
//--- Tabler Icons
import { IconCalendarMonth } from "@tabler/icons-react";
//--- Shared Utils
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";

interface DateRangeProps {
  value: [Date | null, Date | null];
  setValue: (newValue: [Date | null, Date | null]) => void;
  fLabel: string;
  lLabel: string;
  fPlaceholder: string;
  lPlaceholder: string;
  isColumn?: boolean;
  gapValue?: number
  size?: string
}

export const DateRange = ({
  fLabel,
  lLabel,
  fPlaceholder,
  lPlaceholder,
  value,
  setValue,
  isColumn = false,
  gapValue,
  size
}: DateRangeProps) => {
  return (
    <Flex
      direction={`${isColumn ? "column" : "row"}`}
      justify="space-between"
      gap={(gapValue ?? 20)}
      className="w-full"
    >
      <Popover
        position="bottom"
        shadow="md"
        trapFocus={true}
        returnFocus={true}
      >
        <Popover.Target>
          <TextInput
            value={
              value[0] === null
                ? ""
                : DateTimeUtils.dayWithDate(`${value[0]?.toString()}`)
            }
            radius="md"
            size={size ?? 'sm'}
            readOnly
            label={fLabel}
            placeholder={fPlaceholder}
            className="w-full cursor-default"
            rightSection={<IconCalendarMonth />}
            styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
          />
        </Popover.Target>
        <Popover.Dropdown className="w-full">
          <DatePicker
            firstDayOfWeek={0}
            numberOfColumns={2}
            type="range"
            value={value}
            onChange={setValue}
          />
        </Popover.Dropdown>
      </Popover>
      <Popover position="bottom" shadow="md">
        <Popover.Target>
          <TextInput
            value={
              value[1] === null
                ? ""
                : DateTimeUtils.dayWithDate(`${value[1]?.toString()}`)
            }
            radius="md"
            size={size ?? 'sm'}
            readOnly
            label={lLabel}
            placeholder={lPlaceholder}
            rightSection={<IconCalendarMonth />}
            className="w-full"
            styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <DatePicker
            numberOfColumns={2}
            type="range"
            value={value}
            onChange={setValue}
          />
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
};
