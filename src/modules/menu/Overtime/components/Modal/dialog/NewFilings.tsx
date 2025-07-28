/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Fragment, useState } from "react";
import { Flex, Group, Popover, Stack, Text, useMatches } from "@mantine/core";
import { IconCaretDownFilled, IconDots, IconReload } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { ModalProps } from "@shared/assets/types/Modal";

import { Button, TimePickerInput, TextArea, TextInput, Select, Modal, FileAttachment } from "@shared/components";
import useResponsive from "@shared/hooks/useResponsive";

export default function NewFilings({ opened, onClose, buttonClose }: ModalProps) {
  const data = [
    { date: "10/11/2024", schedule: "Next Day", actualIn: "6:00PM", actualOut: "10:00PM" },
    { date: "10/12/2024", schedule: "Next Day", actualIn: "7:00PM", actualOut: "10:00PM" },
    { date: "10/13/2024", schedule: "Same Day", actualIn: "8:00PM", actualOut: "10:00PM" },
    { date: "10/14/2024", schedule: "Next Day", actualIn: "9:00PM", actualOut: "10:00PM" },
    { date: "10/15/2024", schedule: "Next Day", actualIn: "9:00PM", actualOut: "10:00PM" },
    { date: "10/16/2024", schedule: "Next Day", actualIn: "9:00PM", actualOut: "10:00PM" },
  ];
  const size = useMatches({ base: "100%", sm: "50%" });

  const [files, setFiles] = useState<File[]>([]);
  const [openOtDate, setOpenOtDate] = useState<boolean>(false);
  const [openEmployee, setOpenEmployee] = useState<boolean>(false);
  const { isSmallHeight, isSmallWidth } = useResponsive();

  console.warn(files);
  return (
    <Fragment>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        size={size}
        buttonClose={buttonClose}
        title="New Filings"
        formProps={{
          onSubmit: undefined,
          //   newForm.onSubmit((values) => {
          //   createOvertime(values);
          //   console.log(values);
          // }),
        }}
        footer={
          <Stack className="w-full flex flex-col justify-end mt-3">
            <Button type="submit" variant="gradient" className="w-2/4 sm:w-2/5 md:w-1/6  self-end" size={isSmallHeight || isSmallWidth ? "sm" : "md"}>
              SUBMIT
            </Button>
          </Stack>
        }>
        <form onSubmit={undefined}>
          <Stack className="w-full h-full">
            <Group className="w-full">
              <Select
                size="md"
                label="Employee Name"
                placeholder="Select Employee Name"
                withAsterisk
                radius={8}
                rightSection={<IconDots onClick={() => setOpenEmployee(true)} />}
                className="border-none w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                readOnly
                onClick={() => setOpenEmployee(true)}
              />
              <Modal opened={openOtDate} onClose={() => setOpenOtDate(false)} buttonClose={() => setOpenOtDate(false)} title="Select Overtime Date" size="lg">
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
                  records={data}
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
                  // paginationText={({ totalRecords }) => `${totalRecords} items found in (0.225) seconds`}
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
              <Modal opened={openEmployee} onClose={() => setOpenEmployee(false)} buttonClose={() => setOpenEmployee(false)} title="Select Employee" size="lg">
                <Flex direction={{ base: "column", sm: "row" }} align="center" gap={10}>
                  <Text size="sm">Search By:</Text>
                  <Select
                    variant="outline"
                    size="md"
                    radius={8}
                    data={["Date", "Schedule", "OT In", "OT Out"]}
                    rightSection={<IconCaretDownFilled color="#559CDA" size={18} />}
                    className="border-none w-2/6"
                    styles={{
                      input: {
                        backgroundColor: "#deecff",
                        color: "#559CDA",
                        fontWeight: 600,
                        fontFamily: "Poppins",
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
                        fontFamily: "Poppins",
                      },
                    }}
                  />

                  <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                      <IconReload className="cursor-pointer rounded-md p-1" style={{ background: "#dfecfd" }} size={40} color="#559CDA" />
                    </Popover.Target>
                    <Popover.Dropdown style={{ pointerEvents: "none" }}>
                      <Text size="sm">Refresh</Text>
                    </Popover.Dropdown>
                  </Popover>
                </Flex>
                <DataTable
                  columns={[
                    { accessor: "code", title: "Code" },
                    { accessor: "name", title: "Name" },
                    { accessor: "department", title: "Department" },
                    { accessor: "position", title: "Position Level" },
                    { accessor: "section", title: "Section" },
                    { accessor: "division", title: "Division" },
                  ]}
                  idAccessor="date"
                  key="date"
                  records={[]}
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
                  // paginationText={({ totalRecords }) => `${totalRecords} items found in (0.225) seconds`}
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
                  label="Overtime Date"
                  placeholder="Select Overtime Date"
                  withAsterisk
                  radius={8}
                  rightSection={<IconDots onClick={() => setOpenOtDate(true)} />}
                  className="border-none w-full"
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  readOnly
                  onClick={() => setOpenOtDate(true)}
                />
                <Select
                  disabled
                  size="md"
                  label="Shift"
                  placeholder="Schedule 001"
                  withAsterisk
                  radius={8}
                  data={["Next Day", "Same Day"]}
                  rightSection={<IconCaretDownFilled size={18} />}
                  className="border-none w-full"
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
              </Flex>
              <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
                <TimePickerInput disabled size="md" label="Actual OT In" withDropdown withSeconds required />
                <TimePickerInput disabled size="md" label="Actual OT out" withDropdown withSeconds required />
              </Flex>
              <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
                <TimePickerInput label="OT From" size="md" withDropdown withSeconds required />
                <TimePickerInput label="OT To" size="md" withDropdown withSeconds required />
              </Flex>
              <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
                <TextInput
                  size="md"
                  radius={8}
                  label="Total Computed Hours"
                  className="w-full"
                  disabled
                  // defaultValue={value}
                  // onChange={handleChange}
                  max={14}
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
                <TextInput
                  size="md"
                  radius={8}
                  label="Reference No."
                  placeholder="Reference No"
                  className="w-full"
                  disabled
                  // defaultValue={value}
                  // onChange={handleChange}
                  max={14}
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
              </Flex>
              <TextArea
                size="md"
                label="Reason"
                placeholder="Briefly state the reason for filing overtime"
                withAsterisk
                className="w-full"
                styles={{
                  input: { height: "100px" },
                  label: { fontSize: "16px", color: "#6d6d6d" },
                }}
                radius={8}
              />{" "}
              <FileAttachment label="Attachment" multiple={true} maxFiles={10} lz="md" required accept=".pdf,.jpg,.png,.doc,.docx" initialFiles={[]} onChange={setFiles} />
            </Group>
          </Stack>
        </form>
      </Modal>
    </Fragment>
  );
}
