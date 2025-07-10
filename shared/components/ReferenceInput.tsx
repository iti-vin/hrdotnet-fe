import { useEffect, useState } from "react";
import { TextInput, TextInputProps } from "@mantine/core";

function formatValue(value: string) {
  return (
    value
      .replace(/\D/g, "")
      .slice(0, 12)
      .match(/.{1,4}/g)
      ?.join("-") ?? ""
  );
}

export interface INumberInput extends TextInputProps {
  code: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export default function ReferenceNoInput({ code, value, onValueChange, ...props }: INumberInput) {
  const [formattedValue, setFormattedValue] = useState("");

  useEffect(() => {
    if (value !== undefined) {
      const formatted = formatValue(value);
      setFormattedValue(formatted);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatValue(raw);
    setFormattedValue(formatted);
    onValueChange?.(formatted.replace(/-/g, ""));
  };

  return <TextInput id={`number-input-${code}`} {...props} value={formattedValue} onChange={handleChange} placeholder="0000-0000-0000" maxLength={14} />;
}
