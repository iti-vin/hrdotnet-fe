import { ButtonHTMLAttributes } from "react";
import styles from "../modal.module.css";

export function SecondaryBtn(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`${styles.secondaryBtn} ${props.className ?? ""}`}>
      {props.children}
    </button>
  );
}
