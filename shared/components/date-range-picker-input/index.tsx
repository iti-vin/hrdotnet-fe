import dayjs from "dayjs";
import { Flex, MantineSize, Popover, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendarMonth } from "@tabler/icons-react";
import { useState } from "react";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils"; // updated
import { cn } from "@/lib/utils";

interface DateRangeProps {
  fp?: string;
  sp?: string;
  fl?: string;
  sl?: string;
  dateValue: [string | null, string | null];
  setDateValue(value: [string | null, string | null]): void;
  direction?: "row" | "column";
  required?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
  code?: string;
  gap?: number;
  labelClassName?: string;
  className?: string;
}

const labelSizes: Record<string, string> = {
  xs: "text-[0.78rem]",
  sm: "text-[0.84rem]",
  md: "text-[0.94rem]",
  lg: "text-[1rem]",
  xl: "text-[1.05rem]",
};

const iconSize: Record<string, number> = { xs: 20, sm: 22, md: 24, lg: 27, xl: 30 };

const calendarSize: Record<string, MantineSize> = { xs: "xs", sm: "xs", md: "xs", lg: "sm", xl: "md" };

export default function DateRangePickerInput({
  fp,
  sp,
  fl,
  sl,
  dateValue,
  setDateValue,
  direction = "row",
  required = false,
  radius = "md",
  size = "md",
  code,
  gap = 4,
  className,
  labelClassName,
}: DateRangeProps) {
  // Date Range States
  const [inputs, setInputs] = useState<[string, string]>([
    dateValue[0] ? DateTimeUtils.dayWithDate(dateValue[0]) : "",
    dateValue[1] ? DateTimeUtils.dayWithDate(dateValue[1]) : "",
  ]);

  const labelBaseClass = "font-medium text-[#6d6d6d] flex flex-row gap-1";

  // Popover Handles
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  const handleBlur = (i: 0 | 1) => {
    const raw = inputs[i];
    const iso = DateTimeUtils.parseToISO(raw);
    if (!iso) return; // invalid, leave text as-is
    // 1) push ISO up:
    const next: [string | null, string | null] = [...dateValue];
    next[i] = iso;
    setDateValue(next);
    // 2) re-format display:
    setInputs((p) => {
      const c = [...p] as [string, string];
      c[i] = DateTimeUtils.dayWithDate(iso);
      return c;
    });
  };

  // Calendar Changes Via Input
  const onCalChange = ([start, end]: [string | null, string | null]) => {
    const iso: [string | null, string | null] = [start ? dayjs(start).format("YYYY-MM-DD") : null, end ? dayjs(end).format("YYYY-MM-DD") : null];
    setDateValue(iso);
    setInputs([iso[0] ? DateTimeUtils.dayWithDate(iso[0]) : "", iso[1] ? DateTimeUtils.dayWithDate(iso[1]) : ""]);
    if (iso[0] && iso[1] != null) {
      setFirstOpen(false);
      setSecondOpen(false);
    }
  };

  // Input Props
  const common = (i: 0 | 1) => ({
    value: inputs[i],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setInputs((p) => {
        const c = [...p] as [string, string];
        c[i] = e.target.value;
        return c;
      }),
    onBlur: () => handleBlur(i),
    required: required,
    withAsterisk: false,
    label: (
      <div className={cn(labelBaseClass, labelSizes[size], labelClassName)}>
        {i === 0 ? fl : sl} {required && <p className="text-red-500">*</p>}
      </div>
    ),
    placeholder: i === 0 ? fp || "e.g. June 3, 2025 or 2025-04-05" : sp || "e.g. June 3, 2025 or 2025-04-05",
    radius: radius,
    size: size,
    classNames: { input: "poppins" },
    styles: { label: { color: "#6d6d6d", fontSize: 15 } },
    rightSection: (
      <IconCalendarMonth size={iconSize[size]} onClick={() => (i === 0 ? setFirstOpen((o) => !o) : setSecondOpen((o) => !o))} className="cursor-pointer hover:scale-105" />
    ),
  });

  // Date Picker Value checking
  const pickerValue: [Date | null, Date | null] =
    inputs[0] === "" && inputs[1] === "" ? [null, null] : [inputs[0] ? dayjs(dateValue[0]).toDate() : null, inputs[1] ? dayjs(dateValue[1]).toDate() : null];

  return (
    <Flex direction={direction} justify="space-between" align="flex-end" className={cn(className, `w-full gap-${gap}`)}>
      <Popover opened={firstOpen} onChange={setFirstOpen} position="bottom" shadow="md" trapFocus returnFocus>
        <Popover.Target>
          <TextInput {...common(0)} className="w-full" v2-id={`date-range-picker-input-first-${code}`} />
        </Popover.Target>
        <Popover.Dropdown className="w-full">
          <DatePicker numberOfColumns={2} type="range" defaultDate={dateValue[0]!} value={pickerValue} onChange={onCalChange} size={calendarSize[size]} dir="column" />
        </Popover.Dropdown>
      </Popover>

      <Popover opened={secondOpen} onChange={setSecondOpen} position="bottom" shadow="md">
        <Popover.Target>
          <TextInput {...common(1)} className="w-full" v2-id={`date-range-picker-input-second-${code}`} />
        </Popover.Target>
        <Popover.Dropdown className="w-full">
          <DatePicker numberOfColumns={2} type="range" defaultDate={dateValue[1]!} value={pickerValue} onChange={onCalChange} size={calendarSize[size]} className="z-[9999]" />
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
}
