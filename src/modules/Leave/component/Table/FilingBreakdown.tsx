import { useEffect, useState } from "react";
import { DataTable } from 'mantine-datatable';
import { IconFileText } from "@tabler/icons-react";
import 'mantine-datatable/styles.layer.css';
import { LeaveStore } from "@/modules/Leave/LeaveStore";
import '../../style.css'
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";

export default function FilingBreakdown() {

    const [page, setPage] = useState(1);
    const PAGE_SIZE = 15;
  
    const leaveListColumn = [
        { accessor: 'documentNo', title: 'Document No.', textAlign: 'start' },
        {
            accessor: 'transactionDate', title: 'Transaction Date', textAlign: 'start',
            render: ({ date }: { date: string }) => {
                return (
                    DateTimeUtils.dayWithDate(date)
                );
            },
        },
        {
            accessor: 'status', title: 'Status', textAlign: 'center',
            render: ({ status }: { status: string }) => {
                const statusInfo = statusColors.find(item => item.status === status);
                return (
                    <div className="rounded-xl text-center p-1.5" style={{ background: (statusInfo as any).color, color: 'white' }}>
                        {status}
                    </div>
                );
            },
        },
    ]

  

    const leaveRecordsList = [
        {
            documentNo: 3,
            leaveType: "Casual Leave",
            leaveFrom: "2024-09-15",
            leaveTo: "2024-09-15",
            transactionDate: "2024-09-10",
            processedBy: "Manager C",
            status: "Approved",
            attachment: null
        },
        {
            documentNo: 4,
            leaveType: "Maternity Leave",
            leaveFrom: "2024-12-01",
            leaveTo: "2025-03-01",
            transactionDate: "2024-10-10",
            processedBy: "Manager D",
            status: "Approved",
            attachment: "MaternityLeaveForm.pdf"
        },
        {
            documentNo: 6,
            leaveType: "Emergency Leave",
            leaveFrom: "2024-10-10",
            leaveTo: "2024-10-12",
            transactionDate: "2024-10-09",
            processedBy: "Manager F",
            status: "Approved",
            attachment: "EmergencyNote.pdf"
        }
    ];

    const statusColors = [
        { status: 'Reviewed', color: '#FF7800' },
        { status: 'Approved', color: '#1E8449' },
        { status: 'Cancelled', color: '#FF4B34' },
        { status: 'Filed', color: '#9B51E0' },
    ];


    const iconStyle = { width: 'rem(100)', height: 'rem(100)', stroke: '1.5', color: "gray", };

    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

    return (
        <div style={{ height: '95%' }}>
            <DataTable
                style={{
                    color: '#6D6D6D', fontWeight: 500
                }}

                // totalRecords={leaveRecords.length}
                // recordsPerPage={PAGE_SIZE}
                // page={page}
                // onPageChange={(p) => setPage(p)}
                withTableBorder
                // backgroundColor={{ dark: 'none', light: 'none' }}
                idAccessor="documentNo"
                columns={((leaveListColumn as any))}
                records={((leaveRecordsList as any))}
                // paginationText={({ from, to, totalRecords }) => `Showing data ${from} out ${to} of ${totalRecords} entries (0.225) seconds`}
                // onRowClick={(data) => {

                // }}
            />
        </div>
    );
}