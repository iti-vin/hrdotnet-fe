import { TextareaProps } from "@mantine/core";

export interface ITextArea extends TextareaProps {
  code?: string;
  labelVariant?: "default" | "header";
}
