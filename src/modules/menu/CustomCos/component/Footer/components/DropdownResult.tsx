import { Flex, Select, Text } from "@mantine/core";

export const DropdownResult = () => {
  return (
    <Flex align="center" gap="xs">
      <Text size="sm" className="text-gray-500">
        Show
      </Text>
      <Select
        data={["10", "20", "30"]}
        defaultValue="30"
        className="w-[72px]"
        size="xs"
        variant="filled"
        styles={{ input: { fontSize: "0.875rem" } }} // text-sm
      />
      <Text size="sm" className="text-gray-500">
        entries found in <span className="font-mono">(0.225)</span> seconds
      </Text>
    </Flex>
  );
};
