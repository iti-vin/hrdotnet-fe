import CaretDown from "../asssets/images/CaretDown.svg";
import selectStyles from "../Select.module.css";

export function CaretDownIcon() {
  return (
    <div className={selectStyles.iconContainer}>
      <img src={CaretDown} alt="Dropdown Icon" className={selectStyles.icon} />
    </div>
  );
}
