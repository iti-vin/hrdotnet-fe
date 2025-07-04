import styles from "./Select.module.css";
import { CaretDownIcon } from "./components/CaretDownIcon";
import { ISelect } from "./Select.type";

export function Select({
  id,
  name,
  label,
  value,
  code,
  errorMessage,
  options,
  required = false,
  showError = false,
  disabled = false,
  onChange,
  ...props
}: ISelect) {
  const hasError = !disabled && required && showError && value.length === 0;

  const inputClass = `
  ${styles.selectField} 
  ${hasError ? styles.inputError : styles.inputValid}
    ${disabled ? styles.disabledField : styles.enableField}`;

  return (
    <div className={styles.groupField}>
      <label htmlFor={id} className={styles.label}>
        {label} {!disabled && required && <span className={styles.span}>*</span>}
      </label>
      <div className={styles.selectContainer}>
        <select
          v2-id={`select-field ${code}`}
          disabled={disabled}
          id={id}
          name={name}
          className={`${inputClass} `}
          value={value}
          onChange={onChange}
          {...props}>
          <option value="" disabled>
            Select an option
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <CaretDownIcon />
      </div>
      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
