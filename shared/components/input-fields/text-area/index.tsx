import { Textarea } from "@mantine/core";
import { ITextArea } from "./TextArea.types";
import styles from "./TextArea.module.css";

export default function CustomTextArea({ code, labelVariant = "default", ...props }: ITextArea) {
  const labelClass = labelVariant === "header" ? styles.labelHeder : styles.label;

  return <Textarea v2-id={`text-area-${code}`} {...props} classNames={{ label: labelClass, input: styles.input }} />;
}
