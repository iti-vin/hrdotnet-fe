import styles from "../assets/style/modal.module.css";
import { useModalStore } from "../store/useModalStore";

export function ModalHeader() {
  const { title, warning } = useModalStore();
  const modalType = `
  ${styles.header} 
  ${warning ? styles.headerWarning : styles.headerPrimary}`;
  return <h1 className={modalType}>{title}</h1>;
}
