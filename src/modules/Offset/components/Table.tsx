/**
 * @version    HRDotNet(v.2.0.0)
 * @file       Table Components for Offset
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { DataTable, DataTableColumn } from "mantine-datatable";
//--- Shared Template for Table Container
import { Footer } from "@shared/template";
//--- Shared Utils for Date Formatting
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { FilingStatus } from "@shared/assets/types/Global";
//--- Data Store for Offset
import useOffsetStore from "@/modules/Offset/store/useOff";

// Data Table Offset Props
interface DTOFFP {
  statuses: FilingStatus[];
  columns: DataTableColumn<{}>[];
  rowClick?: () => void;
}

export default function Table({ statuses, columns, rowClick }: DTOFFP) {
  const { items, total, pageSize, page } = useOffsetStore();

  const records = items
    .filter((item) =>
      statuses.includes(item.filing.filingStatus.name as FilingStatus)
    )
    .map((item) => {
      const fromHours = item.filing.actual.dateFrom;
      const toHours = item.filing.actual.dateTo;

      const formattedFromHours =
        DateTimeUtils.getIsoTimeDefaultWithUnits(fromHours);
      const formattedToHours =
        DateTimeUtils.getIsoTimeDefaultWithUnits(toHours);
      return {
        documentNo: item.filing.documentNo,
        name: item.name,
        code: item.code,
        branchCode: item.branchId,
        numberOfHours: `${formattedFromHours} - ${formattedToHours}`,
        dateFiled: DateTimeUtils.dayWithFullDate(item.filing.dateFiled),
        filingStatus: item.filing.filingStatus.name,
        reason: item.filing.reason,
        dateTransaction: DateTimeUtils.dayWithFullDate(
          item.filing.dateTransaction
        ),
      };
    });

  return (
    <>
      <DataTable
        columns={columns}
        idAccessor="documentNo"
        records={records}
        striped={true}
        highlightOnHover={true}
        withTableBorder={true}
        className="select-none"
        onRowClick={rowClick}
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
