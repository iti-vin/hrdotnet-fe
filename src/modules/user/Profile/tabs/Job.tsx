/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Divider, Flex, ScrollArea, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import job from "../assets/profile.module.css";
import { DataTable } from "mantine-datatable";

export default function Job() {
  const matches = useMediaQuery("(min-width: 480px)");
  return (
    <Stack className="h-full overflow-hidden w-full">
      <ScrollArea className="h-full w-full">
        <Stack className="pt-2">
          <Flex className={job.header}>
            <Text fw={600} fz={matches ? 18 : 14}>
              TIme Keeping
            </Text>
          </Flex>
          <Divider />
          <Flex className="gap-10">
            <Flex className="gap-2">
              Time Option <Text c="#559cda">Flexi Time</Text>
            </Flex>
            <Flex className="gap-2">
              Minutes <Text c="#559cda">60</Text>
            </Flex>
          </Flex>
          <DataTable
            records={[]}
            fetching={false}
            classNames={{ header: "bg-gray-200", root: "rounded-md", table: "bg-gray-200" }}
            className="w-full"
            columns={[
              { accessor: "week", title: "Days of the Week" },
              { accessor: "schedule", title: "Schedule" },
              { accessor: "shiftType", title: "Shift Type" },
              { accessor: "timeIn", title: "Time In" },
              { accessor: "timeOut", title: "Time Out" },
              { accessor: "breakIn", title: "Break In" },
              { accessor: "breakOut", title: "Break Out" },
              { accessor: "restDay", title: "Rest Day" },
            ]}
          />
        </Stack>

        <Stack className="pt-4">
          <Flex className={job.header}>
            <Text fw={600} fz={matches ? 18 : 14}>
              Payroll
            </Text>
          </Flex>
          <Divider />
          <Flex className={job.content}>
            <Flex className={job.contentContainer}>
              <Flex className={job.textContainer}>
                Payment Scheme:
                <Text size="sm" className={job.infoValue}>
                  Semi-Monthly
                </Text>
              </Flex>
              <Flex className={job.textContainer}>
                Payment Frequency:
                <Text size="sm" className={job.infoValue}>
                  Semi-Monthly
                </Text>
              </Flex>
              <Flex className={job.textContainer}>
                Tax Exemption:
                <Text size="sm" className={job.infoValue}>
                  N/A
                </Text>
              </Flex>
            </Flex>
            <Flex className={job.contentContainer}>
              <Flex className={job.textContainer}>
                Payroll Parameter:
                <Text size="sm" className={job.infoValue}>
                  313 WD/year, 8.0HRS/day
                </Text>
              </Flex>
              <Flex className={job.textContainer}>
                Currency:
                <Text size="sm" className={job.infoValue}>
                  Philippine Peso
                </Text>
              </Flex>
              <Flex className={job.textContainer}>
                Bank:
                <Text size="sm" className={job.infoValue}>
                  Union Bank
                </Text>
              </Flex>
            </Flex>
            <Flex className={job.contentContainer}>
              <Flex className={job.textContainer}>
                Account Type:
                <Text size="sm" className={job.infoValue}>
                  Savings
                </Text>
              </Flex>
              <Flex className={job.textContainer}>
                Account No:
                <Text size="sm" className={job.infoValue}>
                  12335678
                </Text>
              </Flex>
              <Flex className={job.textContainer}>
                Payment Mode:
                <Text size="sm" className={job.infoValue}>
                  Savings
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Stack>

        <Stack className="pt-4">
          <Flex className={job.header}>
            <Text fw={600} fz={matches ? 18 : 14}>
              Salary
            </Text>
          </Flex>
          <Divider />
          <Flex className={job.content}>
            <Flex className="gap-20">
              <Flex className={job.textContainer}>
                Monthly Rate:
                <Text size="sm" className={job.infoValue}>
                  PHP 100,000.00
                </Text>
              </Flex>
              <Flex className={job.textContainer}>
                Daily Rate:
                <Text size="sm" className={job.infoValue}>
                  PHP 3,000.00
                </Text>
              </Flex>
              <Flex className={job.textContainer}>
                Hourly Rate:
                <Text size="sm" className={job.infoValue}>
                  PHP 500.00
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
