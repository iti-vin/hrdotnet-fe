import { ChangeEvent, InputHTMLAttributes } from "react";

export interface IPasswordInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id: string;
  value: string;
  code?: string;
  autoComplete: "on" | "off";
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  showError?: boolean;
  errorMessage?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
