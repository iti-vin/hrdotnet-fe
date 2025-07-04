import dayjs from "dayjs";
import { DatePicker, TimePicker } from "@mantine/dates";
import { ActionIcon, Flex, MantineSize, Popover, TextInput } from "@mantine/core";
import { IconCalendarTime, IconCheck } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import { cn } from "@/lib/utils";

interface DateTimePickerInputProps {
  value: string | null;
  setValue(iso: string | null): void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
  labelClassName?: string;
}

export default function DateTimePickerInput({
  value,
  setValue,
  label = "",
  placeholder = "e.g. June 3, 2025 01:30:30 24h format",
  required = false,
  size = "md",
  radius = "md",
  labelClassName,
}: DateTimePickerInputProps) {
  const [input, setInput] = useState(value ? dayjs(value).format("MMMM D, YYYY hh:mm:ss") : "");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const wrapperRef = useRef(null);

  useClickOutside(() => setCalendarOpen(false));

  const handleManualBlur = () => {
    const parsed = dayjs(input, "MMMM D, YYYY hh:mm:ss");

    if (!parsed.isValid()) return;

    const newDate = parsed.format("YYYY-MM-DD");
    const newTime = parsed.format("hh:mm:ss");

    setSelectedDate(newDate);
    setSelectedTime(newTime);
    setValue(`${newDate} ${newTime}`);
  };

  const handleSubmit = () => {
    const datePart = dayjs(selectedDate, "YYYY-MM-DD").format("MMMM DD, YYYY");
    const timePart = selectedTime;
    setValue(datePart + " " + timePart);
    setInput(datePart + " " + timePart);
  };

  const labelBaseClass = "font-medium text-[#6d6d6d] flex flex-row gap-1";

  const labelSizes: Record<string, string> = {
    xs: "text-[0.78rem]",
    sm: "text-[0.84rem]",
    md: "text-[0.94rem]",
    lg: "text-[1rem]",
    xl: "text-[1.05rem]",
  };

  const iconSize: Record<string, number> = { xs: 20, sm: 22, md: 24, lg: 27, xl: 30 };

  const calendarSize: Record<string, MantineSize> = { xs: "xs", sm: "xs", md: "xs", lg: "sm", xl: "md" };

  return (
    <Flex align="flex-end" className="w-full" ref={wrapperRef}>
      <Popover opened={calendarOpen} onChange={setCalendarOpen} position="bottom" shadow="md" trapFocus returnFocus>
        <Popover.Target>
          <TextInput
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onBlur={handleManualBlur}
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
            rightSection={<IconCalendarTime size={iconSize[size]} onClick={() => setCalendarOpen((o) => !o)} className="cursor-pointer hover:scale-105" />}
            classNames={{ input: "poppins" }}
            styles={{ label: { color: "#6d6d6d", fontSize: 15 } }}
          />
        </Popover.Target>
        <Popover.Dropdown className="w-full space-y-2">
          <DatePicker
            defaultDate={selectedDate!}
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
            }}
            size={calendarSize[size]}
          />
          <Flex direction="row" justify="space-between" align="center" gap={5}>
            <TimePicker
              format="24h"
              className="w-full"
              withSeconds
              value={selectedTime!}
              onChange={(time) => {
                setSelectedTime(time);
              }}
            />
            <ActionIcon variant="outline" color="#6d6d6d6" size="lg" onClick={handleSubmit}>
              <IconCheck />
            </ActionIcon>
          </Flex>
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
}
