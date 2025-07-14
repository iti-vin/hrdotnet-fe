/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Data Table Modules
import { DataTableColumn } from "mantine-datatable";
import { OvertimeItems } from "../../models/response";
import { Panel } from "@shared/assets/types/Global";
import { useOvertimeStore } from "../../store";
import { DataTable } from "@shared/components";

interface OvertimeI {
  columns: DataTableColumn<{}>[];
  records: OvertimeItems[] | undefined;
  isLoading?: boolean;
  panel?: Panel;
}

interface RowData {
  event: React.MouseEvent;
  index: number;
  record: OvertimeItems;
}

export default function index({ columns, records, isLoading, panel }: OvertimeI) {
  const { setViewItems, setOpenDialog, selectedRecords, setSelectedRecords } = useOvertimeStore();
  return (
    <DataTable<OvertimeItems>
      key="filing.filingStatus.name"
      idAccessor={"filing.id"}
      records={records}
      columns={columns}
      {...(panel !== "REQUEST" && {
        selectable: true,
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
