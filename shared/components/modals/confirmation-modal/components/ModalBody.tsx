import styles from "../assets/style/modal.module.css";
import QuestionMark from "../assets/images/questionMark.svg";
import { ReactNode } from "react";

interface IModalBody {
  children: ReactNode;
}
export function ModalBody({ children }: IModalBody) {
  return (
    <div className={styles.bodyContainer}>
      <img src={QuestionMark} alt="Question Mark Icon" className={styles.icon} />
      <div className={styles.body}>{children}</div>
    </div>
  );
}
