import { cn } from "@/lib/utils";
import { TimePicker, TimePickerProps } from "@mantine/dates";
import { useClickOutside, useHotkeys } from "@mantine/hooks";
import { IconClock12, IconClock24 } from "@tabler/icons-react";
import { useState } from "react";

interface TimePickerInputProps extends TimePickerProps {
  label?: string;
  withSeconds?: boolean;
  withDropdown?: boolean;
  format?: "12h" | "24h";
  required?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  setValue?(date: string | null): void;
  code?: string;
  labelClassName?: string;
  disabled?: boolean;
}

const labelSizes: Record<string, string> = {
  xs: "text-[0.78rem]",
  sm: "text-[0.84rem]",
  md: "text-[0.94rem]",
  lg: "text-[1rem]",
  xl: "text-[1.05rem]",
};

const iconSize: Record<string, number> = { xs: 20, sm: 22, md: 24, lg: 27, xl: 30 };

export default function TimePickerInput({
  label = "Add Label",
  withSeconds = false,
  withDropdown = false,
  format = "12h",
  size = "md",
  radius = "md",
  required,
  value,
  setValue,
  code,
  labelClassName,
  disabled,
}: TimePickerInputProps) {
  const [open, setOpen] = useState<boolean>(false);

  const timePickerRef = useClickOutside(() => setOpen(false), ["click", "touchstart"]);

  useHotkeys([["tab", () => setOpen(false)]]);

  const labelBaseClass = "font-medium text-[#6d6d6d] flex flex-row gap-1";

  const commonProps = () => ({
    className: "cursor-pointer hover:scale-105",
    onClick: () => !disabled && setOpen(!open),
    size: iconSize[size],
  });

  return (
    <div ref={timePickerRef} className="w-full">
      <TimePicker
        disabled={disabled}
        v2-id={`time-picker-input-${code}`}
        label={
          <div className={cn(labelBaseClass, labelSizes[size], labelClassName)}>
            {label} {required && <p className="text-red-500">*</p>}
          </div>
        }
        withSeconds={withSeconds}
        withDropdown={withDropdown}
        format={format}
        size={size}
        radius={radius}
        required={required}
        withAsterisk={false}
        popoverProps={{
          opened: open,
          onClose: () => setOpen(false),
          closeOnEscape: true,
          withinPortal: false,
        }}
        value={value!}
        defaultValue={value!}
        onChange={(date) => {
          setValue?.(date);
          setOpen(false);
        }}
        className="w-full"
        onFocusCapture={() => setOpen(true)}
        classNames={{ input: "poppins", field: "text-[#6d6d6d]" }}
        styles={{ label: { color: "#6d6d6d", fontSize: 15 }, field: { color: "#6d6d6d" } }}
        rightSection={format === "12h" ? <IconClock12 {...commonProps()} /> : <IconClock24 {...commonProps()} />}
      />
    </div>
  );
}
