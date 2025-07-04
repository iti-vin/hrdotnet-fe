import { DatePicker } from "@mantine/dates";
import { Flex, MantineSize, Popover, TextInput } from "@mantine/core";
import { IconCalendarMonth } from "@tabler/icons-react";

import { Key, ReactNode, useState } from "react";

import dayjs from "dayjs";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { cn } from "@/lib/utils";

interface DateProps {
  value: string | null;
  setValue(iso: string | null): void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
  code?: string;
  error?: ReactNode;
  inputKey?: Key | null | undefined;
  labelClassName?: string;
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

export default function DatePickerInput({
  value,
  setValue,
  label = "",
  placeholder = "e.g. June 3, 2025 or 2025-04-05",
  required = false,
  size = "md",
  radius = "md",
  code,
  error,
  inputKey,
  labelClassName,
}: DateProps) {
  // local text input state (formatted or raw typing)
  const [input, setInput] = useState(value ? DateTimeUtils.dayWithDate(value) : "");
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);

  // on blur, try parse & update parent (ISO) + reformat
  const handleBlur = () => {
    setTouched(true);
    const iso = DateTimeUtils.parseToISO(input);
    if (!iso) return; // leave raw if invalid
    setValue(iso);
    setInput(DateTimeUtils.dayWithDate(iso));
  };

  // when calendar picks a date
  const onCalChange = (date: string | null) => {
    const iso = date ? dayjs(date).format("YYYY-MM-DD") : null;
    setValue(iso);
    setInput(iso ? DateTimeUtils.dayWithDate(iso) : "");
    setOpen(false);
  };

  const isInvalidFormat = input.trim().length >= 9 && !DateTimeUtils.parseToISO(input);
  const labelBaseClass = "font-medium text-[#6d6d6d] flex flex-row gap-1";

  return (
    <Flex align="flex-end" className="w-full">
      <Popover opened={open} onChange={setOpen} position="bottom" shadow="md" trapFocus returnFocus>
        <Popover.Target>
          <TextInput
            value={input}
            vin-id={`date-picker-input-${code}`}
            onChange={(e) => setInput(e.target.value)}
            onBlur={handleBlur}
            key={inputKey}
            label={
              <div className={cn(labelBaseClass, labelSizes[size], labelClassName)}>
                {label} {required && <p className="text-red-500">*</p>}
              </div>
            }
            placeholder={placeholder}
            required={required}
            withAsterisk={false}
            size={size}
            radius={radius}
            className="w-full"
            error={touched && isInvalidFormat ? "Invalid date format" : error}
            classNames={{ input: "poppins" }}
            rightSection={<IconCalendarMonth size={iconSize[size]} onClick={() => setOpen((o) => !o)} className="cursor-pointer hover:scale-105" />}
            styles={{ label: { color: "#6d6d6d", fontSize: 15 } }}
          />
        </Popover.Target>
        <Popover.Dropdown className="w-full">
          <DatePicker value={value ? dayjs(value).toDate() : null} onChange={onCalChange} defaultDate={value!} size={calendarSize[size]} />
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
}
