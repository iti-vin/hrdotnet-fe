import { NumberInputProps } from "@mantine/core";

export interface INumberInput extends NumberInputProps {
  code?: string;
  pattern?: string;
}
