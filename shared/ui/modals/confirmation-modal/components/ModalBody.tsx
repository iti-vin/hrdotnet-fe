import styles from "../assets/style/modal.module.css";
import QuestionMark from "../assets/images/questionMark.svg";

interface IModalBody {
  body: string;
}
export function ModalBody({ body }: IModalBody) {
  return (
    <div className={styles.bodyContainer}>
      <img src={QuestionMark} alt="Question Mark Icon" className={styles.icon} />
      <div className={styles.body}>{body}</div>
    </div>
  );
}
