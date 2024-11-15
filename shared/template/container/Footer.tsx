import { Pagination, Group, Text, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
interface PaginationTypes {
  total: number;
  onChange: (page: number) => void;
  pageSize: number;
  recordsLength: number;
  currentPage: number;
}
export default function Footer({
  total,
  onChange,
  pageSize,
  recordsLength,
  currentPage,
}: PaginationTypes) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <Group justify={isMobile ? "center" : "space-between"} align="center">
      <Text size="sm" className="text-gray-500">
        Showing {(currentPage - 1) * pageSize + 1} -{" "}
        {Math.min(currentPage * pageSize, recordsLength)} of {recordsLength}{" "}
        records
      </Text>
      <Pagination onChange={onChange} total={total} />
    </Group>
  );
}
