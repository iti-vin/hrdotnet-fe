import styles from "./NumberInput.module.css";
import { INumberInput } from "./NumberInput.types";

function NumberInput({
  label,
  name,
  id,
  value,
  autoComplete,
  placeholder,
  errorMessage,
  code,
  disabled = false,
  required = false,
  showError = false,
  onChange,
  ...props
}: INumberInput) {
  const hasError = !disabled && required && showError && value.length === 0;

  const inputClass = `
  ${styles.inputField} 
  ${hasError ? styles.inputError : styles.inputValid}
    ${disabled ? styles.disabledField : styles.enableField}`;

  return (
    <div className={styles.groupField}>
      <label htmlFor={name} className={styles.label}>
        {label} {!disabled && required && <span className={styles.span}>*</span>}
      </label>
      <input
        v2-id={`number-input-${code}`}
        type="number"
        name={name}
        id={id}
        disabled={disabled}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={inputClass}
        value={value}
        onChange={onChange}
        {...props}
      />
      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}

export default NumberInput;
