/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { useMediaQuery } from "@mantine/hooks";
import { IconAlarmFilled, IconChevronDown } from "@tabler/icons-react";
import { Box, Container, Divider, Flex, ScrollArea, Select, Stack, Text } from "@mantine/core";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import worktime from "../assets/worktime.json";
import holidays from "../assets/holiday.json";
import timerec from "../assets/timerecord.json";
import credits from "../assets/credits.json";

import { iconMap } from "@shared/ui/display/IconDisplay";
import "../index.css";

export default function UserDashboard() {
  const small = useMediaQuery("(max-width: 40em)");

  return (
    <Stack className="w-full h-auto lg:h-[80%] rounded-lg select-none">
      <Stack className="w-full h-auto lg:h-[20%] bg-white rounded-lg gap-3 p-4">
        <Text c="#559cda" fw={600} fz={{ base: 13, md: 17 }} children="Leave Credits" />
        <Flex className="flex flex-col lg:flex-row gap-3 h-full">
          {credits.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Stack key={index} bg="#deecff" className="w-full h-full flex flex-row items-center rounded-lg">
                <Box className="h-full bg-[#559cda] p-2 md:p-3 lg:p-4 rounded-lg flex items-center">
                  <Icon color="white" size={25} />
                </Box>
                <Flex justify="space-between" align="center" className="w-full pr-4">
                  <Text fz={{ base: 13, md: 17 }} fw={600} c="#6d6d6d" children={item.name} />
                  <Text fz={{ base: 18, md: 22 }} fw={600} c="#559cda" children={item.value} />
                </Flex>
              </Stack>
            );
          })}
        </Flex>
      </Stack>
      <Stack className="w-full h-auto lg:h-[80%] flex flex-col lg:flex-row ">
        <Stack className="w-full h-full flex flex-col justify-between lg:w-3/5">
          <Stack className="w-full h-[47%] bg-white rounded-lg p-4 gap-2">
            <Flex justify="space-between">
              <Flex justify="flex-start" gap={5}>
                <Text c="#559cda" fw={600} fz={{ base: 13, md: 17 }} children="Pending Applications" />
                <Text bg="#FF780033" c="#FF7800" fz={{ base: 10, md: 12 }} className="px-4 rounded-full font-bold flex items-center">
                  5
                </Text>
              </Flex>
              <Flex>
                <Container className="flex flex-row items-center gap-2">
                  <div className="p-1 bg-[#9B51E0] rounded-full" />
                  <Text fz={12} c="#6d6d6d" fw={700}>
                    Filed
                  </Text>
                </Container>
                <Container className="flex flex-row items-center gap-2">
                  <div className="p-1 bg-[#ED8028] rounded-full" />
                  <Text fz={12} c="#6d6d6d" fw={700}>
                    Reviewed
                  </Text>
                </Container>
              </Flex>
            </Flex>
            <ResponsiveContainer width="100%" height={"100%"}>
              <BarChart
                layout="vertical"
                data={[
                  { name: "Compensatory Time Off", filed: 5, reviewed: 5 },
                  { name: "Offset", filed: 3, reviewed: 2 },
                  { name: "Overtime", filed: 4, reviewed: 8 },
                  { name: "Change Schedule", filed: 2, reviewed: 6 },
                  { name: "Sick Leave", filed: 5, reviewed: 4 },
                  { name: "Vacation Leave", filed: 1, reviewed: 10 },
                ]}
                margin={{ top: 10, right: 0, bottom: -10, left: 60 }}>
                <XAxis type="number" fontSize={12} />
                <YAxis dataKey="name" type="category" fontSize={12} />
                <Tooltip />
                <Bar dataKey="filed" stackId="a" fill="#9B51E0" name="Filed" barSize={15} />
                <Bar dataKey="reviewed" stackId="a" fill="#ED8028" name="Reviewed" barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </Stack>

          <Stack className="w-full h-[50%] flex flex-col lg:flex-row gap-2">
            <Stack className="w-full h-full lg:w-3/5 bg-white rounded-lg px-4 pt-4">
              <Stack className="flex flex-col gap-1 h-[30%]">
                <Text fz={{ base: 13, md: 17 }} fw={600} c="#559cda" children="Time at work" />
                <Flex justify="space-between" className="">
                  <Flex direction="row" align="center" gap={4}>
                    <Text fz={12} fw={600} c="#559cda" children="Time In :" />
                    <Text fz={10} c="#6d6d6d">
                      Today at 08:00 AM (GMT 8)
                    </Text>
                  </Flex>
                  <Box className="flex flex-row gap-2 bg-[#F0F0F0] items-center pl-5 rounded-full justify-between h-[70%]">
                    <Text fz={12} fw={600} c="#666666" className="flex flex-row gap-1 items-center">
                      14h 0m <Text fz={12}>Today</Text>
                    </Text>
                    <Box className="bg-[#559cda] border-[2px] border-white rounded-full p-1">
                      <IconAlarmFilled color="white" size={20} />
                    </Box>
                  </Box>
                </Flex>
                <Divider my={0} mx={0} />
                <Flex justify="space-between">
                  <Flex direction="row" align="center" gap={4}>
                    <Text fz={12} fw={600} c="#666666" children="This Cut-off :" />
                    <Text fz={10} c="#666666" children="Aug 1 - Aug 15" />
                  </Flex>
                  <Box className="flex flex-row gap-2 bg-[#F0F0F0] items-center px-2 rounded-full justify-between h-[80%]">
                    <IconAlarmFilled color="#666666" size={20} />
                    <Text fz={12} fw={600} c="#666666" className="flex flex-row gap-1 items-center" children="36h 30m" />
                  </Box>
                </Flex>
              </Stack>
              <ResponsiveContainer width="100%" className="h-[50%]">
                <BarChart width={730} height={250} data={worktime} barSize={25}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <XAxis dataKey="name" fontSize={8} />
                  <Bar dataKey="pv" stackId={1} fill="#559CDA" />
                  <Bar dataKey="uv" stackId={1} fill="#F1F1F1" />
                </BarChart>
              </ResponsiveContainer>
            </Stack>
            <Stack className="w-full h-full lg:w-2/5 bg-white rounded-lg p-4">
              <Flex direction="row" justify="space-between" className="h-[15%]">
                <Text fz={{ base: 13, md: 17 }} c="#559cda" fw={600}>
                  Time Record
                </Text>
                <Stack className="flex flex-row w-[40%]">
                  <Select
                    size="xs"
                    placeholder="May"
                    data={["Jan", "Feb", "Mar", "Apr"]}
                    radius="lg"
                    classNames={{
                      input: "border-[#559cda] poppins",
                      option: "text-[#6d6d6d]",
                      root: "h-[10px]",
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
              <ResponsiveContainer width="100%" height={"100%"}>
                <PieChart>
                  <Pie data={timerec} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={60} fill="color" label>
                    {timerec.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Flex justify="center" className="h-[10%] grid grid-cols-2">
                <Container className="flex flex-row items-center gap-2">
                  <div className="p-1 bg-[#559CDA] rounded-full" />
                  <Text fz={10} c="#6d6d6d">
                    Attendance
                  </Text>
                </Container>
                <Container className="flex flex-row items-center gap-2">
                  <div className="p-1 bg-[#FF4B34] rounded-full" />
                  <Text fz={10} c="#6d6d6d">
                    Absences
                  </Text>
                </Container>
                <Container className="flex flex-row items-center gap-2">
                  <div className="p-1 bg-[#ED8028] rounded-full" />
                  <Text fz={10} c="#6d6d6d">
                    Tardy
                  </Text>
                </Container>
                <Container className="flex flex-row items-center gap-2">
                  <div className="p-1 bg-[#FFB703] rounded-full" />
                  <Text fz={10} c="#6d6d6d">
                    Undertime
                  </Text>
                </Container>
              </Flex>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="w-full h-full lg:h-full lg:w-2/5 bg-white rounded-lg px-4 py-4">
          <Flex justify="flex-start" gap={5}>
            <Text c="#559cda" fw={600} fz={{ base: 13, md: 17 }} children="Upcoming Events and Holidays" />
            <Text bg="#FF780033" c="#FF7800" fz={{ base: 10, md: 12 }} className="px-4 rounded-full font-bold flex items-center">
              5
            </Text>
          </Flex>
          <ScrollArea className="h-[300px] lg:h-full" type="auto">
            <Flex className="flex flex-col gap-2.5 overflow-hidden">
              {holidays.map((item, index) => (
                <Stack key={index} bg="#deecff" className="w-full h-full flex flex-row items-center rounded-lg">
                  <Box className="h-full rounded-lg w-20">
                    <Flex className="w-full bg-[#559cda] rounded-lg flex flex-col items-center gap-1">
                      <Text fz={11} className="bg-[#ED8028] px-2 py-1 rounded-t-lg w-full text-center capitalize" c="#fff">
                        {item.month}
                      </Text>
                      <Text fz={20} c="#fff" fw={600} className="items-center">
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
    </Stack>
  );
}
