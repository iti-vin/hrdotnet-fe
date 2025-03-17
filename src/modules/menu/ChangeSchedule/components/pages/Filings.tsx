/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { useState, useEffect } from "react";
//--- Mantine Modules
import { Button } from "@mantine/core";
import { DataTable } from "mantine-datatable";
//--- Tanstack
import { useQuery } from "@tanstack/react-query";
//--- Icon Modules
import { IconFileDiff, IconFileText } from "@tabler/icons-react";

//--- Main Layout
import Container from "@/layout/main/container";
import Header from "@/layout/main/container/header";
import Footer from "@/layout/main/container/footer";

//--- Context
import { useChangeOfSchedule } from "../../context";
//--- Store
import useCOS from "../../store";
import useFilingCosStore from "../../store/filings";
//--- Services
import { CosServices } from "../../services/approval";
//--- Types
import { CosItems } from "../../assets/Types";
//--- Dialogs
import NewFilings from "../dialog/NewFilings";
import BatchCancel from "../dialog/BatchCancel";
import ViewDetails from "../dialog/ViewDetails";
import BatchApproval from "../dialog/ApprovalRequest";
//--- Alerts
import Success from "../alert/Success";
import Cancelled from "../alert/Cancelled";
//--- Models
import { ChangeSchedule } from "../../models/response";
import { BatchData, SingleData } from "../../models/request";
//--- Filter
import Filter from "../filter/Filter";
import DrawerFilter from "../filter/DrawerFilter";

import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { statusColors } from "@shared/assets/types/Global";

export default function Filings() {
  const { filter, loading, setLoading, viewItems, setViewItems, approveAlert, setApproveAlert, cancelAlert, setCancelAlert, setOnViewDetails, setOnNewFiling, setDrawerFilter } =
    useCOS();
  const { time, setTime, page, onBatchApprove, setOnBatchApprove, onBatchCancel, setOnBatchCancel } = useFilingCosStore();
  const { activeTab, onHandleSubmitFilter, onHandleClearFilter, onHandleChangePage } = useChangeOfSchedule();

  const { data, isLoading, error, refetch } = useQuery<ChangeSchedule>({
    queryKey: ["filing_cos", filter, page],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await CosServices.getAllCosApproval(filter, `&Page=${page}`);
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
  }, [activeTab, loading]);

  const onHandleSingleApprove = async () => {
    const formData = SingleData(viewItems);
    try {
      const data = await CosServices.singleApprovalCos(formData, viewItems.filing.id);
      if (data.filing.filingStatus.name === "Approved") {
        setOnViewDetails(false);
        setApproveAlert(true);
        setLoading(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Done");
    }
  };

  const onHandleSingleCancel = async () => {
    const formData = SingleData(viewItems);
    try {
      const data = await CosServices.singleCancelCos(formData, viewItems.filing.id);
      if (data.filing.filingStatus.name === "Cancelled") {
        setOnViewDetails(false);
        setCancelAlert(true);
        setLoading(true);
      }
    } catch {
      console.error(error);
    } finally {
      console.log("Done");
    }
  };

  const [selectedRecords, setSelectedRecords] = useState<CosItems[]>([]);
  const onHandleBatchApprove = async () => {
    const formData = BatchData(selectedRecords);
    try {
      const data = await CosServices.batchApprovalCos(formData);
      console.log(data);
      setOnBatchApprove(false);
      setApproveAlert(true);
      setLoading(true);
    } catch (err) {
      console.error(err);
    } finally {
      console.log();
    }

    setSelectedRecords([]);
  };

  const onHandleBatchCancel = async () => {
    const formData = BatchData(selectedRecords);
    try {
      const data = await CosServices.batchCancelCos(formData);
      console.log(data);
      setOnBatchCancel(false);
      setCancelAlert(true);
      setLoading(true);
    } catch (err) {
      console.error(err);
    } finally {
      console.log();
    }

    setSelectedRecords([]);
  };
  return (
    <Container>
      <Header
        title="Change of Schedule"
        normalBtn={{ label: "New Filing", onClick: () => setOnNewFiling(true) }}
        popoverBtn={{
          label: "Batch Process",
          icon: <IconFileDiff size={25} stroke={2} />,
          fOnClick: () => {
            selectedRecords.length >= 1 && setOnBatchApprove(true);
          },
          sOnClick: () => {
            selectedRecords.length >= 1 && setOnBatchCancel(true);
          },
          innerLabel: "APPROVE",
        }}
      />
      <Filter filterOpen={() => setDrawerFilter(true)} />
      <DataTable
        key="filing.filingStatus.name"
        idAccessor="filing.documentNo"
        records={data && data.items}
        fetching={isLoading}
        loaderSize="sm"
        loaderColor="blue"
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        onRowClick={(data) => {
          setViewItems(data.record);
          setOnViewDetails(true);
        }}
        columns={[
          { accessor: "filing.documentNo", title: "Document No" },
          { accessor: "branchId", title: "Branch Code" },
          { accessor: "code", title: "Employee Code" },
          { accessor: "name", title: "Employee Name" },
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
          {
            accessor: "filing.filingStatus.name",
            title: "Status",
            width: 150,
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
      <ViewDetails
        panel="FILINGS"
        cancel={
          <Button variant="outline" className="rounded-md" onClick={onHandleSingleCancel}>
            REJECT
          </Button>
        }
        approve={
          <Button className="border-none custom-gradient rounded-md" onClick={onHandleSingleApprove}>
            APPROVE
          </Button>
        }
      />
      <DrawerFilter isNotUser={true} onFilter={onHandleSubmitFilter} onClear={onHandleClearFilter} />
      <NewFilings />
      <BatchApproval opened={onBatchApprove} onClose={() => setOnBatchApprove(false)} message={selectedRecords.length} onClick={onHandleBatchApprove} />
      <BatchCancel opened={onBatchCancel} onClose={() => setOnBatchCancel(false)} message={selectedRecords.length} onClick={onHandleBatchCancel} />
      <Success opened={approveAlert} onClose={() => setApproveAlert(false)} message="The request has been successfully approved." title="Request Approved" />
      <Cancelled opened={cancelAlert} onClose={() => setCancelAlert(false)} />
    </Container>
  );
}
