/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Flex, Stack, Text } from "@mantine/core";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Filter from "./components/FilterContainer";

export default function index() {
  return (
    <Stack className="h-full m-4">
      <Stack className="bg-white mb-4 w-full h-full p-8 rounded-lg select-none">
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify={{ base: "center", sm: "space-between" }}
          align={{ base: "center", sm: "space-between" }}
          className="w-full">
          <Text className="text-xl font-semibold text-[#559CDA]" fz={22}>
            Attendance
          </Text>
        </Flex>
        <Filter />
        <Table
          records={[]}
          isLoading={false}
          columns={[
            { accessor: "", title: "Log Date", sortable: true },
            { accessor: "", title: "Shift Schedule", sortable: true },
            { accessor: "", title: "Log Hours" },
            { accessor: "", title: "Hours Worked" },
            { accessor: "", title: "Regular Hours" },
            { accessor: "", title: "ND(hrs)" },
            { accessor: "", title: "OT(hrs)" },
            { accessor: "", title: "NDOT(hrs)" },
            { accessor: "", title: "Undertime(hrs)" },
          ]}
        />

        <Pagination total={10} pageSize={10} recordsLength={10} currentPage={10} time={"0.349"} />
      </Stack>
    </Stack>
  );
}
