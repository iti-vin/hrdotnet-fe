/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IconFileText } from "@tabler/icons-react";

//--- Shared Modules
import { statusColors } from "@shared/assets/types/Global";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";

//--- Layout
import Container from "@/layout/main/container";
//--- Missed Log Container Contents
import Header from "../components/Header";
import Filter from "../components/Filter/Container";
import Table from "../components/Table";
import Footer from "../components/Pagination";
import Modals from "../components/Modal";

import { useMissedLogStore } from "../store/main";

import { MissedLogResponse } from "../models/response";

import { MissedLogServices } from "../services";
import { Button } from "@mantine/core";
import { queryClient } from "@/services/client";
import { ApproveEndorseMissedLog } from "../assets/Values";

export default function index() {
  const { loading, setLoading, time, setTime, viewItems, setOpenAlert, setError, storedPage, storedFilters } = useMissedLogStore();
  const panel = "REVIEWAL";

  // displaying datatable for reviewals off missed logs
  const { data, isLoading, refetch } = useQuery<MissedLogResponse>({
    queryKey: ["reviewal_missedlog", storedFilters, storedPage],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await MissedLogServices.getAllForReviewalML({ ...storedPage, ...storedFilters });
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  // missed log request single review
  const { mutate: singleEndorse } = useMutation({
    mutationFn: async (id: number) => {
      const formData = ApproveEndorseMissedLog(viewItems);
      return MissedLogServices.singleEndorseMissedLog(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewal_missedlog"] });
      queryClient.invalidateQueries({ queryKey: ["approval_missedlog"] });
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
          { accessor: "filing.documentNo", title: "Document No." },
          { accessor: "branchId", title: "Branch Code" },
          { accessor: "code", title: "Employee Code" },
          { accessor: "name", title: "Employee Name" },
          { accessor: "filing.dateFiled", textAlign: "center", title: "Missed Log Date", render: (row: any) => DateTimeUtils.getIsoDateWord(row.filing.dateFiled) },
          { accessor: "filing.logType.name", title: "Log Type" },
          { accessor: "filing.timeInOut", title: "Log Time" },
          {
            accessor: "filing.dateTransaction",
            textAlign: "center",
            title: "Transaction Date",
            render: (row: any) => DateTimeUtils.getIsoDateWord(row.filing.dateTransaction),
          },
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
            accessor: "",
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

      {data && <Footer total={Math.ceil(data.total / data.pageSize)} pageSize={data.pageSize} recordsLength={data.total} currentPage={data.page} time={time} />}
      <Modals
        panel={panel}
        endorse={
          <Button className="border-none custom-gradient rounded-md" onClick={() => singleEndorse(viewItems.filing.id)}>
            ENDORSE
          </Button>
        }
      />
    </Container>
  );
}
