/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IconFileText } from "@tabler/icons-react";

//--- Shared Modules
import Container from "@/layout/main/container";
import { statusColors } from "@shared/assets/types/Global";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";

import { Header, Filter, Table, Pagination, Modals } from "../components";
import { OffsetServices } from "../services/api";
import { OffsetResponse } from "../models/response";
import { useOffsetStore } from "../store";
import { SingleDataOffset } from "../assets/Values";
import { queryClient } from "@/services/client";

export default function Approval() {
  const { time, setTime, loading, setLoading, storedFilters, storedPage, singleItem, viewItems, setOpenDialog, setOpenAlert, setError } = useOffsetStore();
  const panel = "APPROVAL";

  const { data, isLoading, refetch } = useQuery<OffsetResponse>({
    queryKey: ["approval_offset", { ...storedFilters }, { ...storedPage }],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await OffsetServices.getAllForApprovalOFF({ ...storedFilters, ...storedPage });
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: singleApprove } = useMutation({
    mutationFn: async (id: number) => {
      const formData = SingleDataOffset(singleItem);
      return OffsetServices.singleApproveOFF(id, formData);
    },
    onSuccess: () => {
      setOpenDialog("");
      queryClient.invalidateQueries({ queryKey: ["approval_offset"] });
      setOpenAlert("SuccessEndorse");
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

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
      <Header panel={panel} />
      <Filter panel={panel} refreshClick={handleRefresh} />

      <Table
        records={data && data.items}
        isLoading={isLoading}
        columns={[
          { accessor: "filing.documentNo", title: "Document No", sortable: true },
          { accessor: "branchId", title: "Branch Code", sortable: true },
          { accessor: "code", title: "Employee Code", sortable: true },
          { accessor: "name", title: "Employee Name", sortable: true },
          { accessor: "filing.shiftSchedule.name", title: "Schedule", sortable: true },
          { accessor: "filing.shiftSchedule.date", title: "Offset Date" },
          { accessor: "filing.shiftSchedule.timeIn", title: "Offset Hours" },
          {
            accessor: "filing.dateTransaction",
            title: "Transaction Date",
            render: (row: any) => DateTimeUtils.getIsoDateWord(row.filing.dateTransaction),
          },
          { accessor: "name", title: "Processed By" },
          {
            accessor: "filing.filingStatus.name",
            title: "Status",
            textAlign: "center",
            width: "150px",
            render: (row: any) => {
              const statusInfo = statusColors.find((item) => item.status === row.filing.filingStatus.name) || {
                status: "Unknown",
                color: "gray",
              };
              return (
                <div className="rounded-xl text-center p-1" style={{ background: statusInfo.color, color: "white" }}>
                  {row.filing.filingStatus.name}
                </div>
              );
            },
            sortable: true,
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
        panel={panel}
      />

      {data && <Pagination total={Math.ceil(data.total / data.pageSize)} pageSize={data.pageSize} recordsLength={data.total} currentPage={data.page} time={time} />}

      <Modals panel={panel} onHandleSingleApprove={() => singleApprove(viewItems.filing.id)} />
    </Container>
  );
}
