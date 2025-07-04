import styles from "../MultiSelect.module.css";
import downCaret from "../assets/images/CaretDown.svg";

export function CaretDownIcon() {
  return (
    <div className={styles.iconContainer}>
      <img src={downCaret} alt="Dropdown Icon" className={styles.icon} />
    </div>
  );
}
