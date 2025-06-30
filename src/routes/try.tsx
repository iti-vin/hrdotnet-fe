import { cosQueryKeys } from "@/modules/menu/ChangeSchedule/assets/query";
import { Filter, Header, Pagination, Table } from "@/modules/menu/ChangeSchedule/components";
import { ChangeSchedule } from "@/modules/menu/ChangeSchedule/models/response";
import { CosServices } from "@/modules/menu/ChangeSchedule/services/api";
import { useChangeOfScheduleStore } from "@/modules/menu/ChangeSchedule/store";
import { Stack } from "@mantine/core";
import { statusColors } from "@shared/assets/types/Global";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { IconFileText } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "mantine-datatable";
import { NavLink } from "react-router-dom";

const cosTabs = [
  { index: 0, path: "request", label: "My Request" },
  { index: 1, path: "reviewal", label: "For Review" },
  { index: 2, path: "approval", label: "For Approval" },
  { index: 3, path: "filings", label: "Employee Filings" },
];

export default function Sample() {
  const panel = "REQUEST";
  const { loading, setLoading, time, setTime, storedFilters, storedPage } = useChangeOfScheduleStore();

  const { data, isLoading, refetch } = useQuery<ChangeSchedule>({
    queryKey: cosQueryKeys.request({ ...storedFilters }, { ...storedPage }),
    queryFn: async () => {
      const startTime = performance.now();
      const result = await CosServices.getAllMyCOS({ ...storedFilters, ...storedPage });
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });
  return (
    <Stack className="h-full">
      <title>Sample Hersvin</title>
      <div className="w-full flex bg-[#559CDA] gap-1 py-2 px-4">
        {cosTabs.map((item) => (
          <NavLink key={item.index} to={item.path} className={({ isActive }) => (isActive ? "active" : "inactive")}>
            {item.label}
          </NavLink>
        ))}
      </div>
      <Stack className="h-full bg-white mx-4 mb-3 p-8 rounded-lg select-none overflow-hidden">
        <Header panel={panel} />
        <Filter panel={panel} />
        <DataTable
          key="filing.filingStatus.name"
          idAccessor="filing.documentNo"
          records={data && data.items}
          columns={[
            { accessor: "filing.documentNo", title: "Document No" },
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
          fetching={isLoading}
          loaderSize="sm"
          loaderColor="blue"
          highlightOnHover
        />
        {data && <Pagination total={Math.ceil(data.total / data.pageSize)} pageSize={data.pageSize} recordsLength={data.total} currentPage={data.page} time={time} />}
      </Stack>
    </Stack>
  );
}
