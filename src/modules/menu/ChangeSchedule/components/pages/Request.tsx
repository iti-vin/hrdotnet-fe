/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { useEffect } from "react";
//--- Mantine Module
import { DataTable } from "mantine-datatable";
import { Dialog, Flex, Text } from "@mantine/core";
//--- Tanstack
import { useQuery } from "@tanstack/react-query";
//--- Icon Modules
import { IconExclamationCircleFilled, IconFileText } from "@tabler/icons-react";

//--- Main Layout
import Container from "@/layout/main/container";
import Header from "@/layout/main/container/header";
import Footer from "@/layout/main/container/footer";

//--- Context
import { useChangeOfSchedule } from "../../context";
//--- Store
import useCOS from "../../store";
import useRequestCosStore from "../../store/request";
//--- Services
import CosServices from "../../services/main";
//--- Dialogs
import ViewDetails from "../dialog/ViewDetails";
import EditRequest from "../dialog/EditRequest";
import NewRequest from "../dialog/NewRequest";
import CancelRequest from "../dialog/CancelRequest";
//--- Alerts
import Success from "../alert/Success";
import Cancelled from "../alert/Cancelled";
//--- Models
import { ChangeSchedule } from "../../models/response";
//--- Filter
import Filter from "../filter/Filter";
import DrawerFilter from "../filter/DrawerFilter";

import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { statusColors } from "@shared/assets/types/Global";

export default function Request() {
  const { filter, page, loading, setLoading, setOnViewDetails, setDrawerFilter, setViewItems } = useCOS();
  const { setOnNewRequest, time, setTime, createAlert, setCreateAlert, cancelAlert, setCancelAlert, updateAlert, setUpdateAlert } = useRequestCosStore();

  const { activeTab, onHandleSubmitFilter, onHandleClearFilter, onHandleChangePage } = useChangeOfSchedule();

  const { data, isLoading, error, refetch } = useQuery<ChangeSchedule>({
    queryKey: ["request_cos", filter, page],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await CosServices.getAllCosMe(filter, `&Page=${page}`);
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
  }, [loading, activeTab]);

  return (
    <Container>
      {/* Filter */}
      <DrawerFilter onClear={onHandleClearFilter} onFilter={onHandleSubmitFilter} />

      {/* Modals */}
      <ViewDetails panel="REQUEST" />
      <EditRequest />
      <NewRequest />
      <CancelRequest />

      {/* Alerts */}
      <Cancelled opened={cancelAlert} onClose={() => setCancelAlert(false)} />
      <Success opened={createAlert} onClose={() => setCreateAlert(false)} message="The application has been successfully submitted!" title="Request Submitted" />
      <Success opened={updateAlert} onClose={() => setUpdateAlert(false)} message="The application has been successfully updated!" title="Request Updated" />

      {/* Container */}
      <Header title="Change of Schedule" normalBtn={{ label: "New Request", onClick: () => setOnNewRequest(true) }} />
      <Filter filterOpen={() => setDrawerFilter(true)} clearFilter={onHandleClearFilter} />
      <DataTable
        key="filing.filingStatus.name"
        idAccessor="filing.documentNo"
        records={data && data.items}
        fetching={isLoading}
        loaderSize="sm"
        loaderColor="blue"
        minHeight={200}
        onRowClick={(data) => {
          setViewItems(data.record);
          setOnViewDetails(true);
        }}
        columns={[
          { accessor: "filing.documentNo", title: "Document No" },
          {
            accessor: "filing.dateFiled.dateFrom",
            title: "COS From",
            render: (row) => DateTimeUtils.getIsoDateWithBackSlash(row.filing.dateFiled.dateFrom),
          },
          { accessor: "filing.dateFiled.dateTo", title: "COS To", render: (row) => DateTimeUtils.getIsoDateWithBackSlash(row.filing.dateFiled.dateTo) },
          { accessor: "filing.requested.name", title: "Requested Schedule" },
          {
            accessor: "dateTransaction",
            title: "Transaction Date",
            render: (row) => DateTimeUtils.getIsoDateWithBackSlash(row.dateTransaction),
          },
          { accessor: "name", title: "Processed By" },
          {
            accessor: "filing.filingStatus.name",
            title: "Status",
            render: (row) => {
              const statusInfo = statusColors.find((item) => item.status === row.filing.filingStatus.name) || { status: "Unknown", color: "gray" };
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
        striped={true}
        highlightOnHover={true}
        withTableBorder={true}
      />

      {data && (
        <Footer
          onChange={onHandleChangePage}
          value={page}
          total={Math.ceil(data.total / data.pageSize)}
          pageSize={data.pageSize}
          recordsLength={data.total}
          currentPage={data.page}
          time={time}
        />
      )}

      <Dialog position={{ bottom: 20, right: 20 }} className="bg-white shadow-2xl shadow-blue-500 w-auto rounded-lg poppins" opened={!!error} withCloseButton>
        {error && (
          <Flex className="flex flex-row gap-2">
            <IconExclamationCircleFilled color="red" />
            <Text>Error: {(error as any).message}</Text>
          </Flex>
        )}
      </Dialog>
    </Container>
  );
}
