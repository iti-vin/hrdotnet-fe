/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IconFileText } from "@tabler/icons-react";

//--- Shared Modules
import Container from "@/layout/main/container";
import { statusColors } from "@shared/assets/types/Global";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";

import { Header, Filter, Table, Pagination, Modals } from "../components";
import { OffsetServices } from "../services/api";
import { OffsetResponse } from "../models/response";
import { useOffsetStore } from "../store";

export default function Request() {
  const { time, setTime, loading, setLoading } = useOffsetStore();
  const panel = "REQUEST";

  const { data, isLoading, refetch } = useQuery<OffsetResponse>({
    queryKey: ["request_offset"],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await OffsetServices.getAllMyOFF({});
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
          { accessor: "filing.documentNo", title: "Document No", sortable: true },
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
            sortable: true,
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

      {data && (
        <Pagination
          total={Math.ceil(data.total / data.pageSize)}
          pageSize={data.pageSize}
          recordsLength={data.total}
          currentPage={data.page}
          time={time}
        />
      )}

      <Modals panel={panel} />
    </Container>
  );
}
