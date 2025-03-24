import { useState } from "react";
import { DataTable } from "mantine-datatable";
import "mantine-datatable/styles.layer.css";

export default function LeaveType() {
  const PAGE_SIZE = 15;
  const leaveListColumn = [
    { accessor: "date", title: "Date", textAlign: "start" },
    { accessor: "documentNo", title: "Document No.", textAlign: "start" },
    { accessor: "particular", title: "Particular", textAlign: "start" },
    { accessor: "received", title: "Received", textAlign: "center" },
    { accessor: "charged", title: "Charged", textAlign: "center" },
    { accessor: "status", title: "Status", textAlign: "center" },
    { accessor: "actionHistory", title: "Action History", textAlign: "center" },
  ];

  const leaveRecordsList = [
    {
      documentNo: "DocumentNo",
      leaveType: "Casual Leave",
      actionHistory: "Action History",
      date: "2024-09-15",
      transactionDate: "2024-09-10",
      particular: "Particular",
      status: "Approved",
      received: "1",
      charged: "1",
    },
    {
      documentNo: "DocumentNo",
      leaveType: "Maternity Leave",
      actionHistory: "Action History",
      date: "2025-03-01",
      transactionDate: "2024-10-10",
      particular: "Particular",
      status: "Approved",
      received: "1",
      charged: "1",
    },
    {
      documentNo: "DocumentNo",
      leaveType: "Emergency Leave",
      actionHistory: "Action History",
      date: "2024-10-12",
      transactionDate: "2024-10-09",
      particular: "Particular",
      status: "Approved",
      received: "1",
      charged: "1",
    },
  ];

  const [page, setPage] = useState(1);

  return (
    <div className="md:h-screen-65">
      <DataTable
        style={{
          color: "#6D6D6D",
          fontWeight: 500,
        }}
        totalRecords={leaveRecordsList.length}
        recordsPerPage={PAGE_SIZE}
        withTableBorder
        page={page}
        onPageChange={(p) => setPage(p)}
        paginationText={({ from, to, totalRecords }) => `Showing data ${to} out of ${totalRecords} entries found (0.225) seconds`}
        idAccessor="documentNo"
        columns={leaveListColumn as any}
        records={leaveRecordsList as any}
      />
    </div>
  );
}
