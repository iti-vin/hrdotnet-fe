import { DataTable, DataTableColumn, DataTableRowClickHandler } from "mantine-datatable";
import { LeaveItems } from "../../assets/Types";
import useLeaveStore from "../../store/LeaveStore";
import { useLeave } from "../../context";
import { useEffect } from "react";

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
    <DataTable
      key="filing.filingStatus.name"
      idAccessor="filing.documentNo"
      records={records}
      columns={columns}
      {...(activeTab !== 0 && {
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
