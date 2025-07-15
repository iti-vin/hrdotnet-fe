/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { DataTable as MantineDataTable, DataTableColumn } from "mantine-datatable";
import "./index.css";
import { cn } from "@/lib/utils";

interface GenericTableProps<T> {
  columns: DataTableColumn<T>[];
  records: T[] | undefined;
  isLoading?: boolean;
  panel?: string;
  idAccessor?: keyof T | (string & {}) | ((record: T) => React.Key) | undefined;
  onRowClick?: (record: { event: React.MouseEvent; record: T; index: number }) => void;
  selectable?: boolean;
  selectedRecords?: T[];
  onSelectedRecordsChange?: (records: T[]) => void;

  rootClassName?: string;
  tableClassName?: string;
  headerClassName?: string;
}

export function DataTable<T>({
  columns,
  records = [],
  isLoading = false,
  panel,
  idAccessor,
  onRowClick,
  selectable = false,
  selectedRecords = [],
  onSelectedRecordsChange,
  rootClassName,
  tableClassName,
  headerClassName,
}: GenericTableProps<T>) {
  return (
    <MantineDataTable<T>
      classNames={{ root: cn(rootClassName), table: cn(tableClassName), header: cn(headerClassName) }}
      styles={{}}
      records={records}
      columns={columns}
      fetching={isLoading}
      idAccessor={idAccessor}
      loaderSize="sm"
      loaderColor="blue"
      highlightOnHover
      rowStyle={() => ({ cursor: onRowClick ? "pointer" : "default" })}
      onRowClick={(data) => onRowClick?.(data)}
      {...(panel !== "REQUEST" &&
        selectable && {
          selectedRecords,
          onSelectedRecordsChange,
        })}
    />
  );
}
