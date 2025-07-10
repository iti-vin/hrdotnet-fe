import { TextInput } from "@mantine/core";
import { ITextInput } from "./TextInput.types";
import styles from "./TextInput.module.css";

export default function CustomTextInput({ pattern, code, ...props }: ITextInput) {
  return <TextInput pattern={pattern} v2-id={`text-input-${code}`} {...props} classNames={{ label: styles.label, input: styles.input }} />;
}
