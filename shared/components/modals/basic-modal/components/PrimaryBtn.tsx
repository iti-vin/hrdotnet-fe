import { ButtonHTMLAttributes } from "react";
import styles from "../modal.module.css";

export function PrimaryBtn(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`${styles.primaryBtn} ${props.className ?? ""}`}>
      {props.children}
    </button>
  );
}
