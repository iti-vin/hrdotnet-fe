import { MultiSelect } from "@mantine/core";
import CaretDownIcon from "./assets/images/CaretDown.svg";
import styles from "./MultiSelect.module.css";
import { IMultiSelect } from "./MultiSelect.type";

export default function CustomMultiSelect({
  value,
  label,
  disabled = false,
  id,
  placeholder,
  data,
  required = false,
  showError = false,
  errorMessage = "",
  onChange,
  code,
}: IMultiSelect) {
  const icon = <img src={CaretDownIcon} alt="" />;
  const hasError = !disabled && required && showError && value.length === 0;

  const inputClass = `${styles.selectField} ${hasError ? styles.inputError : styles.inputValid}`;

  return (
    <>
      <MultiSelect
        id={id}
        data-id={`multi-select-${code ?? "default"}`}
        label={label}
        placeholder={placeholder}
        data={data}
        value={value}
        onChange={onChange}
        disabled={disabled}
        searchable
        nothingFoundMessage="Nothing found..."
        rightSectionPointerEvents="none"
        rightSection={icon}
        className={inputClass}
        classNames={{
          input: styles.inputField,
          label: styles.label,
          pill: styles.valueCapsule,
        }}
      />
      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </>
  );
}
