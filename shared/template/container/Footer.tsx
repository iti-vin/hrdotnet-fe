import { Pagination, Group, Text, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
interface PaginationTypes {
  total: number;
  onChange: (page: number) => void;
  pageSize: number;
  recordsLength: number;
  currentPage: number;
  value?: number;
  time?: string;
}
export default function Footer({ onChange, total, pageSize, recordsLength, value, currentPage, time }: PaginationTypes) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Group justify={isMobile ? "center" : "space-between"} align="center">
      <Text size="sm" className="text-gray-500">
        Showing data {Math.min(currentPage * pageSize, recordsLength)} out of {recordsLength} entries found in {time} seconds
      </Text>
      <Pagination onChange={onChange} total={total} size="sm" value={value} />
    </Group>
  );
}
