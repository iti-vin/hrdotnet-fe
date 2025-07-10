import { Divider, DividerProps } from "@mantine/core";

export default function CustomDivider({ ...props }: DividerProps) {
  return <Divider size={2} h={10} color="#edeeed" className="w-full" {...props} />;
}
