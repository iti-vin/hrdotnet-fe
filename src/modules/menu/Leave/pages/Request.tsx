import Filter from "../components/Filter/";
import Header from "../components/Header/index";
import Footer from "../components/Pagination/";
import Table from "../components/Table/";
import { LeaveServices } from "../services/main";
import { useQuery } from "@tanstack/react-query";
import { LeaveResponse } from "../models/response";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { IconFileText } from "@tabler/icons-react";
import { statusColors } from "@shared/assets/types/Global";
import Container from "@/layout/main/container";
import useLeaveStore from "../store/LeaveStore";

import Modals from "../components/Modal";
import { useEffect } from "react";

export default function Request() {
  const { status, setTime, storedFilters, storedPage, setLoading, loading } = useLeaveStore();

  const { data, isLoading, refetch } = useQuery<LeaveResponse>({
    queryKey: ["request_leave", storedFilters!, storedPage!],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await LeaveServices.getAllLeaveMe(storedFilters, status, storedPage);
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setLoading(isLoading);
    refetch();
  }, [loading]);

  return (
    <Container>
      <Header panel="REQUEST" />
      <Filter />

      <Table
        records={data && data.items}
        isLoading={isLoading}
        columns={[
          { accessor: "filing.documentNo", title: "Document No." },
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
          { accessor: "name", title: "Processed By", textAlign: "center" },
          {
            accessor: "filing.filingStatus.name",
            title: "Status",
            textAlign: "center",
            render: (row: any) => {
              const statusInfo = statusColors.find((item) => item.status === row.filing.filingStatus.name) || { status: "Unknown", color: "gray" };
              return (
                <div className="rounded-xl text-center p-1" style={{ background: statusInfo.color, color: "white" }}>
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
      {data && <Footer total={Math.ceil(data.total / data.pageSize)} pageSize={data.pageSize} currentPage={data.page} recordsLength={data.total} time={""} />}

      <Modals panel="REQUEST" />
    </Container>
  );
}
