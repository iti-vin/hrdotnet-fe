import { FilingStatus } from "@shared/assets/types/Global";
import { Footer } from "@shared/template";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useML } from "../../store/useMissedLog";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { useState } from "react";

interface DTMLP {
  statuses: FilingStatus[];
  columns: DataTableColumn<{}>[];
  rowClick: () => void;
}

export default function Table({ statuses, columns, rowClick }: DTMLP) {
  const { items, pageSize, total, page, setSelectedData, activeTab } = useML();

  const records = items
    .filter((item: any) =>
      statuses.includes(item.filing.filingStatus.name as FilingStatus)
    )
    .map((item: any) => {
      return {
        documentNo: item.filing.documentNo,
        name: item.name,
        code: item.code,
        branchCode: "Branch 3",
        logTime: item.filing.timeInOut,
        logType: item.filing.logType.name,
        dateFiled: DateTimeUtils.dayWithDate(item.filing.dateFiled),
        filingStatus: item.filing.filingStatus.name,
        reason: item.filing.reason,
        dateTransaction: DateTimeUtils.dayWithDate(item.filing.dateTransaction),
        sched: "Next Day",
      };
    });

  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
  return (
    <>
      <DataTable
        {...(activeTab !== "list" && {
          selectedRecords: selectedRecords,
          onSelectedRecordsChange: setSelectedRecords,
        })}
        columns={columns}
        idAccessor="documentNo"
        key="documentNo"
        records={records}
        striped={true}
        highlightOnHover={true}
        withTableBorder={true}
        className="select-none"
        onRowClick={(data) => {
          setSelectedData(data.record);
          rowClick();
        }}
        styles={{
          header: {
            color: "rgba(109, 109, 109, 0.6)",
            fontWeight: 500,
          },
          root: {
            color: "rgba(0, 0, 0, 0.6)",
          },
        }}
      />

      <Footer
        onChange={() => {}}
        total={total}
        pageSize={pageSize}
        recordsLength={records.length}
        currentPage={page}
      />
    </>
  );
}
