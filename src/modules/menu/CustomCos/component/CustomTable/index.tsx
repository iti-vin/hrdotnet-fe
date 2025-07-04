import { Table, Checkbox } from "@mantine/core";
import { usePaginationStore } from "../../store/usePaginationStore";

interface Props<T> {
  headers: string[];
  data: T[];
  renderRow: (row: T) => React.ReactNode[];
}

export function CustomTable<T>({ headers, data, renderRow }: Props<T>) {
  const { page, rowsPerPage } = usePaginationStore();
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <Table striped verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            <Checkbox />
          </Table.Th>
          {headers.map((header) => (
            <Table.Th key={header}>{header}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {paginatedData.map((row, index) => (
          <Table.Tr key={index}>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            {renderRow(row).map((cell, i) => (
              <Table.Td key={i}>{cell}</Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
