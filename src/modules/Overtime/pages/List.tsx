//--- Mantine Modules
import { Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
//--- Tabler Icons
import { IconFileText } from "@tabler/icons-react";
//--- Template Modules
import { Container, Filter, Header, StatusChip } from "@shared/template";
import {
  NewRequest,
  ViewDetails,
  DrawerFilter,
} from "@/modules/Overtime/pages/components/";
//--- Utils Modules
import { Table } from "@/modules/Overtime/pages/components/";
//--- Sample Service
import pdf from "@/modules/Overtime/assets/file.pdf";

export default function List() {
  const [addRequest, { open: requestOpen, close: requestClose }] =
    useDisclosure(false);
  const [filter, { open: filterOpen, close: filterClose }] =
    useDisclosure(false);
  const [details, { open: detailsOpen, close: detailsClose }] =
    useDisclosure(false);

  return (
    <Container>
      <Header
        buttonClick={requestOpen}
        title="Overtime"
        buttonLabel="New Request"
      />

      <Filter filterOpen={filterOpen} />
      <Table
        statuses={["Filed", "Approved", "Cancelled", "Reviewed"]}
        columns={[
          { accessor: "documentNo", title: "Document No" },
          { accessor: "sched", title: "Schedule" },
          { accessor: "code", title: "Employee Code" },
          { accessor: "dateFiled", title: "OT Date" },
          { accessor: "numberOfHours", title: "OT Hours" },
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
        rowClick={detailsOpen}
      />

      {/* Modals Below */}
      <DrawerFilter opened={filter} closed={filterClose} />
      <NewRequest
        opened={addRequest}
        onClose={requestClose}
        buttonClose={requestClose}
      />
      <ViewDetails
        opened={details}
        onClose={detailsClose}
        buttonClose={detailsClose}
      />
    </Container>
  );
}
