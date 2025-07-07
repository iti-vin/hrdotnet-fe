import { Autocomplete } from "@mantine/core";
import styles from "./AutoComplete.module.css";
import { IAutoComplete } from "./AutoComplete.types";

export default function CustomAutoComplete({
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
}: IAutoComplete) {
  const hasError = !disabled && required && showError && value.length === 0;

  const inputClass = `${styles.selectField} ${hasError ? styles.inputError : styles.inputValid}`;
  return (
    <>
      <Autocomplete
        id={id}
        data-id={`auto-complete-${code ?? "default"}`}
        label={label}
        placeholder={placeholder}
        data={data}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={inputClass}
        classNames={{
          input: styles.inputField,
          label: styles.label,
        }}
      />
      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </>
  );
}
