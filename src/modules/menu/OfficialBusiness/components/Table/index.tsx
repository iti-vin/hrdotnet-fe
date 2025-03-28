/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Data Table Modules
import { DataTable, DataTableColumn } from "mantine-datatable";
import { OfficialBusinessItems } from "../../models/response";
import { useOfficialBusinessStore } from "../../store";

interface MissedLogTableI {
  columns: DataTableColumn<{}>[];
  records: OfficialBusinessItems[] | undefined;
  isLoading?: boolean;
  panel?: "FILINGS" | "REQUEST" | "REVIEWAL" | "APPROVAL" | "LEDGER";
}

interface RowData {
  event: React.MouseEvent;
  index: number;
  record: OfficialBusinessItems;
}

export default function index({ columns, records, isLoading, panel }: MissedLogTableI) {
  const { setViewItems, setOpenDialog, selectedRecords, setSelectedRecords } = useOfficialBusinessStore();
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
      onRowClick={(data: RowData) => {
        setViewItems(data.record);
        setOpenDialog("ViewDetails");
      }}
    />
  );
}
