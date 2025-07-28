import { DefaultMantineColor, Flex, MantineFontSize, MantineSpacing, StyleProp, Text } from "@mantine/core";
import { ReactNode } from "react";

interface DetailsProps {
  label: string;
  value: ReactNode;
  labelC?: StyleProp<DefaultMantineColor>;
  valueC?: StyleProp<DefaultMantineColor>;
  labelFz?: StyleProp<number | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | MantineFontSize> | undefined;
  valueFz?: StyleProp<number | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | MantineFontSize> | undefined;
  direction?: "column" | "row";
  gap?: StyleProp<MantineSpacing>;
}

export default function Details({ label, value, labelC = "#6d6d6d", valueC = "#6d6d6d", labelFz = 14, valueFz = 13, direction = "column", gap = 10 }: DetailsProps) {
  return (
    <Flex gap={gap} align="start" direction={direction} justify={"space-between"}>
      <Text c={labelC} fw={400} fz={labelFz} className="w-1/2" children={label} />
      <Text c={valueC} fw={700} fz={valueFz} className="w-1/2" children={value} />
    </Flex>
  );
}
