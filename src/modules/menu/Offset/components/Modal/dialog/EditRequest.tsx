/**
 * @version    HRDOffsetNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Fragment, useState } from "react";
import { Flex, Group, Popover, Stack, Text, useMatches } from "@mantine/core";
import { IconCaretDownFilled, IconDots, IconReload } from "@tabler/icons-react";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { ModalProps } from "@shared/assets/types/Modal";
import { useForm } from "@mantine/form";

import { Button, FileAttachment, Modal, Select, TextArea, TextInput, TimePickerInput } from "@shared/components";
import { DataTable } from "mantine-datatable";
import ReferenceNoInput from "@shared/components/ReferenceInput";

export default function EditRequest({ opened, onClose, buttonClose }: ModalProps) {
  const size = useMatches({ base: "100%", sm: "50%" });

  const newForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      DateFiled: null,
      Schedule: {
        Id: 0,
        Name: "",
        Date: null,
        TimeIn: "",
        TimeOut: "",
        BreakTimeIn: "",
        BreakTimeOut: "",
        IsPremium: false,
      },
      Actual: { TimeIn: "", TimeOut: "" },
      Requested: { TimeIn: "", TimeOut: "" },
      Reason: "",
      FileAttachment: "",
    },
  });

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        size={size}
        buttonClose={buttonClose}
        title="Edit Request"
        formProps={{
          onSubmit: () => {},
        }}
        footer={
          <Stack className="flex flex-col justify-end">
            <Button type="submit" variant="gradient" radius="md" size="md">
              SUBMIT
            </Button>
          </Stack>
        }>
        <Stack className="w-full h-full">
          <Group className="w-full">
            <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
              <Select
                size="md"
                label="Offset Date"
                withAsterisk
                radius={8}
                rightSection={<IconDots onClick={() => setOpen(true)} />}
                className="border-none w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                readOnly
                onClick={() => setOpen(true)}
              />
              <TextInput
                size="md"
                disabled
                label="Shift"
                // defaultValue={data!.schedule.name}
                withAsterisk
                radius={8}
                rightSection={<IconCaretDownFilled size={18} />}
                className="border-none w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
            </Flex>

            <Modal opened={open} onClose={() => setOpen(false)} buttonClose={() => setOpen(false)} title="Select Offset Date" size="lg">
              <Flex direction={{ base: "column", sm: "row" }} align="center" gap={10}>
                <Text size="sm">Search By:</Text>
                <Select
                  variant="outline"
                  size="md"
                  radius={8}
                  data={["Date", "Schedule", "Offset In", "Offset Out"]}
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
              <TimePickerInput
                disabled
                size="md"
                label="Actual Offset In"
                required
                // value={data!.schedule.timeIn}
              />
              <TimePickerInput
                disabled
                size="md"
                label="Actual Offset out"
                required
                // value={data!.schedule.timeOut}
              />
            </Flex>
            <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
              <TimePickerInput size="md" label="Offset From" required {...newForm.getInputProps("Requested.TimeIn")} />
              <TimePickerInput size="md" label="Offset To" required {...newForm.getInputProps("Requested.TimeOut")} />
            </Flex>
            <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
              <TextInput
                size="md"
                disabled
                label="Total Computed Hours"
                withAsterisk
                radius={8}
                className="border-none w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
              <ReferenceNoInput
                code="reference-no"
                size="md"
                radius={8}
                label="Reference No."
                placeholder="0000-0000-0000"
                className="w-full"
                max={14}
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
            </Flex>
            <TextArea
              size="md"
              label="Reason"
              placeholder="Briefly state the reason for filing Offset"
              withAsterisk
              className="w-full"
              styles={{
                input: { height: "100px" },
                label: { fontSize: "16px", color: "#6d6d6d" },
              }}
              {...newForm.getInputProps("Reason")}
              radius={8}
            />
            <FileAttachment
              label="Attachment"
              multiple={true}
              maxFiles={10}
              lz="md"
              required
              accept=".pdf,.jpg,.png,.doc,.docx"
              initialFiles={[]}
              onChange={(files) => {
                // form.setFieldValue("FileAttachment", files);
                console.log("files", files);
              }}
            />
          </Group>
        </Stack>
      </Modal>
    </Fragment>
  );
}
