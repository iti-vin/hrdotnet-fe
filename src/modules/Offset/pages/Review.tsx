/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
//--- Tabler Icons
import { IconFileText, IconFolderPlus } from "@tabler/icons-react";
//--- Components for Offset
import {
  DrawerFilter,
  Table,
  ViewDetails,
} from "@/modules/Offset/pages/components";
import pdf from "@/modules/Offset/assets/file.pdf";
//--- Template Modules
import { Container, Filter, Header, StatusChip } from "@shared/template";

export default function Review() {
  const [filter, { open: filterOpen, close: filterClose }] =
    useDisclosure(false);
  const [details, { open: detailsOpen, close: detailsClose }] =
    useDisclosure(false);
  return (
    <Container>
      {/* Header consist of title container and the Button */}
      <Header
        title="Offset"
        buttonLabel="Endorse"
        buttonIcon={<IconFolderPlus size={25} stroke={2} />}
      />
      {/* Filter contains the pills and button icons for filtering */}
      <Filter filterOpen={filterOpen} />

      <Table
        statuses={["Filed"]}
        columns={[
          { accessor: "documentNo", title: "Document No" },
          { accessor: "branchCode", title: "Branch Code" },
          { accessor: "dateFiled", title: "Schedule" },
          { accessor: "code", title: "Employee Code" },
          { accessor: "dateFiled", title: "Offset Date" },
          { accessor: "numberOfHours", title: "Offset Hours" },
          { accessor: "dateTransaction", title: "Transaction Date" },
          {
            accessor: "name",
            title: "Processed By",
            textAlign: "center",
            render: (row: any) => (
              <Flex direction="column" align="center">
                <Text fw={500} size="sm">
                  {row.name}
                </Text>
                <Text fw={300} size="xs">
                  {row.name}
                </Text>
              </Flex>
            ),
          },
          {
            accessor: "filingStatus",
            title: "Status",
            textAlign: "center",
            render: (row: any) => <StatusChip label={row.filingStatus} />,
          },
          {
            accessor: "Attachment",
            title: "Attachment",
            render: () => (
              <div className="flex justify-center hover:scale-105">
                <IconFileText
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(pdf, "_blank");
                  }}
                  color="rgba(109, 109, 109, 0.6)"
                />
              </div>
            ),
            textAlign: "center",
          },
        ]}
        // Clicking per row to show details
        rowClick={detailsOpen}
      />

      {/* Drawer filter was the side drawer to filter the table contents */}
      <DrawerFilter opened={filter} closed={filterClose} />
      {/* Modal to show offset details */}
      <ViewDetails
        opened={details}
        onClose={detailsClose}
        buttonClose={detailsClose}
      />
    </Container>
  );
}
