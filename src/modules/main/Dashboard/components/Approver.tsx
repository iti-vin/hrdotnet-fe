/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { useMediaQuery } from "@mantine/hooks";
import { IconAlarmFilled, IconChevronDown, IconPlaneTilt } from "@tabler/icons-react";
import { Box, Container, Divider, Flex, ScrollArea, Select, Stack, Text } from "@mantine/core";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import worktime from "../assets/worktime.json";
import holidays from "../assets/holiday.json";
import timerec from "../assets/timerecord.json";
import credits from "../assets/credits.json";

export default function Approver() {
  const small = useMediaQuery("(max-width: 40em)");
  return (
    <Stack className="w-full h-auto lg:h-[80%] rounded-lg select-none flex flex-col lg:flex-row">
      <Stack className="w-full lg:w-[65%] h-full flex flex-col">
        <Stack className="w-full h-auto lg:h-[15%] bg-white rounded-lg gap-1 p-4">
          <Text c="#559cda" fw={600} fz={{ base: 13, md: 17 }} children="Leave Credits" />
          <Flex className="flex flex-col lg:flex-row gap-3 h-full">
            {credits.map((item, index) => (
              <Stack key={index} bg="#deecff" className="w-full h-auto flex flex-row items-center rounded-lg">
                <Box className="h-full bg-[#559cda] p-2 rounded-lg flex items-center">
                  <IconPlaneTilt color="white" size={25} stroke={1.5} />
                </Box>
                <Flex justify="space-between" align="center" className="w-full pr-4">
                  <Text fz={small ? 18 : 14} fw={600} c="#6d6d6d" children={item.name} />
                  <Text fz={small ? 22 : 24} fw={600} c="#559cda" children={item.value} />
                </Flex>
              </Stack>
            ))}
          </Flex>
        </Stack>
        <Stack className="w-full h-full flex flex-col lg:flex-row">
          <Stack className="w-full h-full lg:w-1/2 bg-white rounded-lg px-4 pt-4 pb-2">
            <Stack className="flex flex-col gap-1 h-[30%] mb-1">
              <Text fz={{ base: 13, md: 17 }} fw={600} c="#559cda" children="Time at work" />
              <Flex justify="space-between" className="">
                <Flex direction="row" align="center" gap={4}>
                  <Text fz={12} fw={600} c="#559cda" children="Time In :" />
                  <Text fz={10} c="#6d6d6d">
                    Today at 08:00 AM (GMT 8)
                  </Text>
                </Flex>
                <Box className="flex flex-row gap-2 bg-[#F0F0F0] items-center pl-5 rounded-full justify-between h-[70%]">
                  <Text fz={10} fw={600} c="#666666" className="flex flex-row gap-1 items-center">
                    14h 0m <Text fz={10}>Today</Text>
                  </Text>
                  <Box className="bg-[#559cda] border-[2px] border-white rounded-full p-1">
                    <IconAlarmFilled color="white" size={16} />
                  </Box>
                </Box>
              </Flex>
              <Divider my={0} mx={0} />
              <Flex justify="space-between">
                <Flex direction="row" align="center" gap={4}>
                  <Text fz={10} fw={600} c="#666666" children="This Cut-off :" />
                  <Text fz={10} c="#666666" children="Aug 1 - Aug 15" />
                </Flex>
                <Box className="flex flex-row gap-2 bg-[#F0F0F0] items-center px-2 rounded-full justify-between h-[80%]">
                  <IconAlarmFilled color="#666666" size={18} />
                  <Text fz={10} fw={600} c="#666666" className="flex flex-row gap-1 items-center" children="36h 30m" />
                </Box>
              </Flex>
            </Stack>
            <ResponsiveContainer width="100%" className="h-[50%]">
              <BarChart width={730} height={250} data={worktime} barSize={15}>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <XAxis dataKey="name" fontSize={8} fill="#6d6d6d" />
                <Bar dataKey="pv" stackId={1} fill="#559CDA" />
                <Bar dataKey="uv" stackId={1} fill="#F1F1F1" />
              </BarChart>
            </ResponsiveContainer>
          </Stack>
          <Stack className="w-full h-full lg:w-1/2 bg-white rounded-lg p-4 gap-0">
            <Flex direction="row" justify="space-between" className="h-[15%]">
              <Text fz={{ base: 13, md: 17 }} c="#559cda" fw={600}>
                Time Record
              </Text>
              <Stack className="flex flex-row w-[50%]">
                <Select
                  size="xs"
                  placeholder="May"
                  data={["Jan", "Feb", "Mar", "Apr"]}
                  radius="lg"
                  classNames={{
                    input: "border-[#559cda] poppins",
                    option: "text-[#6d6d6d]",
                  }}
                  rightSection={<IconChevronDown size={15} color="#559cda" />}
                />
                <Select
                  size="xs"
                  placeholder="2025"
                  data={["2022", "2023", "2024", "2025"]}
                  radius="lg"
                  classNames={{ input: "border-[#559cda] poppins", option: "text-[#6d6d6d]" }}
                  rightSection={<IconChevronDown size={15} color="#559cda" />}
                />
              </Stack>
            </Flex>
            <ResponsiveContainer className="h-[65&]">
              <PieChart width={250} height={250}>
                <Pie data={timerec} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={100} fill="color" label>
                  {timerec.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Flex justify="center" className="h-[15%] grid grid-cols-2">
              <Container className="flex flex-row items-center gap-2">
                <div className="p-2 bg-[#559CDA] rounded-full" />
                <Text fz={12} c="#6d6d6d">
                  Attendance
                </Text>
              </Container>
              <Container className="flex flex-row items-center gap-2">
                <div className="p-2 bg-[#FF4B34] rounded-full" />
                <Text fz={12} c="#6d6d6d">
                  Absences
                </Text>
              </Container>
              <Container className="flex flex-row items-center gap-2">
                <div className="p-2 bg-[#ED8028] rounded-full" />
                <Text fz={12} c="#6d6d6d">
                  Tardy
                </Text>
              </Container>
              <Container className="flex flex-row items-center gap-2">
                <div className="p-2 bg-[#FFB703] rounded-full" />
                <Text fz={12} c="#6d6d6d">
                  Undertime
                </Text>
              </Container>
            </Flex>
          </Stack>
        </Stack>
      </Stack>
      <Stack className="w-[35%] h-full bg-white rounded-lg p-4 gap-2">
        <Flex justify="flex-start" gap={5}>
          <Text c="#559cda" fw={600} fz={{ base: 13, md: 17 }} children="Upcoming Events and Holidays" />
          <Text bg="#FF780033" c="#FF7800" fz={{ base: 10, md: 12 }} className="px-4 rounded-full font-bold flex items-center">
            {holidays.length}
          </Text>
        </Flex>
        <ScrollArea className="h-full" type="auto">
          <Flex className="flex flex-col gap-2.5 overflow-hidden">
            {holidays.map((item, index) => (
              <Stack key={index} bg="#deecff" className="w-full h-full flex flex-row items-center rounded-lg">
                <Box className="h-full rounded-lg w-20">
                  <Flex className="w-full bg-[#559cda] rounded-lg flex flex-col items-center gap-1">
                    <Text fz={11} className="bg-[#ED8028] px-2 py-1 rounded-t-lg w-full text-center" c="#fff">
                      {item.month}
                    </Text>
                    <Text fz={18} c="#fff" fw={600} className="py-0.5">
                      {item.day}
                    </Text>
                  </Flex>
                </Box>
                <Flex className="flex flex-col">
                  <Text fz={small ? 20 : 14} fw={600} c="#559cda" children={item.name} />
                  <Text fz={small ? 16 : 12} c="#6d6d6d" children={item.location} />
                </Flex>
              </Stack>
            ))}
          </Flex>
        </ScrollArea>
      </Stack>
    </Stack>
  );
}
