// React Modules
import { useEffect } from "react";
// Mantine Modules
import { useDisclosure } from "@mantine/hooks";
// Tabler Icons Modules
import { IconFileText } from "@tabler/icons-react";
import { useML } from "@/modules/MissedLog/store/useMissedLog";
// Shared Modules
import { FilingStatus } from "@shared/assets/types/Global";
import { Header, Container, StatusChip, Filter } from "@shared/template";
// Own Modules
import {
  Table,
  DrawerFilter,
  Details,
  NewRequest,
} from "@/modules/MissedLog/components/views";

import pdf from "@/modules/MissedLog/assets/file.pdf";

export default function List() {
  const [addRequest, { open: requestOpen, close: requestClose }] =
    useDisclosure(false);
  const [filter, { open: filterOpen, close: filterClose }] =
    useDisclosure(false);
  const [details, { open: detailsOpen, close: detailsClose }] =
    useDisclosure(false);

  const { setActiveTab } = useML();

  useEffect(() => {
    setActiveTab("list");
  }, []);

  return (
    <Container>
      <Header
        title="Missed Log"
        buttonLabel="New Request"
        buttonClick={requestOpen}
      />

      <Filter filterOpen={filterOpen} />

      <Table
        statuses={[
          FilingStatus.Filed,
          FilingStatus.Approved,
          FilingStatus.Cancelled,
          FilingStatus.Reviewed,
          FilingStatus.Posted,
        ]}
        columns={[
          { accessor: "documentNo", title: "Document No" },
          { accessor: "dateTransaction", title: "Transaction Date" },
          { accessor: "logType", title: "Log Type" },
          { accessor: "logTime", title: "Log Time" },
          {
            accessor: "dateFiled",
            title: "Missed Log Date",
            textAlign: "center",
          },
          {
            accessor: "name",
            title: "Processed By:",
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
        rowClick={detailsOpen}
      />

      <DrawerFilter opened={filter} closed={filterClose} />

      <NewRequest
        opened={addRequest}
        onClose={requestClose}
        buttonClose={requestClose}
      />

      <Details
        tabs="List"
        opened={details}
        onClose={detailsClose}
        buttonClose={detailsClose}
      />
    </Container>
  );
}
