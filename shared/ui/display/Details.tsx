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

export default function Details({ label, value, labelC = "#559cda", valueC = "#6d6d6d", labelFz = 13, valueFz = 12, direction = "column", gap = 10 }: DetailsProps) {
  return (
    <Flex gap={gap} align="start" direction={direction}>
      <Text c={labelC} fw={700} fz={labelFz}>
        {label}
      </Text>
      <Text c={valueC} fw={400} fz={valueFz}>
        {value}
      </Text>
    </Flex>
  );
}
