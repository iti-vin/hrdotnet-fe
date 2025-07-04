import styles from "../assets/style/modal.module.css";
import QuestionMark from "../assets/images/questionMark.svg";
import Warning from "../assets/images/warning.svg";
import { useModalStore } from "../store/useModalStore";

export function ModalBody() {
  const { body, warning } = useModalStore();
  const modalType = `
  ${styles.bodyContainer}
    ${warning ? styles.warningIcon : styles.primaryIcon}`;
  return (
    <div className={modalType}>
      <img
        src={warning ? Warning : QuestionMark}
        alt={warning ? "Warning Icon" : "Question Icon"}
        className={styles.bodyIcon}
      />
      <h1 className={styles.body}>{body}</h1>
    </div>
  );
}
