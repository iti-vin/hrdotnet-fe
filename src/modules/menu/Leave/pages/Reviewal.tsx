import Filter from "../components/Filter/";
import Header from "../components/Header/";
import Footer from "../components/Pagination/";
import Table from "../components/Table/";
import { LeaveResponse } from "../models/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LeaveServices } from "../services/reviewal";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { IconFileText } from "@tabler/icons-react";
import { statusColors } from "@shared/assets/types/Global";
import Container from "@/layout/main/container";
import useLeaveStore from "../store/LeaveStore";

import Modals from "../components/Modal";
import { ApproveEndorseData } from "../models/request";
import { Button } from "@mantine/core";
import { useEffect } from "react";

export default function Reviewal() {
  const queryClient = useQueryClient();
  const { setTime, viewItems, storedFilters, storedPage, setOpenDialog, setError, setLoading, loading } = useLeaveStore();

  const { data, isLoading, refetch } = useQuery<LeaveResponse>({
    queryKey: ["reviewal_leave", storedFilters, storedPage],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await LeaveServices.getAllLeaveReview(storedFilters, storedPage);
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: singleEndorse } = useMutation({
    mutationFn: async (id: number) => {
      const formData = ApproveEndorseData(viewItems);
      return LeaveServices.singleReviewLeave(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewal_leave"] });
      setOpenDialog("");
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

  const onHandleSingleEndorse = () => {
    singleEndorse(viewItems.filing.id);
  };

  useEffect(() => {
    setLoading(isLoading);
    refetch();
  }, [loading]);

  const handleRefresh = () => {
    setLoading(isLoading);
    refetch();
  };

  return (
    <Container>
      <Header panel="REVIEWAL" />
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
          // { accessor: "name", title: "Processed By", textAlign: "center" },
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
      {data && <Footer total={Math.ceil(data.total / data.pageSize)} pageSize={data.pageSize} currentPage={data.page} recordsLength={data.total} />}

      <Modals
        panel="REVIEWAL"
        endorse={
          <Button className="border-none custom-gradient rounded-md" onClick={onHandleSingleEndorse}>
            ENDORSE
          </Button>
        }
      />
    </Container>
  );
}
