/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Container from "@/layout/main/container";

import { useCTOStore } from "../store";
import { Header, Filter, Table, Pagination, Modals } from "../components";

export default function Filings() {
  const { time } = useCTOStore();
  const panel = "FILINGS";
  return (
    <Container>
      <Header panel={panel} />
      <Filter panel={panel} />
      <Table
        records={[]}
        isLoading={false}
        columns={[
          { accessor: "", title: "Document No", sortable: true },
          { accessor: "", title: "Branch Code", sortable: true },
          { accessor: "", title: "Employee Code", sortable: true },
          { accessor: "", title: "Employee Name", sortable: true },
          { accessor: "", title: "Leave Option", sortable: true },
          { accessor: "", title: "Leave From" },
          { accessor: "", title: "Leave To" },
          { accessor: "", title: "Transaction Date" },
          { accessor: "", title: "Processed By", sortable: true },
          { accessor: "", title: "Status", sortable: true },
          { accessor: "", title: "Attachment" },
        ]}
        panel={panel}
      />
      <Pagination total={10} pageSize={10} recordsLength={10} currentPage={10} time={time} />
      <Modals panel={panel} />
    </Container>
  );
}
