import { ChangeEvent, InputHTMLAttributes } from "react";

export interface IEmailInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id: string;
  value: string;
  disabled?: boolean;
  autoComplete: "on" | "off";
  placeholder: string;
  required?: boolean;
  showError?: boolean;
  errorMessage?: string;
  code: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
