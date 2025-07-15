/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { em, Flex, Group, Pagination, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMissedLogContext } from "../../context";
import { useMissedLogStore } from "../../store/main";

interface MissedLogPaginationI {
  total: number;
  pageSize: number;
  recordsLength: number;
  time: string;
  currentPage: number;
}

export default function index({ total, pageSize, recordsLength, time, currentPage }: MissedLogPaginationI) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { onHandleChangePage, onHandlePageSize } = useMissedLogContext();
  const { page } = useMissedLogStore();
  return (
    <Group justify={isMobile ? "center" : "space-between"} align="center">
      <Flex>
        <Text size="sm" className="text-gray-500">
          Showing{" "}
          <select
            className="w-[50px] h-[25px] text-xs border border-gray-300 rounded-md px-1"
            value={Math.min(currentPage * pageSize, recordsLength)}
            onChange={(e) => onHandlePageSize({ PageSize: e.target.value })}>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value={recordsLength}>All</option>
          </select>{" "}
          data out of {recordsLength} entries found in {time} seconds
        </Text>
      </Flex>
      <Pagination onChange={onHandleChangePage} total={total} size="sm" value={page} />
    </Group>
  );
}
