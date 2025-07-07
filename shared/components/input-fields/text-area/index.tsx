import style from "./TextArea.module.css";
import { ITextArea } from "./TextArea.types";

function TextArea({
  label,
  name,
  id,
  value,
  autoComplete,
  rows,
  placeholder,
  errorMessage,
  code,
  disabled = false,
  required = false,
  showError = false,
  onChange,
  ...props
}: ITextArea) {
  const hasError = !disabled && required && showError && value.length === 0;

  const inputClass = `
  ${style.textArea} 
  ${hasError ? style.inputError : style.inputValid}
    ${disabled ? style.disabledField : style.enableField}`;

  return (
    <div className={style.groupField}>
      <label htmlFor={name} className={style.label}>
        {label} {!disabled && required && <span className={style.span}>*</span>}
      </label>
      <textarea
        v2-id={``}
        name={name}
        id={id}
        disabled={disabled}
        rows={rows}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        className={inputClass}
        {...props}></textarea>
      {hasError && <p className={style.errorMessage}>{errorMessage}</p>}
    </div>
  );
}

export default TextArea;
