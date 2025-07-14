/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Data Table Modules
import { DataTableColumn } from "mantine-datatable";
import { OffsetItems } from "../../models/response";
import { Panel } from "@shared/assets/types/Global";
import { useOffsetStore } from "../../store";
import { DataTable } from "@shared/components";

interface OffsetI {
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

export default function index({ columns, records, isLoading, panel }: OffsetI) {
  const { setOpenDialog, setViewItems, selectedRecords, setSelectedRecords } = useOffsetStore();
  return (
    <DataTable<OffsetItems>
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
        console.log(data.record);
      }}
    />
  );
}
