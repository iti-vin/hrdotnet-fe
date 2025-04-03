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
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { OvertimeServices } from "../../../services/api";
import { errorFilings } from "@shared/utils/Errors";
import { ValidationErrorResponse } from "@shared/assets/types/ErrorFiling";

export default function NewRequest({ opened, onClose, buttonClose }: ModalProps) {
  const size = useMatches({ base: "100%", sm: "70%" });

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

  const { ref: OTFrom, pickerControl: pickerOTFrom } = useTimePicker();
  const { ref: OTTo, pickerControl: pickerOTTo } = useTimePicker();

  const [open, setOpen] = useState<boolean>(false);

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
      };
      console.log(formattedValues);
      return OvertimeServices.createOTRequest(formattedValues);
    },
    onSuccess: (data) => console.log(data),
    onError: (error: { response: { data: ValidationErrorResponse } }) => {
      const errorData = error.response.data;
      const errorMessages = Object.values(errorData.errors).flat().join("\n");
      console.log(errorMessages);
    },
  });

  const handleCreate = (values: typeof newForm.values) => {
    createOvertime(values);
  };

  return (
    <Fragment>
      <Modal opened={opened} onClose={onClose} centered size={size} buttonClose={buttonClose} title="New Request">
        <form onSubmit={newForm.onSubmit(handleCreate)}>
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
                    // defaultValue={data!.schedule.timeIn}
                    className="w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TimeInput
                    disabled
                    size="md"
                    radius={8}
                    label="Actual OT out"
                    // defaultValue={data!.schedule.timeOut}
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
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    ref={OTFrom}
                    rightSection={pickerOTFrom}
                    {...newForm.getInputProps("Requested.TimeIn")}
                  />
                  <TimeInput
                    size="md"
                    radius={8}
                    label="OT To"
                    withAsterisk
                    className="w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    ref={OTTo}
                    rightSection={pickerOTTo}
                    {...newForm.getInputProps("Requested.TimeOut")}
                  />
                </Flex>
                <Textarea
                  size="md"
                  label="Reason"
                  placeholder="Briefly state the reason for filing overtime"
                  withAsterisk
                  className="w-full"
                  styles={{
                    input: { height: "100px" },
                    label: { fontSize: "16px", color: "#6d6d6d" },
                  }}
                  {...newForm.getInputProps("Reason")}
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
