import { useRef, useState, useEffect } from "react";
import styles from "./MultiSelect.module.css";
import { CaretDownIcon } from "./components/CaretDownIcon";
import { X } from "lucide-react";

export function MultiSelect({
  id,
  label,
  value,
  disabled = false,
  required = false,
  showError = false,
  errorMessage,
  options,
  onChange,
}: IMultiSelect) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasError = !disabled && required && showError && value.length === 0;

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.groupField} ref={containerRef}>
      <label htmlFor={id} className={styles.label}>
        {label}

        {!disabled && required && <span className={styles.span}>*</span>}
      </label>

      <div
        role="button"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={`
    ${styles.selectField} 
    ${hasError ? styles.inputError : styles.inputValid}
    ${disabled ? styles.disabledField : styles.enableField}
  `}
        onClick={() => {
          if (!disabled) {
            setDropdownOpen((prev) => !prev);
          }
        }}>
        <div className={styles.selectedOptionContainer}>
          {value.length > 0 ? (
            value.map((val) => {
              const opt = options.find((o) => o.value === val);
              return (
                <span key={val} className={styles.selectedOption}>
                  {opt?.label}

                  <button
                    type="button"
                    disabled={disabled}
                    onClick={(e) => {
                      if (disabled) return;
                      e.stopPropagation();
                      removeOption(val);
                    }}>
                    <X className={styles.clearBtn} />
                  </button>
                </span>
              );
            })
          ) : (
            <span>Select an option</span>
          )}
        </div>

        <CaretDownIcon />

        {dropdownOpen && (
          <ul className={styles.ulDropdown}>
            {options.map((opt) => {
              const isSelected = value.includes(opt.value);
              return (
                <li
                  key={opt.value}
                  onClick={(e) => {
                    if (disabled) return;
                    e.stopPropagation();
                    toggleOption(opt.value);
                  }}
                  className={`${styles.liDropdown} ${
                    isSelected ? styles.liSelectedDropdown : styles.liNotSelectedDropdown
                  }`}>
                  <span>{opt.label}</span>
                  {isSelected && <span className={styles.iconSelected}>✔</span>}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
