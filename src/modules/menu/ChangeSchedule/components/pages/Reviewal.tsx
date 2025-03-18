/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { useEffect, useState } from "react";
//--- Mantine Modules
import { DataTable } from "mantine-datatable";
import { Button, Dialog, Flex, Text } from "@mantine/core";
//--- TanStack
import { useQuery } from "@tanstack/react-query";
//--- Icon Modules
import { IconExclamationCircleFilled, IconFileText, IconFolderPlus } from "@tabler/icons-react";

//--- Main Layout
import Container from "@/layout/main/container";
import Header from "@/layout/main/container/header";
import Footer from "@/layout/main/container/footer";

//--- Context
import { useChangeOfSchedule } from "../../context";
//--- Store
import useCOS from "../../store";
import useReviewalCosStore from "../../store/reviewals";
//--- Service
import { CosServices } from "../../services/reviewal";
//--- Types
import { CosItems } from "../../assets/Types";
//--- Dialogs
import ViewDetails from "../dialog/ViewDetails";
import ReviewalRequest from "../dialog/ReviewalRequest";
import BatchCancel from "../dialog/BatchCancel";
//--- Alert
import Success from "../alert/Success";
import Cancelled from "../alert/Cancelled";
//--- Models
import { BatchData, SingleData } from "../../models/request";
import { ChangeSchedule } from "../../models/response";
//--- Filter
import Filter from "../filter/Filter";
import DrawerFilter from "../filter/DrawerFilter";

import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { statusColors } from "@shared/assets/types/Global";

export default function Reviewal() {
  const { filter, page, loading, setLoading, setOnViewDetails, cancelAlert, setCancelAlert, setEndorseAlert, endorseAlert, setViewItems, viewItems, setDrawerFilter } = useCOS();
  const { time, setTime, onBatchEndorse, setOnBatchEndorse, setOnBatchCancel, onBatchCancel } = useReviewalCosStore();
  const { activeTab, onHandleSubmitFilter, onHandleChangePage, onHandleClearFilter } = useChangeOfSchedule();

  const { data, isLoading, error, refetch } = useQuery<ChangeSchedule>({
    queryKey: ["reviewal_cos", filter, page],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await CosServices.getAllCosReviewal(filter, `&Page=${page}`);
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

  const onHandleSingleEndorse = async () => {
    const formData = SingleData(viewItems);
    try {
      const data = await CosServices.singleReviewCos(formData, viewItems.filing.id);
      if (data.filing.filingStatus.name === "Reviewed") {
        setOnViewDetails(false);
        setEndorseAlert(true);
        setLoading(true);
      }
    } catch {
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

  const onHandleBatchEndorse = async () => {
    const formData = BatchData(selectedRecords);
    try {
      const data = await CosServices.batchReviewCos(formData);
      console.log(data);
      setOnBatchEndorse(false);
      setEndorseAlert(true);
      if (endorseAlert === false) {
        setLoading(true);
      }
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
        popoverBtn={{
          label: "Batch Process",
          icon: <IconFolderPlus size={25} stroke={2} />,
          fOnClick: () => {
            selectedRecords.length >= 1 && setOnBatchEndorse(true);
          },
          sOnClick: () => {
            selectedRecords.length >= 1 && setOnBatchCancel(true);
          },
          innerLabel: "ENDORSE",
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
        panel="REVIEWAL"
        cancel={
          <Button variant="outline" className="rounded-md" onClick={onHandleSingleCancel}>
            REJECT
          </Button>
        }
        endorse={
          <Button className="border-none custom-gradient rounded-md" onClick={onHandleSingleEndorse}>
            ENDORSE
          </Button>
        }
      />

      <DrawerFilter isNotUser={true} onClear={onHandleClearFilter} onFilter={onHandleSubmitFilter} />
      <ReviewalRequest opened={onBatchEndorse} onClose={() => setOnBatchEndorse(false)} message={selectedRecords.length} onClick={onHandleBatchEndorse} />
      <BatchCancel opened={onBatchCancel} onClose={() => setOnBatchCancel(false)} message={selectedRecords.length} onClick={onHandleBatchCancel} />
      <Success opened={endorseAlert} onClose={() => setEndorseAlert(false)} message="The request has been successfully endorsed to the approver." title="Endorsement Success" />
      <Cancelled opened={cancelAlert} onClose={() => setCancelAlert(false)} />

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
