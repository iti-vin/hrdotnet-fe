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
  idAccessor: keyof T | ((record: T) => string | number);
  onRowClick?: (record: { event: React.MouseEvent; record: T; index: number }) => void;
  selectable?: boolean;
  selectedRecords?: T[];
  onSelectedRecordsChange?: (records: T[]) => void;

  rootClassName?: string;
  tableClassName?: string;
  headerClassName?: string;

  page?: number;
  onPageChange?: (page: number) => void;
  totalRecords?: number;
  recordsPerPage?: number;
  paginationText?: (params: { from: number; to: number; totalRecords: number }) => React.ReactNode;
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
  page,
  onPageChange,
  totalRecords,
  recordsPerPage,
  paginationText,
}: GenericTableProps<T>) {
  return (
    <MantineDataTable<T>
      classNames={{ root: cn(rootClassName), table: cn(tableClassName), header: cn(headerClassName) }}
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
      page={page!}
      onPageChange={onPageChange!}
      totalRecords={totalRecords!}
      recordsPerPage={recordsPerPage!}
      paginationText={paginationText!}
      styles={{
        header: {
          color: "rgba(109, 109, 109, 0.6)",
          fontWeight: 500,
        },
        root: {
          color: "rgba(0, 0, 0, 0.6)",
        },
      }}
    />
  );
}
