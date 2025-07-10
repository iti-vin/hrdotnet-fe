/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Data Table Modules
import { DataTableColumn } from "mantine-datatable";
import { Panel } from "@shared/assets/types/Global";
import { useCTOStore } from "../../store";
import { DataTable } from "@shared/components";

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
    <DataTable<any>
      key="filing.filingStatus.name"
      idAccessor={"sda"}
      records={records}
      columns={columns}
      // {...(panel !== "REQUEST" && {
      //   selectable: true,
      //   selectedRecords,
      //   onSelectedRecordsChange: setSelectedRecords,
      // })}
      isLoading={isLoading}
      onRowClick={(data: RowData) => {
        setOpenDialog("ViewDetails");
        console.log(data.record);
      }}
    />
  );
}
