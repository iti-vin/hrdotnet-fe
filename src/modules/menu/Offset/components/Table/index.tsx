/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Data Table Modules
import { DataTable, DataTableColumn } from "mantine-datatable";
import { OffsetItems } from "../../models/response";
import { Panel } from "@shared/assets/types/Global";
import { useOffsetStore } from "../../store";

interface OvertimeI {
  columns: DataTableColumn<{}>[];
  records: OffsetItems[] | undefined;
  isLoading?: boolean;
  panel?: Panel;
}

interface RowData {
  event: React.MouseEvent;
  index: number;
  record: OffsetItems;
}

export default function index({ columns, records, isLoading, panel }: OvertimeI) {
  const { setOpenDialog, setViewItems, selectedRecords, setSelectedRecords } = useOffsetStore();
  return (
    <DataTable
      key="filing.filingStatus.name"
      idAccessor="filing.documentNo"
      records={records}
      columns={columns}
      {...(panel !== "REQUEST" && {
        selectedRecords,
        onSelectedRecordsChange: setSelectedRecords,
      })}
      fetching={isLoading}
      loaderSize="sm"
      loaderColor="blue"
      highlightOnHover
      onRowClick={(data: RowData) => {
        setViewItems(data.record);
        setOpenDialog("ViewDetails");
        console.log(data.record);
      }}
    />
  );
}
