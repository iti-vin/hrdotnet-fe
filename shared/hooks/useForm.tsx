import { useForm as useMantineForm, UseFormInput, UseFormReturnType } from "@mantine/form";

type FormOptions<T extends Record<string, any>> = UseFormInput<T>;

export function useAppForm<T extends Record<string, any>>(options: FormOptions<T>): UseFormReturnType<T> {
  const form = useMantineForm<T>(options);
  return form;
}
