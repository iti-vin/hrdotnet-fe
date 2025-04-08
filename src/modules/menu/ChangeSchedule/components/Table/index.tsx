/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Data Table Modules
import { DataTable, DataTableColumn } from "mantine-datatable";
import { Panel } from "@shared/assets/types/Global";

import { CosItems } from "../../models/response";
import { useChangeOfScheduleStore } from "../../store";

interface COSI {
  columns: DataTableColumn<{}>[];
  records: CosItems[] | undefined;
  isLoading?: boolean;
  panel?: Panel;
}

interface RowData {
  event: React.MouseEvent;
  index: number;
  record: CosItems;
}

export default function index({ columns, records, isLoading, panel }: COSI) {
  const { selectedRecords, setViewItems, setOpenDialog, setSelectedRecords } = useChangeOfScheduleStore();
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
      }}
    />
  );
}
