//--- Mantine Modules
import { DataTable, DataTableColumn } from "mantine-datatable";
//--- Own Modules
import { Footer } from "@shared/template";
import { useOvertimeStore } from "@/modules/Overtime/store/useOT";
//--- Shared Utils
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { OTMainTypes } from "../../assets/types";

// Data Table Overtime Props
interface DTOTP {
  statuses: OTMainTypes["statusArray"];
  columns: DataTableColumn<{}>[];
  rowClick: () => void;
}
export default function Table({ statuses, columns, rowClick }: DTOTP) {
  const { items, pageSize, total, page, setSelectedData } = useOvertimeStore();

  const records = items
    .filter((item) =>
      statuses.includes(
        item.filing.filingStatus.name as OTMainTypes["statusList"]
      )
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
        actualFrom: item.filing.actual.dateFrom,
        actualTo: item.filing.actual.dateTo,
        requestedFrom: item.filing.requested.dateFrom,
        requestedTo: item.filing.requested.dateTo,
        sched: "8:00 AM - 6:00 PM",
      };
    });

  return (
    <>
      <DataTable
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
