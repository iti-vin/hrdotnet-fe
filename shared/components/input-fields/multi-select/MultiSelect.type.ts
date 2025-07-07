export interface IMultiSelect {
  disabled: boolean;
  id: string;
  label: string;
  placeholder: string;
  value: string[];
  required?: boolean;
  showError?: boolean;
  errorMessage?: string;
  data: string[];
  code?: string;
  onChange: (value: string[]) => void;
}
