/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

//--- Tabler Icons
import { IconFileText } from "@tabler/icons-react";

//--- Components for Offset
import {
  DrawerFilter,
  NewRequest,
  Table,
  ViewDetails,
} from "@/modules/Offset/components";

//--- Shared
import { FilingStatus } from "@shared/assets/types/Global";
import { Container, Filter, Header, StatusChip } from "@shared/template";

import pdf from "@/modules/Offset/assets/file.pdf";
import useOffsetStore from "../store/useOff";
import { useEffect } from "react";

export default function List() {
  const [addRequest, { open: requestOpen, close: requestClose }] =
    useDisclosure(false);
  const [filter, { open: filterOpen, close: filterClose }] =
    useDisclosure(false);
  const [details, { open: detailsOpen, close: detailsClose }] =
    useDisclosure(false);


  const { setActiveTab } = useOffsetStore();

  useEffect(() => {
    setActiveTab('list')
  }, [])


  return (
    <Container>
      {/* Header consist of title container and the Button */}
      <Header
        buttonClick={requestOpen}
        title="Offset"
        buttonLabel="New Request"
      />

      {/* Filter contains the pills and button icons for filtering */}
      <Filter filterOpen={filterOpen} />

      <Table
        statuses={[
          FilingStatus.Filed,
          FilingStatus.Approved,
          FilingStatus.Cancelled,
          FilingStatus.Reviewed,
        ]}
        columns={[
          { accessor: "documentNo", title: "Document No" },
          { accessor: "dateTransaction", title: "Transaction Date" },
          { accessor: "sched", title: "Schedule" },
          { accessor: "code", title: "Employee Code" },
          { accessor: "dateFiled", title: "Offset Date" },
          { accessor: "numberOfHours", title: "Offset Hours" },
          {
            accessor: "name",
            title: "Processed By",
            textAlign: "center",
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

      {/* Modal new request filing */}
      <NewRequest
        opened={addRequest}
        onClose={requestClose}
        buttonClose={requestClose}
      />

      {/* Modal to show offset details */}
      <ViewDetails
        tabs="List"
        opened={details}
        onClose={detailsClose}
        buttonClose={detailsClose}
      />
    </Container>
  );
}
