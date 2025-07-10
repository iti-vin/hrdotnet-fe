import { DataTableColumn, DataTableRowClickHandler } from "mantine-datatable";
import { LeaveItems } from "../../assets/Types";
import useLeaveStore from "../../store/LeaveStore";
import { useLeave } from "../../context";
import { useEffect } from "react";
import { DataTable } from "@shared/components";

interface DataTableProps {
  columns: DataTableColumn<{}>[];
  records: LeaveItems[] | undefined;
  isLoading?: boolean;
  rowClick?: DataTableRowClickHandler<{}>;
}

interface RowData {
  event: React.MouseEvent;
  index: number;
  record: LeaveItems;
}

export default function index({ columns, records, isLoading }: DataTableProps) {
  const { setOpenDialog, setViewItems, selectedRecords, setSelectedRecords } = useLeaveStore();
  const { activeTab } = useLeave();

  useEffect(() => {}, [activeTab]);

  return (
    <DataTable<LeaveItems>
      key="filing.filingStatus.name"
      idAccessor={"code"}
      records={records}
      columns={columns}
      {...(activeTab !== 0 && {
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
