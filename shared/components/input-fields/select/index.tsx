import { IconCaretDownFilled, IconCaretUpFilled } from "@tabler/icons-react";
import styles from "./Select.module.css";
import { ISelect } from "./Select.type";
import { Select } from "@mantine/core";
import { useState } from "react";

export function CustomSelect({ code, ...props }: ISelect) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select
      v2-id={`select-field-${code}`}
      rightSection={isOpen ? <IconCaretUpFilled size={16} /> : <IconCaretDownFilled size={16} />}
      onDropdownOpen={() => setIsOpen(true)}
      onDropdownClose={() => setIsOpen(false)}
      classNames={{
        label: styles.label,
        input: styles.input,
      }}
      {...props}
    />
  );
}
