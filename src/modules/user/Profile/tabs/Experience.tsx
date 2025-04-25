/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Divider, Flex, ScrollArea, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import experience from "../assets/profile.module.css";
import { DataTable } from "mantine-datatable";
import { useProfileStore } from "../store";

export default function Experience() {
  const { setOpenModal } = useProfileStore();
  const matches = useMediaQuery("(min-width: 480px)");
  return (
    <Stack className="h-full overflow-hidden w-full">
      <ScrollArea className="h-full w-full">
        <Stack className="pt-2">
          <Flex className={experience.header}>
            <Text fw={600} fz={matches ? 18 : 14}>
              Educational Attainment
            </Text>
            <IconEdit size={matches ? 25 : 18} onClick={() => setOpenModal("Educational")} className="cursor-pointer" />
          </Flex>
          <Divider />
          <DataTable
            records={[]}
            fetching={false}
            classNames={{ header: "bg-gray-200", root: "rounded-md", table: "bg-gray-200" }}
            className="w-full"
            columns={[
              { accessor: "course", title: "Course" },
              { accessor: "school", title: "School" },
              { accessor: "address", title: "Address" },
              { accessor: "attainment", title: "Attainment" },
              { accessor: "status", title: "Attainment Status" },
              { accessor: "yearFrom", title: "Year From" },
              { accessor: "yearTo", title: "Year To" },
            ]}
          />
        </Stack>
        <Stack className="pt-4">
          <Flex className={experience.header}>
            <Text fw={600} fz={matches ? 18 : 14}>
              Employment History
            </Text>
            <IconEdit size={matches ? 25 : 18} onClick={() => setOpenModal("Employment")} className="cursor-pointer" />
          </Flex>
          <Divider />
          <DataTable
            records={[]}
            fetching={false}
            classNames={{ header: "bg-gray-200", root: "rounded-md", table: "bg-gray-200" }}
            className="w-full"
            columns={[
              { accessor: "company", title: "Company" },
              { accessor: "status", title: "Employee Status" },
              { accessor: "salary", title: "Salary" },
              { accessor: "position", title: "Position" },
              { accessor: "startDate", title: "Start Date" },
              { accessor: "endDate", title: "End Date" },
              { accessor: "reason", title: "Reason for Leaving" },
            ]}
          />{" "}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
