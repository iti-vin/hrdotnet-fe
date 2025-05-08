import { Flex, Popover, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { IconCalendarMonth } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface DateRangeInterface {
  fp: string;
  sp: string;
  fl: string;
  sl: string;
  dateProps: [Date | null, Date | null];
  setDateProps(value: [Date | null, Date | null]): void;
  direction?: "row" | "column";
}

const RndrDateRange = ({ fp, sp, fl, sl, dateProps, setDateProps, direction = "column" }: DateRangeInterface) => {
  const [open1, setOpen1] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);

  useEffect(() => {
    if (dateProps[0] && dateProps[1] != null) {
      setOpen1(false);
      setOpen2(false);
    }
  }, [dateProps]);

  return (
    <Flex
      direction={{ base: direction, md: direction }}
      justify="space-between"
      className="w-full"
      gap={{ base: 5, md: 10 }}>
      <Popover position="bottom" shadow="md" opened={open1} onChange={setOpen1}>
        <Popover.Target>
          <TextInput
            value={dateProps[0] === null ? "" : DateTimeUtils.dayWithDate(`${dateProps[0]?.toString()}`)}
            radius="md"
            size="md"
            readOnly
            label={fl}
            placeholder={fp}
            className="w-full cursor-pointer"
            rightSection={<IconCalendarMonth onClick={() => setOpen1((o) => !o)} />}
            styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            onClick={() => setOpen1((o) => !o)}
          />
        </Popover.Target>
        <Popover.Dropdown className="w-full">
          <DatePicker firstDayOfWeek={0} numberOfColumns={2} type="range" value={dateProps} onChange={setDateProps} />
        </Popover.Dropdown>
      </Popover>
      <Popover position="bottom" shadow="md" opened={open2} onChange={setOpen2}>
        <Popover.Target>
          <TextInput
            value={dateProps[1] === null ? "" : DateTimeUtils.dayWithDate(`${dateProps[1]?.toString()}`)}
            radius="md"
            size="md"
            readOnly
            label={sl}
            placeholder={sp}
            rightSection={<IconCalendarMonth onClick={() => setOpen2((o) => !o)} className="cursor-pointer" />}
            className="w-full"
            styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            onClick={() => setOpen2((o) => !o)}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <DatePicker numberOfColumns={2} type="range" value={dateProps} onChange={setDateProps} dir="column" />
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
};

export default RndrDateRange;
