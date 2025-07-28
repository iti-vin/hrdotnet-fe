import Filter from "../components/Filter/";
import Header from "../components/Header/";
import Footer from "../components/Pagination/";
import Table from "../components/Table/";
import { useQuery } from "@tanstack/react-query";
import { LeaveServices } from "../services/approval";
import { LeaveResponse } from "../models/response";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { statusColors } from "@shared/assets/types/Global";
import { IconFileText } from "@tabler/icons-react";
import Container from "@/layout/main/container";
import useLeaveStore from "../store/LeaveStore";
export default function Filings() {
  const { time, setTime, storedFilters, storedPage } = useLeaveStore();
  const { data, isLoading, refetch } = useQuery<LeaveResponse>({
    queryKey: ["approval_leave", storedFilters, storedPage],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await LeaveServices.getAllLeaveApproval(storedFilters, storedPage);
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Container>
      <Header panel="FILINGS" />
      <Filter refreshClick={handleRefresh} />
      <Table
        records={data && data.items}
        isLoading={isLoading}
        columns={[
          { accessor: "filing.documentNo", title: "Document No." },
          { accessor: "branchId", title: "Branch Code" },
          { accessor: "code", title: "Employee Code" },
          { accessor: "name", title: "Employee Name" },
          { accessor: "filing.leaveOption.name", title: "Leave Type" },
          {
            accessor: "filing.dateFiled.dateFrom",
            title: "Leave From",
            render: (row: any) => DateTimeUtils.getIsoDateWithBackSlash(row.filing.dateFiled.dateFrom),
            textAlign: "center",
          },
          {
            accessor: "filing.dateFiled.dateTo",
            title: "Leave To",
            render: (row: any) => DateTimeUtils.getIsoDateWithBackSlash(row.filing.dateFiled.dateTo),
            textAlign: "center",
          },
          {
            accessor: "transactionDate",
            title: "Transaction Date",
            render: (row: any) => DateTimeUtils.getIsoDateWithBackSlash(row.filing.dateTransaction),
            textAlign: "center",
          },
          {
            accessor: "filing.filingStatus.name",
            title: "Status",
            textAlign: "center",
            render: (row: any) => {
              const statusInfo = statusColors.find((item) => item.status === row.filing.filingStatus.name) || { status: "Unknown", color: "gray" };
              return (
                <div className="rounded-xl text-center w-36 p-0.5" style={{ background: statusInfo.color, color: "white" }}>
                  {row.filing.filingStatus.name}
                </div>
              );
            },
          },
          {
            accessor: "attachment",
            title: "Attachment",
            textAlign: "center",
            render: () => (
              <div className="flex justify-center hover:scale-105">
                <IconFileText onClick={(e) => e.stopPropagation()} color="rgba(109, 109, 109, 0.6)" />
              </div>
            ),
          },
        ]}
      />
      {data && <Footer total={Math.ceil(data.total / data.pageSize)} pageSize={data.pageSize} currentPage={data.page} recordsLength={data.total} time={time} />}
    </Container>
  );
}
