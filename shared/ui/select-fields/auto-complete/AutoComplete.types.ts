import { ChangeEvent } from "react";

export interface IAutoComplete {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  showError?: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  code?: string;
}

export interface Option {
  label: string;
  value: string;
}
