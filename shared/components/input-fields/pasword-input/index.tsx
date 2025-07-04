import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./PasswordInput.module.css";
import { IPasswordInput } from "./PasswordInput.types";

function PasswordInput({
  label,
  name,
  id,
  value,
  autoComplete,
  placeholder,
  code,
  errorMessage = "",
  disabled = false,
  required = false,
  showError = false,
  onChange,
  ...props
}: IPasswordInput) {
  const [showPassword, setShowPassword] = useState(false);

  const hasError = !disabled && required && showError && value.length === 0;

  const inputClass = `
  ${styles.inputField} 
  ${hasError ? styles.inputFieldError : ""}
    ${disabled ? styles.disabledField : styles.enableField}`;

  return (
    <div className={styles.groupField}>
      <label htmlFor={name} className={styles.label}>
        {label} {!disabled && required && <span className={styles.span}>*</span>}
      </label>
      <div className={styles.inputContainer}>
        <input
          v2-id={`password-input-${code}`}
          type={showPassword ? "text" : "password"}
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
        <button type="button" onClick={() => setShowPassword((prev) => !prev)} className={styles.inputButton}>
          {showPassword ? <EyeOff className={styles.inputIcon} /> : <Eye className={styles.inputIcon} />}
        </button>
      </div>
      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}

export default PasswordInput;
