interface Option {
  label: string;
  value: string;
}

interface IMultiSelect {
  disabled: boolean;
  id: string;
  name: string;
  label: string;
  value: string[];
  required?: boolean;
  showError?: boolean;
  errorMessage?: string;
  options: Option[];
  code?: string;
  onChange: (selected: string[]) => void;
}
