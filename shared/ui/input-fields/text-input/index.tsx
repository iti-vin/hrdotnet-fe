import inputStyle from "./TextInput.module.css";
import { IInputField } from "./TextInput.types";

function TextInput({
  label,
  type,
  name,
  id,
  value,
  autoComplete,
  placeholder,
  disabled = false,
  required = false,
  errorMessage,
  showError = false,
  onChange,
  ...props
}: IInputField) {
  const hasError = !disabled && required && showError && value.length === 0;

  const inputClass = `
  ${inputStyle.inputField} 
  ${hasError ? inputStyle.inputError : inputStyle.inputValid}   
  ${disabled ? inputStyle.disabledField : inputStyle.enableField}`;

  return (
    <div className={inputStyle.groupField}>
      <label htmlFor={name} className={inputStyle.label}>
        {label} {required && <span className={inputStyle.span}>*</span>}
      </label>
      <input
        type={type}
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
      {hasError && <p className={inputStyle.errorMessage}>{errorMessage}</p>}
    </div>
  );
}

export default TextInput;
