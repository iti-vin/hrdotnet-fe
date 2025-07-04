import { ChangeEvent, InputHTMLAttributes } from "react";

export interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  disabled: boolean;
  name: string;
  id: string;
  value: string;
  autoComplete: "on" | "off";
  placeholder: string;
  required?: boolean;
  errorMessage?: string;
  showError?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
