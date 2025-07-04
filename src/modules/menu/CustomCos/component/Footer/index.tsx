import { Container, Group, Select, Text, Pagination, Flex } from "@mantine/core";
import { usePaginationStore } from "../../store/usePaginationStore";

interface Props {
  totalItems: number;
}

export const PaginationFooter = ({ totalItems }: Props) => {
  const { page, rowsPerPage, setPage, setRowsPerPage } = usePaginationStore();
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  return (
    <Container fluid className="fixed bottom-4 w-[82%] z-50 bg-white">
      <Group justify="space-between" className="py-2">
        <Flex align="center" gap="xs">
          <Text size="sm" className="text-gray-500">
            Show
          </Text>
          <Select
            data={["10", "20", "30"]}
            value={rowsPerPage.toString()}
            onChange={(value) => setRowsPerPage(Number(value))}
            className="w-[72px]"
            size="xs"
            variant="filled"
          />
          <Text size="sm" className="text-gray-500">
            entries found in <span className="font-mono">(0.225)</span> seconds
          </Text>
        </Flex>

        <Pagination total={totalPages} value={page} onChange={setPage} size="sm" radius="xl" />
      </Group>
    </Container>
  );
};
