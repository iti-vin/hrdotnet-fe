import { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";
import { IconFileText } from "@tabler/icons-react";
import "mantine-datatable/styles.layer.css";
import { LeaveStore } from "@/modules/menu/Leave/LeaveStore";
import "../style.css";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { Text } from "@mantine/core";

export default function LeaveTable() {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 15;
  const { ACTIVE_TAB, SET_SELECTED_DATA } = LeaveStore();

  const leaveColumn = [
    { accessor: "documentNo", title: "Document No.", textAlign: "start" },
    {
      accessor: "transactionDate",
      title: "Transaction Date",
      textAlign: "start",
      render: ({ transactionDate }: { transactionDate: string }) => {
        return DateTimeUtils.dayWithDate(transactionDate);
      },
    },
    { accessor: "branchCode", title: "Branch Code", textAlign: "start" },
    { accessor: "employeeCode", title: "Employee Code", textAlign: "start" },
    { accessor: "employeeName", title: "Employee Name", textAlign: "start" },
    { accessor: "leaveType", title: "Leave Type", textAlign: "start" },
    {
      accessor: "leaveFrom",
      title: "Leave From",
      textAlign: "start",
      render: ({ leaveFrom }: { leaveFrom: string }) => {
        return DateTimeUtils.dayWithDate(leaveFrom);
      },
    },
    {
      accessor: "leaveTo",
      title: "Leave To",
      textAlign: "start",
      render: ({ leaveTo }: { leaveTo: string }) => {
        return DateTimeUtils.dayWithDate(leaveTo);
      },
    },
    {
      accessor: "status",
      title: "Status",
      textAlign: "center",
      render: ({ status }: { status: string }) => {
        const statusInfo = statusColors.find((item) => item.status === status);
        return (
          <div className="rounded-xl text-center p-1.5" style={{ background: (statusInfo as any).color, color: "white" }}>
            {status}
          </div>
        );
      },
    },
    {
      accessor: "attachment",
      title: "Attachment",
      textAlign: "center",
      render: () => {
        return (
          <div className="flex  justify-center ">
            <IconFileText
              className="enlarge"
              style={iconStyle}
              onClick={(e) => {
                e.stopPropagation();
                window.open(samplePDF1, "_blank");
              }}
            />
          </div>
        );
      },
    },
  ];

  const leaveListColumn = [
    { accessor: "documentNo", title: "Document No.", textAlign: "start" },
    {
      accessor: "transactionDate",
      title: "Transaction Date",
      textAlign: "start",
      render: ({ transactionDate }: { transactionDate: string }) => {
        return DateTimeUtils.dayWithDate(transactionDate);
      },
    },
    { accessor: "leaveType", title: "Leave Type", textAlign: "start" },
    {
      accessor: "leaveFrom",
      title: "Leave From",
      textAlign: "start",
      render: ({ leaveFrom }: { leaveFrom: string }) => {
        return DateTimeUtils.dayWithDate(leaveFrom);
      },
    },
    {
      accessor: "leaveTo",
      title: "Leave To",
      textAlign: "start",
      render: ({ leaveTo }: { leaveTo: string }) => {
        return DateTimeUtils.dayWithDate(leaveTo);
      },
    },
    {
      accessor: "processedBy",
      title: "Processed By",
      textAlign: "center",
      render: ({ processedBy }: { processedBy: any }) => {
        return <Text>{processedBy}</Text>;
      },
    },
    {
      accessor: "status",
      title: "Status",
      textAlign: "center",
      render: ({ status }: { status: string }) => {
        const statusInfo = statusColors.find((item) => item.status === status);
        return (
          <div className="rounded-xl text-center p-1.5" style={{ background: (statusInfo as any).color, color: "white" }}>
            {status}
          </div>
        );
      },
    },
    {
      accessor: "attachment",
      title: "Attachment",
      textAlign: "center",
      render: () => {
        return (
          <div className="flex  justify-center ">
            <IconFileText
              className="enlarge"
              style={iconStyle}
              onClick={(e) => {
                e.stopPropagation();
                // window.open(samplePDF1, '_blank');
              }}
            />
          </div>
        );
      },
    },
  ];

  const leaveRecordsApprove = [
    {
      documentNo: 1,
      branchCode: "001",
      employeeCode: "E123",
      employeeName: "John Doe",
      leaveType: "Sick Leave",
      leaveFrom: "2024-10-01",
      leaveTo: "2024-10-05",
      transactionDate: "2024-10-01",
      status: "Reviewed",
      attachment: "MedicalCertificate.pdf",
      isWithinCutOff: false,
    },
    {
      documentNo: 2,
      branchCode: "002",
      employeeCode: "E124",
      employeeName: "Jane Smith",
      leaveType: "Vacation Leave",
      leaveFrom: "2024-10-02",
      leaveTo: "2024-10-10",
      transactionDate: "2024-10-02",
      status: "Filed",
      attachment: "LeaveRequest.pdf",
      isWithinCutOff: true,
    },
    {
      documentNo: 3,
      branchCode: "003",
      employeeCode: "E125",
      employeeName: "Emily Johnson",
      leaveType: "Casual Leave",
      leaveFrom: "2024-10-03",
      leaveTo: "2024-10-03",
      transactionDate: "2024-10-03",
      status: "Reviewed",
      attachment: "RequestForm.pdf",
    },
    {
      documentNo: 4,
      branchCode: "004",
      employeeCode: "E126",
      employeeName: "Michael Brown",
      leaveType: "Maternity Leave",
      leaveFrom: "2024-10-04",
      leaveTo: "2024-12-04",
      transactionDate: "2024-10-04",
      status: "Cancelled",
      attachment: "MaternityLeaveForm.pdf",
      isWithinCutOff: true,
    },
    {
      documentNo: 5,
      branchCode: "005",
      employeeCode: "E127",
      employeeName: "Sarah Davis",
      leaveType: "Paternity Leave",
      leaveFrom: "2024-10-05",
      leaveTo: "2024-10-15",
      transactionDate: "2024-10-05",
      status: "Approved",
      attachment: "PaternityLeaveRequest.pdf",
      isWithinCutOff: false,
    },
  ];

  const leaveRecordsReview = [
    {
      documentNo: 1,
      branchCode: "001",
      employeeCode: "E123",
      employeeName: "John Doe",
      leaveType: "Sick Leave",
      leaveFrom: "2024-10-01",
      leaveTo: "2024-10-05",
      transactionDate: "2024-10-01",
      status: "Filed",
      attachment: "MedicalCertificate.pdf",
      isWithinCutOff: false,
    },
    {
      documentNo: 2,
      branchCode: "002",
      employeeCode: "E124",
      employeeName: "Jane Smith",
      leaveType: "Vacation Leave",
      leaveFrom: "2024-10-02",
      leaveTo: "2024-10-10",
      transactionDate: "2024-10-02",
      status: "Filed",
      attachment: "LeaveRequest.pdf",
      isWithinCutOff: true,
    },
    {
      documentNo: 3,
      branchCode: "003",
      employeeCode: "E125",
      employeeName: "Emily Johnson",
      leaveType: "Casual Leave",
      leaveFrom: "2024-10-03",
      leaveTo: "2024-10-03",
      transactionDate: "2024-10-03",
      status: "Filed",
      attachment: "RequestForm.pdf",
    },
    {
      documentNo: 4,
      branchCode: "004",
      employeeCode: "E126",
      employeeName: "Michael Brown",
      leaveType: "Maternity Leave",
      leaveFrom: "2024-10-04",
      leaveTo: "2024-12-04",
      transactionDate: "2024-10-04",
      status: "Filed",
      attachment: "MaternityLeaveForm.pdf",
      isWithinCutOff: true,
    },
    {
      documentNo: 5,
      branchCode: "005",
      employeeCode: "E127",
      employeeName: "Sarah Davis",
      leaveType: "Paternity Leave",
      leaveFrom: "2024-10-05",
      leaveTo: "2024-10-15",
      transactionDate: "2024-10-05",
      status: "Reviewed",
      attachment: "PaternityLeaveRequest.pdf",
      isWithinCutOff: false,
    },
  ];

  const leaveRecordsList = [
    {
      documentNo: 1,
      leaveType: "Sick Leave",
      leaveFrom: "2024-10-01",
      leaveTo: "2024-10-05",
      transactionDate: "2024-10-01",
      processedBy: "Manager A",
      status: "Filed",
      attachment: "MedicalCertificate.pdf",
      isWithinCutOff: true,
    },
    {
      documentNo: 2,
      leaveType: "Annual Leave",
      leaveFrom: "2024-11-10",
      leaveTo: "2024-11-20",
      transactionDate: "2024-10-05",
      processedBy: "Manager B",
      status: "Reviewed",
      attachment: null,
      isWithinCutOff: false,
    },
    {
      documentNo: 3,
      leaveType: "Casual Leave",
      leaveFrom: "2024-09-15",
      leaveTo: "2024-09-15",
      transactionDate: "2024-09-10",
      processedBy: "Manager C",
      status: "Approved",
      attachment: null,
      isWithinCutOff: false,
    },
    {
      documentNo: 4,
      leaveType: "Maternity Leave",
      leaveFrom: "2024-12-01",
      leaveTo: "2024-03-01",
      transactionDate: "2024-10-10",
      processedBy: "Manager D",
      status: "Approved",
      attachment: "MaternityLeaveForm.pdf",
      isWithinCutOff: false,
    },
    {
      documentNo: 5,
      leaveType: "Paternity Leave",
      leaveFrom: "2024-12-15",
      leaveTo: "2024-12-22",
      transactionDate: "2024-10-15",
      processedBy: "Manager E",
      status: "Cancelled",
      attachment: null,
      isWithinCutOff: false,
    },
    {
      documentNo: 6,
      leaveType: "Paternity Leave",
      leaveFrom: "2024-12-22",
      leaveTo: "2024-12-22",
      transactionDate: "2024-10-15",
      processedBy: "Manager E",
      status: "Cancelled",
      attachment: null,
      isWithinCutOff: false,
    },
    {
      documentNo: 7,
      leaveType: "Emergency Leave",
      leaveFrom: "2024-10-10",
      leaveTo: "2024-10-12",
      transactionDate: "2024-10-09",
      processedBy: "Manager F",
      status: "Approved",
      attachment: "EmergencyNote.pdf",
      isWithinCutOff: false,
    },
  ];

  const statusColors = [
    { status: "Reviewed", color: "#FF7800" },
    { status: "Approved", color: "#1E8449" },
    { status: "Cancelled", color: "#FF4B34" },
    { status: "Filed", color: "#9B51E0" },
  ];

  const iconStyle = {
    width: "rem(100)",
    height: "rem(100)",
    stroke: "1.5",
    color: "gray",
  };

  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

  const getRecords = (activeTab: string) => {
    if (activeTab === "list") return leaveRecordsList as any;
    if (activeTab === "review") return leaveRecordsReview as any;
    return leaveRecordsApprove as any;
  };

  const getColumns = (activeTab: string) => {
    if (activeTab === "list") return leaveListColumn as any;
    return leaveColumn as any;
  };

  return (
    <DataTable
      style={{
        color: "#6D6D6D",
        fontWeight: 500,
      }}
      totalRecords={leaveRecordsApprove.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
      withTableBorder
      idAccessor="documentNo"
      columns={getColumns(ACTIVE_TAB)}
      records={getRecords(ACTIVE_TAB)}
      paginationText={({ from, to, totalRecords }) => `Showing data ${from} out ${to} of ${totalRecords} entries (0.225) seconds`}
      onRowClick={(data) => {
        SET_SELECTED_DATA(data.record);
      }}
      styles={{
        header: {
          color: "rgba(109, 109, 109, 0.6)",
          fontWeight: 500,
        },
        root: {
          color: "rgba(0, 0, 0, 0.6)",
        },
      }}
      // do not show checkbox on list module
      {...(ACTIVE_TAB !== "list" && {
        selectedRecords: selectedRecords,
        onSelectedRecordsChange: setSelectedRecords,
      })}
    />
  );
}
