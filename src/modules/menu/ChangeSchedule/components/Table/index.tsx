/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Data Table Modules
import { DataTableColumn } from "mantine-datatable";
import { Panel } from "@shared/assets/types/Global";

import { CosItems } from "../../models/response";
import { useChangeOfScheduleStore } from "../../store";
import { DataTable } from "@shared/components/table";

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
    <DataTable<CosItems>
      key="filing.filingStatus.name"
      idAccessor="code"
      records={records}
      columns={columns}
      {...(panel !== "REQUEST" && {
        selectedRecords,
        onSelectedRecordsChange: setSelectedRecords,
      })}
      isLoading={isLoading}
      onRowClick={(data: RowData) => {
        setViewItems(data.record);
        setOpenDialog("ViewDetails");
      }}
    />
  );
}
