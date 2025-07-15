import { Flex, Popover, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { IconCalendarMonth } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type DateTypes = string | Date | null;
interface DateRangeInterface {
  fp: string;
  sp: string;
  fl: string;
  sl: string;
  dateProps: [DateTypes, DateTypes];
  setDateProps(value: [DateTypes, DateTypes]): void;
  direction?: "row" | "column";
}

const RndrDateRange = ({ fp, sp, fl, sl, dateProps, setDateProps, direction = "column" }: DateRangeInterface) => {
  const [open1, setOpen1] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);

  const [date1, setDate1] = useState<Date | null>(new Date());
  const [date2, setDate2] = useState<Date | null>(new Date());
  const [dateInput1, setDateInput1] = useState<string>("2025-06-17"); // track raw input

  const handleChangeItems = (value: [DateTypes, DateTypes]) => {
    setDateProps([value[0], value[1]]);
    setDateInput1(value[0]!.toString());
  };

  const parseDate = (value: string): Date | null => {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  useEffect(() => {
    setDateProps([date1, date2]);
  }, [date1, date2]);

  return (
    <Flex direction={{ base: direction, md: direction }} justify="space-between" className="w-full" gap={{ base: 5, md: 10 }}>
      <Popover position="bottom" shadow="md" opened={open1} onChange={setOpen1}>
        <Popover.Target>
          <TextInput
            defaultValue={date1 === null ? "" : DateTimeUtils.dayWithDate(`${date1?.toString()}`)}
            value={dateProps[0] === null ? "" : DateTimeUtils.dayWithDate(`${dateProps[0].toString()}`)}
            radius="md"
            size="md"
            label={fl}
            placeholder={fp}
            className="w-full cursor-pointer"
            rightSection={<IconCalendarMonth onClick={() => setOpen1((o) => !o)} />}
            styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            onClick={() => setOpen1((o) => !o)}
            onChange={(e) => {
              const input = e.target.value;
              setDateInput1(input);

              const parsed = parseDate(input);
              if (parsed) {
                setDate1(parsed);
              }
            }}
          />
        </Popover.Target>
        <Popover.Dropdown className="w-full">
          <DatePicker firstDayOfWeek={0} numberOfColumns={2} type="range" value={dateProps} onChange={handleChangeItems} />
        </Popover.Dropdown>
      </Popover>
      <Popover position="bottom" shadow="md" opened={open2} onChange={setOpen2}>
        <Popover.Target>
          <TextInput
            defaultValue={DateTimeUtils.dayWithDate(dateInput1)}
            radius="md"
            size="md"
            label={sl}
            placeholder={sp}
            rightSection={<IconCalendarMonth onClick={() => setOpen2((o) => !o)} className="cursor-pointer" />}
            className="w-full"
            styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            onClick={() => setOpen2((o) => !o)}
            onChange={(e) => {
              const parsed = parseDate(e.target.value);
              setDate2(parsed);
            }}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <DatePicker numberOfColumns={2} type="range" value={dateProps} onChange={handleChangeItems} dir="column" />
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
};

export default RndrDateRange;
