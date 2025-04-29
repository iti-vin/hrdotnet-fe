/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Container from "@/layout/main/container";

import { Header, Filter, Table, Pagination, Modals } from "../components";

import { IconFileText } from "@tabler/icons-react";
import { useChangeOfScheduleStore } from "../store";
import { ChangeSchedule } from "../models/response";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CosServices } from "../services/api";
import { useEffect } from "react";
import { statusColors } from "@shared/assets/types/Global";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { SingleData } from "../models/request";
import { queryClient } from "@/services/client";

export default function Approval() {
  const panel = "APPROVAL";
  const {
    loading,
    setLoading,
    time,
    setTime,
    storedFilters,
    storedPage,
    singleItem,
    setOpenConfirmation,
    setOpenAlert,
    setError,
  } = useChangeOfScheduleStore();

  const { data, isLoading, refetch } = useQuery<ChangeSchedule>({
    queryKey: ["approval_cos", { ...storedFilters }, { ...storedPage }],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await CosServices.getAllCosApproval({ ...storedFilters, ...storedPage });
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: singleApprove } = useMutation({
    mutationFn: async (id: number) => {
      const formData = SingleData(singleItem);
      return CosServices.singleApproveCOS(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approval_cos"] });
      setOpenConfirmation("");
      setOpenAlert("SuccessApprove");
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

  useEffect(() => {
    setLoading(isLoading);
    refetch();
  }, [loading]);

  return (
    <Container>
      <Header panel={panel} />
      <Filter panel={panel} />

      <Table
        records={data && data.items}
        isLoading={isLoading}
        columns={[
          { accessor: "filing.documentNo", title: "Document No" },
          { accessor: "branchId", title: "Branch Code" },
          { accessor: "code", title: "Employee Code" },
          { accessor: "name", title: "Employee Name" },
          {
            accessor: "filing.dateFiled.dateFrom",
            title: "COS From",
            render: (row: any) => DateTimeUtils.getIsoDateWithBackSlash(row.filing.dateFiled.dateFrom),
          },
          {
            accessor: "filing.dateFiled.dateTo",
            title: "COS To",
            render: (row: any) => DateTimeUtils.getIsoDateWithBackSlash(row.filing.dateFiled.dateTo),
          },
          { accessor: "filing.requested.name", title: "Requested Schedule" },
          {
            accessor: "dateTransaction",
            title: "Transaction Date",
            render: (row: any) => DateTimeUtils.getIsoDateWithBackSlash(row.dateTransaction),
          },
          { accessor: "name", title: "Processed By" },
          {
            accessor: "filing.filingStatus.name",
            title: "Status",
            width: "150px",
            render: (row: any) => {
              const statusInfo = statusColors.find((item) => item.status === row.filing.filingStatus.name) || {
                status: "Unknown",
                color: "gray",
              };
              return (
                <div className="rounded-xl text-center p-1.5" style={{ background: statusInfo.color, color: "white" }}>
                  {row.filing.filingStatus.name}
                </div>
              );
            },
          },
          {
            accessor: "filing.fileAttachment",
            textAlign: "center",
            title: "Attachment",
            render: () => (
              <div className="flex justify-center hover:scale-105">
                <IconFileText onClick={(e) => e.stopPropagation()} color="rgba(109, 109, 109, 0.6)" />
              </div>
            ),
          },
        ]}
        panel={panel}
      />

      {data && (
        <Pagination
          total={Math.ceil(data.total / data.pageSize)}
          pageSize={data.pageSize}
          recordsLength={data.total}
          currentPage={data.page}
          time={time}
        />
      )}

      <Modals panel={panel} onHandleSingleApprove={() => singleApprove(singleItem.filing.id)} />
    </Container>
  );
}
