import { Checkbox, Group, Stack, Table } from "@mantine/core";

import { Filters } from "../../component/Filters";
import { CustomTitle } from "../../component/CustomTitle";
import { NewRequestBtn } from "../../component/buttons/NewRequestBtn";
import { commonTableHeaders } from "../../constant/tableHeaders";
import { reviewTableData } from "../../data/tableData";
import { tableStatusBadge } from "../../constant/tableStatusBadge";
import { IconFileText } from "@tabler/icons-react";

const Review = () => {
  return (
    <Stack>
      <Group justify="space-between">
        <CustomTitle />
        <NewRequestBtn />
      </Group>
      <Filters />
      {/* Review Table */}
      <Table striped verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Checkbox />
            </Table.Th>
            {commonTableHeaders.map((header) => (
              <Table.Th key={header}>{header}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {reviewTableData.map((row, index) => (
            <Table.Tr key={index}>
              <Table.Td>
                <Checkbox />
              </Table.Td>
              {commonTableHeaders.map((header) => (
                <Table.Td key={header}>
                  {header === "Status" ? (
                    tableStatusBadge(String(row[header]))
                  ) : header === "Attachment" ? (
                    <IconFileText size={18} />
                  ) : (
                    row[header]
                  )}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
};

export default Review;
