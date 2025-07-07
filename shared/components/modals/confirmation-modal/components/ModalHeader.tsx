import styles from "../assets/style/modal.module.css";

interface IModalHeader {
  title: string;
}

export function ModalHeader({ title }: IModalHeader) {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
    </div>
  );
}
