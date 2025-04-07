export interface PaginationI {
  total: number;
  pageSize: number;
  recordsLength: number;
  time: string;
  currentPage: number;
}

export interface HeaderButtonProps {
  normalBtn: { label: string; icon?: React.ReactNode; onClick: () => void };
  popoverBtn: { label: string; icon: React.ReactNode; innerLabel?: string; fOnClick: () => void; sOnClick: () => void };
}
