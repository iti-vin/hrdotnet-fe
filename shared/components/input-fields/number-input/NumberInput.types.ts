import { ChangeEvent, InputHTMLAttributes } from "react";

export interface INumberInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id: string;
  disabled?: boolean;
  value: string;
  code?: string;
  autoComplete: "on" | "off";
  placeholder: string;
  required?: boolean;
  errorMessage?: string;
  showError?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
