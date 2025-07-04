import styles from "./EmailInput.module.css";
import { IEmailInput } from "./EmailInput.types";
import { Mail } from "lucide-react";

function EmailInput({
  label,
  name,
  id,
  value,
  autoComplete,
  placeholder,
  code,
  disabled = false,
  required = false,
  showError = false,
  errorMessage = "",
  onChange,
  ...props
}: IEmailInput) {
  const hasError = !disabled && required && showError && value.length === 0;

  const inputClass = `${styles.inputField} ${hasError ? styles.inputFieldError : ""}`;

  return (
    <div className={styles.groupField}>
      <label htmlFor={name} className={styles.label}>
        {label} {!disabled && required && <span className={styles.span}>*</span>}
      </label>
      <div className={styles.inputContainer}>
        <input
          v2-id={`email-input-${code}`}
          type="email"
          name={name}
          id={id}
          disabled={disabled}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={inputClass}
          onChange={onChange}
          {...props}
        />
        <div className={styles.inputButton}>
          <Mail className={styles.inputIcon} />
        </div>
      </div>
      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}

export default EmailInput;
