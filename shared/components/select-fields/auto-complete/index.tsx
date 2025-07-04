import { useEffect, useRef, useState } from "react";
import style from "./AutoComplete.module.css";
import { IAutoComplete, Option } from "./AutoComplete.types";
import { X } from "lucide-react";

export function AutoComplete({
  label,
  name,
  id,
  disabled = false,
  value,
  placeholder,
  required = false,
  showError = false,
  errorMessage,
  onChange,
  options,
  code,
}: IAutoComplete) {
  const hasError = !disabled && required && showError && value.length === 0;

  const inputClass = `
  ${style.inputField} 
  ${hasError ? style.inputError : style.inputValid}
    ${disabled ? style.disabledField : style.enableField}`;

  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const filtered = options.filter((opt) => opt.label.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  const handleSelect = (option: Option) => {
    setInputValue(option.label);
    setShowDropdown(false);
    onChange({ target: { name, value: option.value } } as any);
  };

  return (
    <div className={style.groupField} ref={containerRef}>
      <label htmlFor={id} className={style.label}>
        {label}
        {!disabled && required && <span className={style.span}>*</span>}
      </label>
      <div className={style.inputContainer}>
        <input
          v2-id={`auto-complete-${code}`}
          type="text"
          name={name}
          id={id}
          placeholder={placeholder}
          value={inputValue}
          disabled={disabled}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className={inputClass}
          autoComplete="off"
        />

        {inputValue && (
          <button
            type="button"
            onClick={() => {
              setInputValue("");
              setShowDropdown(false);
              onChange({ target: { name, value: "" } } as any);
            }}
            className={style.clearBtn}>
            <X />
          </button>
        )}

        {showDropdown && filteredOptions.length > 0 && (
          <ul className={style.dropdownContainer}>
            {filteredOptions.map((opt) => (
              <li key={opt.value} onClick={() => handleSelect(opt)} className={style.dropdownList}>
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasError && <p className={style.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
