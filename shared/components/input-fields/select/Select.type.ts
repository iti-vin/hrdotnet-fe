import { ChangeEvent, SelectHTMLAttributes } from "react";

export interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  name: string;
  label: string;
  value: string;
  code?: string;
  required?: boolean;
  disabled?: boolean;
  showError?: boolean;
  errorMessage?: string;
  options: { label: string; value: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}
