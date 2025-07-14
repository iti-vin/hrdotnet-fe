import styles from "./MultiSelect.module.css";
import { IconCaretDownFilled, IconCaretUpFilled } from "@tabler/icons-react";
import { useState } from "react";
import { IMultiSelect } from "./MultiSelect.type";
import { MultiSelect } from "@mantine/core";

export default function CustomMultiSelect({ code, ...props }: IMultiSelect) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MultiSelect
        v2-id={`multi-select-${code}`}
        searchable
        nothingFoundMessage="Nothing found..."
        rightSectionPointerEvents="none"
        rightSection={isOpen ? <IconCaretUpFilled size={16} /> : <IconCaretDownFilled size={16} />}
        onDropdownOpen={() => setIsOpen(true)}
        onDropdownClose={() => setIsOpen(false)}
        classNames={{
          input: styles.input,
          label: styles.label,
          pill: styles.pill,
        }}
        {...props}
      />
    </>
  );
}
