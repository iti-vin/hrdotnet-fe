/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Fragment, useState } from "react";
import Modal from "@/layout/main/dialog/Modal";
import Dropzone from "@shared/template/Dropzone";
import {
  Button,
  Flex,
  Group,
  Popover,
  ScrollArea,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  useMatches,
} from "@mantine/core";
import { IconCaretDownFilled, IconDots, IconReload } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import { TimeInput } from "@mantine/dates";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { useTimePicker } from "@shared/hooks/useTimePicker";
import { ModalProps } from "@shared/assets/types/Modal";
import { useOvertimeStore } from "../../../store";

export default function EditRequest({ opened, onClose, buttonClose }: ModalProps) {
  const { viewItems } = useOvertimeStore();
  const size = useMatches({ base: "100%", sm: "70%" });

  const { ref: OTFrom, pickerControl: pickerOTFrom } = useTimePicker();
  const { ref: OTTo, pickerControl: pickerOTTo } = useTimePicker();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <Modal opened={opened} onClose={onClose} centered size={size} buttonClose={buttonClose} title="Edit Request">
        <form onSubmit={undefined}>
          <Stack className="w-full h-full">
            <ScrollArea
              px={20}
              className="flex flex-col mt-3 w-full text-[#6d6d6d] relative"
              h={650}
              styles={{ scrollbar: { display: "none" } }}>
              <Group className="w-full">
                <Select
                  size="md"
                  label="Overtime Date"
                  placeholder={DateTimeUtils.getIsoDateWord(viewItems.filing.dateFiled)}
                  withAsterisk
                  radius={8}
                  rightSection={<IconDots onClick={() => setOpen(true)} />}
                  className="border-none w-full"
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  readOnly
                  onClick={() => setOpen(true)}
                />

                <Modal
                  opened={open}
                  onClose={() => setOpen(false)}
                  buttonClose={() => setOpen(false)}
                  title="Select Overtime Date"
                  size="lg">
                  <Flex direction={{ base: "column", sm: "row" }} align="center" gap={10}>
                    <Text size="sm">Search By:</Text>
                    <Select
                      variant="outline"
                      size="md"
                      radius={8}
                      data={["Date", "Schedule", "OT In", "OT Out"]}
                      rightSection={<IconCaretDownFilled size={18} />}
                      className="border-none w-2/6"
                      styles={{
                        input: {
                          backgroundColor: "#deecff",
                          color: "#559CDA",
                          fontWeight: 600,
                        },
                      }}
                    />
                    <TextInput
                      variant="outline"
                      size="md"
                      defaultValue="Search"
                      onChange={() => {}}
                      radius={8}
                      styles={{
                        input: {
                          backgroundColor: "#deecff",
                          color: "#559CDA",
                          fontWeight: 600,
                        },
                      }}
                    />

                    <Popover width={200} position="bottom" withArrow shadow="md">
                      <Popover.Target>
                        <IconReload
                          //   onMouseEnter={openReload}
                          //   onMouseLeave={closeExport}
                          className="cursor-pointer rounded-md p-1"
                          style={{ background: "#dfecfd" }}
                          size={40}
                          color="#559CDA"
                        />
                      </Popover.Target>
                      <Popover.Dropdown style={{ pointerEvents: "none" }}>
                        <Text size="sm">Refresh</Text>
                      </Popover.Dropdown>
                    </Popover>
                  </Flex>
                  <DataTable
                    columns={[
                      {
                        accessor: "date",
                        title: "Date",
                        render: ({ date }: { date: string }) => {
                          return DateTimeUtils.dayWithDate(date);
                        },
                      },
                      { accessor: "schedule", title: "Schedule" },
                      { accessor: "actualIn", title: "Actual In" },
                      { accessor: "actualOut", title: "Actual Out" },
                    ]}
                    idAccessor="date"
                    key="date"
                    // records={data}
                    striped={true}
                    highlightOnHover={true}
                    withTableBorder={true}
                    className="select-none"
                    // onRowClick={(data: any) => {
                    //   handleOptionSelect(data.record);
                    // }}
                    page={1}
                    onPageChange={() => {}}
                    totalRecords={10}
                    recordsPerPage={5}
                    paginationText={({ totalRecords }) => `${totalRecords} items found in (0.225) seconds`}
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
                </Modal>

                <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
                  <Select
                    size="md"
                    label="Shift"
                    withAsterisk
                    radius={8}
                    data={["Next Day", "Same Day"]}
                    rightSection={<IconCaretDownFilled size={18} />}
                    className="border-none w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="Reference No."
                    placeholder="0000-0000-0000"
                    withAsterisk
                    className="w-full"
                    max={14}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Flex>
                <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
                  <TimeInput
                    disabled
                    size="md"
                    radius={8}
                    label="Actual OT In"
                    defaultValue={DateTimeUtils.getCurrTimeDefault(viewItems.filing.actual.dateFrom)}
                    onChange={() => {}}
                    className="w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TimeInput
                    disabled
                    size="md"
                    radius={8}
                    label="Actual OT out"
                    defaultValue={DateTimeUtils.getCurrTimeDefault(viewItems.filing.actual.dateTo)}
                    onChange={() => {}}
                    className="w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Flex>
                <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
                  <TimeInput
                    size="md"
                    radius={8}
                    label="OT From"
                    withAsterisk
                    className="w-full"
                    defaultValue={DateTimeUtils.getCurrTimeDefault(viewItems.filing.requested.dateFrom)}
                    onChange={() => {}}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    ref={OTFrom}
                    rightSection={pickerOTFrom}
                  />
                  <TimeInput
                    size="md"
                    radius={8}
                    label="OT To"
                    withAsterisk
                    className="w-full"
                    defaultValue={DateTimeUtils.getCurrTimeDefault(viewItems.filing.requested.dateTo)}
                    onChange={() => {}}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    ref={OTTo}
                    rightSection={pickerOTTo}
                  />
                </Flex>
                <Textarea
                  size="md"
                  label="Reason"
                  placeholder="Briefly state the reason for filing overtime"
                  withAsterisk
                  defaultValue={viewItems.filing.reason}
                  onChange={() => {}}
                  className="w-full"
                  styles={{
                    input: { height: "100px" },
                    label: { fontSize: "16px", color: "#6d6d6d" },
                  }}
                  radius={8}
                />
                <Dropzone />
              </Group>
            </ScrollArea>
          </Stack>
          <Stack className="flex flex-col justify-end mt-3">
            <Button
              type="submit"
              className="w-2/4 sm:w-2/5 md:w-1/6  br-gradient self-end border-none"
              radius="md"
              size="md">
              SUBMIT
            </Button>
          </Stack>
        </form>
      </Modal>
    </Fragment>
  );
}
