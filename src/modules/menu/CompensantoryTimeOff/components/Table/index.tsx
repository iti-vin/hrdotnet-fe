/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Data Table Modules
import { DataTable, DataTableColumn } from "mantine-datatable";
import { Panel } from "@shared/assets/types/Global";
import { useCTOStore } from "../../store";

interface CTOI {
  columns: DataTableColumn<{}>[];
  records: any[] | undefined;
  isLoading?: boolean;
  panel?: Panel;
}

interface RowData {
  event: React.MouseEvent;
  index: number;
  record: any;
}

export default function index({ columns, records, isLoading }: CTOI) {
  const { setOpenDialog } = useCTOStore();
  return (
    <DataTable
      key="filing.filingStatus.name"
      idAccessor="filing.documentNo"
      records={records}
      columns={columns}
      // {...(panel !== "REQUEST" && {
      //   selectedRecords,
      //   onSelectedRecordsChange: setSelectedRecords,
      // })}
      fetching={isLoading}
      loaderSize="sm"
      loaderColor="blue"
      highlightOnHover
      onRowClick={(data: RowData) => {
        // setViewItems(data.record);
        setOpenDialog("ViewDetails");
        console.log(data.record);
      }}
    />
  );
}
