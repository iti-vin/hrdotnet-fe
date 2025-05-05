/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import { IconFileText } from "@tabler/icons-react";

import { statusColors } from "@shared/assets/types/Global";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";

import Container from "@/layout/main/container";

import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import Filter from "../components/Filter/Container";
import Modals from "../components/Modal";

import { OfficialBusinessResponse } from "../models/response";
import { OfficialBusinessServices } from "../services/api";
import { useOfficialBusinessStore } from "../store";
import { SingleDataOfficialBusiness } from "../assets/Values";
import { queryClient } from "@/services/client";

export default function Reviewal() {
  const { viewItems, setOpenDialog, setOpenAlert, setError, storedFilters, storedPage, setTime, time } =
    useOfficialBusinessStore();
  const panel = "REVIEWAL";

  const { data, isLoading } = useQuery<OfficialBusinessResponse>({
    queryKey: ["reviewal_officialbusiness", { ...storedFilters }, { ...storedPage }],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await OfficialBusinessServices.getAllForReviewalOB({ ...storedFilters, ...storedPage });
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: singleEndorse } = useMutation({
    mutationFn: async (id: number) => {
      const formData = SingleDataOfficialBusiness(viewItems);
      return OfficialBusinessServices.singleEndorseOB(id, formData);
    },
    onSuccess: () => {
      setOpenDialog("");
      queryClient.invalidateQueries({ queryKey: ["reviewal_officialbusiness"] });
      setOpenAlert("SuccessEndorse");
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });

  return (
    <Container>
      <Header panel={panel} />
      <Filter panel={panel} />

      <Table
        isLoading={isLoading}
        records={data && data.items}
        columns={[
          { accessor: "filing.documentNo", title: "Document No", sortable: true },
          { accessor: "branchId", title: "Branch Code", sortable: true },
          { accessor: "code", title: "Employee Code", sortable: true },
          { accessor: "name", title: "Employee Name", sortable: true },
          {
            accessor: "filing.dateRange.dateFrom",
            title: "OB From",
            render: (row: any) => DateTimeUtils.getIsoDateWord(row.filing.dateRange.dateFrom),
          },
          {
            accessor: "filing.dateRange.dateTo",
            title: "OB To",
            render: (row: any) => DateTimeUtils.getIsoDateWord(row.filing.dateRange.dateTo),
          },
          {
            accessor: "timerange",
            title: "OB Time",
            textAlign: "center",
            render: (row: any) => (
              <div>
                {DateTimeUtils.timeSecondsToUnits(row.filing.timeRange.timeIn)}-
                {DateTimeUtils.timeSecondsToUnits(row.filing.timeRange.timeOut)}
              </div>
            ),
          },
          { accessor: "filing.location.locationBranch", title: "Location", sortable: true },
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

      {data && (
        <Pagination
          total={Math.ceil(data.total / data.pageSize)}
          pageSize={data.pageSize}
          recordsLength={data.total}
          currentPage={data.page}
          time={time}
        />
      )}

      <Modals panel={panel} onHandleSingleEndorse={() => singleEndorse(viewItems.filing.id)} />
    </Container>
  );
}
