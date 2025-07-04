import { ChangeEvent, TextareaHTMLAttributes } from "react";

export interface ITextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  id: string;
  value: string;
  code?: string;
  autoComplete: "on" | "off";
  rows: number;
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  showError?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
