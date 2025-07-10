import { Divider, DividerProps } from "@mantine/core";

interface ICustomDivider extends DividerProps {}
export default function CustomDivider({ ...props }: ICustomDivider) {
  return <Divider size={2} h={10} color="#edeeed" className="w-full" {...props} />;
}
