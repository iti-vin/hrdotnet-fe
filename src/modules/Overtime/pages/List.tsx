/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useOvertimeStore, } from "@/modules/Overtime/store/useOT";
//--- Tabler Icons
import { IconFileText } from "@tabler/icons-react";

//--- Components(Overtime)
import {
  NewRequest,
  ViewDetails,
  DrawerFilter,
  Table,
} from "@/modules/Overtime/components/";

//--- Shared
import { FilingStatus } from "@shared/assets/types/Global";
import { Container, Filter, Header, StatusChip } from "@shared/template";

import pdf from "@/modules/Overtime/assets/file.pdf";
import { useEffect } from "react";

export default function List() {
  const [addRequest, { open: requestOpen, close: requestClose }] =
    useDisclosure(false);
  const [filter, { open: filterOpen, close: filterClose }] =
    useDisclosure(false);
  const [details, { open: detailsOpen, close: detailsClose }] =
    useDisclosure(false);

    const { setActiveTab } = useOvertimeStore();
    useEffect(() => {
      setActiveTab('list')
    }, [])
    
  return (
    <Container>
      <Header
        buttonClick={requestOpen}
        title="Overtime"
        buttonLabel="New Request"
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
          { accessor: "sched", title: "Schedule" },
          { accessor: "dateFiled", title: "OT Date" },
          { accessor: "numberOfHours", title: "OT Hours" },
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
