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
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";

import { OvertimeServices } from "../../../services/api";
import { ValidationErrorResponse } from "../../../assets/types";

import ReferenceNoInput from "@shared/components/ReferenceInput";

import { Button, TimePickerInput, TextArea, TextInput, Select, Modal, FileAttachment } from "@shared/components";

import useResponsive from "@shared/hooks/useResponsive";

export default function NewRequest({ opened, onClose, buttonClose }: ModalProps) {
  const size = useMatches({ base: "100%", sm: "50%" });
  const newForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      DateFiled: "",
      Schedule: {
        Id: 0,
        Name: "",
        Date: "",
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
      ReferenceNo: "",
    },
    validate: {
      Reason: (value: string) => (value.length === 0 ? "Reason is required" : null),
      ReferenceNo: (value: string) => (value.length === 0 ? "Reference No is required" : null),
    },
  });

  const [openOtDate, setOpenOtDate] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const { mutate: createOvertime } = useMutation({
    mutationFn: async (values: typeof newForm.values) => {
      const formattedValues = {
        ...values,
        Requested: {
          TimeIn: DateTimeUtils.timeSecondsSetZeroSeconds(values.Requested.TimeIn),
          TimeOut: DateTimeUtils.timeSecondsSetZeroSeconds(values.Requested.TimeOut),
        },
        Actual: {
          TimeIn: DateTimeUtils.timeSecondsSetZeroSeconds(values.Actual.TimeIn),
          TimeOut: DateTimeUtils.timeSecondsSetZeroSeconds(values.Actual.TimeOut),
        },
        FileAttachment: files.join(","),
      };
      return OvertimeServices.createOTRequest(formattedValues);
    },
    onSuccess: (data) => console.log(data),
    onError: (error: { response: { data: ValidationErrorResponse } }) => {
      const errorData = error.response.data;
      const errorMessages = Object.values(errorData.errors).flat().join("\n");
      console.log(errorMessages);
    },
  });

  const [refNo, setRefNo] = useState("123456789012");

  const { isSmallHeight, isSmallWidth } = useResponsive();

  return (
    <Fragment>
      <Modal
        opened={opened}
        onClose={onClose}
        buttonClose={buttonClose}
        centered
        size={size}
        title="New Request"
        className="select-none"
        formProps={{
          onSubmit: newForm.onSubmit((values) => {
            createOvertime(values);
            console.log(values);
          }),
        }}
        footer={
          <Stack className="w-full flex flex-col justify-end mt-3">
            <Button type="submit" variant="gradient" className="w-2/4 sm:w-2/5 md:w-1/6  self-end" size={isSmallHeight || isSmallWidth ? "sm" : "md"}>
              SUBMIT
            </Button>
          </Stack>
        }>
        <Stack className="w-full h-full">
          <Group className="w-full">
            <TextInput
              size="sm"
              label="Overtime Date"
              withAsterisk
              radius={8}
              rightSection={<IconDots onClick={() => setOpenOtDate(true)} className="cursor-pointer" />}
              className="border-none w-full"
              styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              readOnly
              onClick={() => setOpenOtDate(true)}
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
              <TextInput
                size="md"
                disabled
                label="Shift"
                withAsterisk
                radius={8}
                rightSection={<IconCaretDownFilled size={18} />}
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
                value={refNo}
                onValueChange={(no) => {
                  newForm.setFieldValue("ReferenceNo", no);
                  setRefNo(no);
                }}
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
            </Flex>
            <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
              <TimePickerInput code="actualIn" disabled size="md" label="Actual OT In" withDropdown withSeconds required />
              <TimePickerInput code="actualOut" disabled size="md" label="Actual OT out" withDropdown withSeconds required />
            </Flex>
            <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
              <TimePickerInput
                label="OT From"
                size="md"
                setValue={(time) => {
                  newForm.setFieldValue("Requested.TimeIn", time!);
                }}
                withDropdown
                withSeconds
                required
              />
              <TimePickerInput
                label="OT To"
                size="md"
                setValue={(time) => {
                  newForm.setFieldValue("Requested.TimeOut", time!);
                }}
                withDropdown
                withSeconds
                required
              />
            </Flex>
            <TextArea
              code="reason"
              id="reason"
              size="md"
              label="Reason"
              placeholder="Briefly state the reason for filing overtime"
              withAsterisk
              className="w-full"
              {...newForm.getInputProps("Reason")}
              key={newForm.key("Reason")}
              styles={{
                input: { height: "100px" },
                label: { fontSize: "16px", color: "#6d6d6d" },
              }}
              radius={8}
            />
            <FileAttachment label="Attachment" multiple={true} maxFiles={10} lz="md" required accept=".pdf,.jpg,.png,.doc,.docx" initialFiles={[]} onChange={setFiles} />
          </Group>
        </Stack>
      </Modal>
    </Fragment>
  );
}
