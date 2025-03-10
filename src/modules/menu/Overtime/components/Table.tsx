//--- Mantine Modules
import { DataTable, DataTableColumn } from "mantine-datatable";
//--- Own Modules
import { Footer } from "@shared/template";
//--- Shared Utils
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { FilingStatus } from "@shared/assets/types/Global";
//--- Data Store for Overtime
import { useOvertimeStore } from "@/modules/menu/Overtime/store/useOT";
import { useEffect, useState } from "react";

// Data Table Overtime Props
interface DTOTP {
  statuses: FilingStatus[];
  columns: DataTableColumn<{}>[];
  rowClick: () => void;
}
export default function Table({ statuses, columns, rowClick }: DTOTP) {
  const { items, pageSize, total, page, setSelectedData } = useOvertimeStore();
  const { activeTab } = useOvertimeStore();
  const records = items
    .filter((item) => statuses.includes(item.filing.filingStatus.name as FilingStatus))
    .map((item) => {
      const fromHours = item.filing.actual.dateFrom;
      const toHours = item.filing.actual.dateTo;

      const formattedFromHours = DateTimeUtils.getIsoTimeDefaultWithUnits(fromHours);
      const formattedToHours = DateTimeUtils.getIsoTimeDefaultWithUnits(toHours);
      return {
        documentNo: item.filing.documentNo,
        name: item.name,
        code: item.code,
        branchCode: "Branch 3",
        numberOfHours: `${formattedFromHours} - ${formattedToHours}`,
        dateFiled: DateTimeUtils.dayWithDate(item.filing.dateFiled),
        filingStatus: item.filing.filingStatus.name,
        reason: item.filing.reason,
        dateTransaction: DateTimeUtils.dayWithDate(item.filing.dateTransaction),
        actualFrom: item.filing.actual.dateFrom,
        actualTo: item.filing.actual.dateTo,
        requestedFrom: item.filing.requested.dateFrom,
        requestedTo: item.filing.requested.dateTo,
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
        onRowDoubleClick={() => {
          console.log("Clicked Double");
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

      <Footer onChange={() => {}} total={total} pageSize={pageSize} recordsLength={records.length} currentPage={page} />
    </>
  );
}
