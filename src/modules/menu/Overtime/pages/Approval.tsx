/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Container from "@/layout/main/container";

import { Header, Filter, Table, Pagination, Modals } from "../components";

import { useMutation, useQuery } from "@tanstack/react-query";
import { OvertimeResponse } from "../models/response";
import { OvertimeServices } from "../services/api";
import { useEffect } from "react";
import { useOvertimeStore } from "../store";
import { statusColors } from "@shared/assets/types/Global";
import { IconFileText } from "@tabler/icons-react";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { SingleDataOvertime } from "../assets/Values";
import { queryClient } from "@/services/client";

export default function Approvals() {
  const panel = "APPROVAL";
  const { loading, setLoading, time, setTime, viewItems, singleItem, setError, setOpenDialog, setOpenAlert, storedFilters, storedPage } = useOvertimeStore();

  const { data, isLoading, refetch } = useQuery<OvertimeResponse>({
    queryKey: ["approval_overtime", { ...storedFilters }, { ...storedPage }],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await OvertimeServices.getAllForApprovalOT({ ...storedFilters, ...storedPage });
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: singleApprove } = useMutation({
    mutationFn: async (id: number) => {
      const formData = SingleDataOvertime(singleItem);
      console.log(formData);
      return OvertimeServices.singleApproveOT(id, formData);
    },
    onSuccess: () => {
      setOpenDialog("");
      queryClient.invalidateQueries({ queryKey: ["approval_overtime"] });
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
          { accessor: "filing.shiftSchedule.date", title: "Overtime Date" },
          { accessor: "filing.shiftSchedule.timeIn", title: "Overtime Hours" },
          {
            accessor: "filing.dateTransaction",
            title: "Transaction Date",
            render: (row: any) => DateTimeUtils.getIsoDateWord(row.filing.dateTransaction),
          },
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
