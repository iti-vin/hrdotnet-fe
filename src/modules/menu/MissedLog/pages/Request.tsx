/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IconFileText } from "@tabler/icons-react";

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

import { MissedLogResponse } from "../models/response";

import { MissedLogServices } from "../services";

import { useMissedLogStore } from "../store/main";

export default function index() {
  const { loading, setLoading, time, setTime, storedPage, storedFilters } = useMissedLogStore();
  const panel = "REQUEST";

  const { data, isLoading, refetch } = useQuery<MissedLogResponse>({
    queryKey: ["request_missedlog", storedFilters, storedPage],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await MissedLogServices.getAllMyMissedLog({ ...storedPage, ...storedFilters });
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
      <Header panel={panel} />
      <Filter panel={panel} />
      <Table
        records={data && data.items}
        isLoading={isLoading}
        columns={[
          { accessor: "filing.documentNo", title: "Document No." },
          { accessor: "filing.dateFiled", textAlign: "center", title: "Missed Log Date", render: (row: any) => DateTimeUtils.getIsoDateWord(row.filing.dateFiled) },
          { accessor: "filing.logType.name", title: "Log Type" },
          { accessor: "filing.timeInOut", title: "Log Time" },
          {
            accessor: "filing.dateTransaction",
            textAlign: "center",
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
      <Modals panel={panel} />
    </Container>
  );
}
