import { NumberInput } from "@mantine/core";
import styles from "./NumberInput.module.css";
import { INumberInput } from "./NumberInput.types";

export default function CustomNumberInput({ code, ...props }: INumberInput) {
  return <NumberInput hideControls v2-id={`number-input-${code}`} {...props} classNames={{ label: styles.label, input: styles.input }} />;
}
