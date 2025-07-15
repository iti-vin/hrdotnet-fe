/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Data Table Modules
import { DataTable, DataTableColumn } from "mantine-datatable";

interface MissedLogTableI {
  columns: DataTableColumn<{}>[];
  records: any[] | undefined;
  isLoading?: boolean;
}

interface RowData {
  event: React.MouseEvent;
  index: number;
  record: any;
}

export default function index({ columns, records, isLoading }: MissedLogTableI) {
  return (
    <DataTable
      key="filing.filingStatus.name"
      idAccessor="filing.documentNo"
      records={records}
      columns={columns}
      fetching={isLoading}
      loaderSize="sm"
      loaderColor="blue"
      onRowClick={(data: RowData) => {
        // setViewItems(data.record);
        // setOpenDialog("ViewDetails");
        console.log(data);
      }}
    />
  );
}
