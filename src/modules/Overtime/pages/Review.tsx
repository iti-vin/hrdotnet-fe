/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useDisclosure } from "@mantine/hooks";
import { Flex, Text } from "@mantine/core";

//--- Tabler Icons
import { IconFileText, IconFolderPlus } from "@tabler/icons-react";

//--- Components(Overtime)
import {
  ViewDetails,
  DrawerFilter,
  Table,
} from "@/modules/Overtime/components/";

//--- Shared
import { FilingStatus } from "@shared/assets/types/Global";
import { Container, Filter, Header, StatusChip } from "@shared/template";

import pdf from "@/modules/Overtime/assets/file.pdf";

export default function Review() {
  const [filter, { open: filterOpen, close: filterClose }] =
    useDisclosure(false);
  const [details, { open: detailsOpen, close: detailsClose }] =
    useDisclosure(false);
  return (
    <Container>
      <Header
        title="Overtime"
        buttonLabel="Endorse"
        buttonIcon={<IconFolderPlus size={25} stroke={2} />}
      />

      <Filter filterOpen={filterOpen} />
      <Table
        statuses={[FilingStatus.Filed]}
        columns={[
          { accessor: "documentNo", title: "Document No" },
          { accessor: "sched", title: "Schedule" },
          { accessor: "branchCode", title: "Branch Code" },
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
      <DrawerFilter opened={filter} closed={filterClose} />

      <ViewDetails
        opened={details}
        onClose={detailsClose}
        buttonClose={detailsClose}
      />
    </Container>
  );
}
