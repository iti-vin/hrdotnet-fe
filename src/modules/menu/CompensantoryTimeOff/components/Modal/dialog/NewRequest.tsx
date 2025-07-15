/**
 * @version    HRDOffsetNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Fragment, useState } from "react";
import { Flex, Group, Popover, Stack, Text, useMatches } from "@mantine/core";
import { ModalProps } from "@shared/assets/types/Modal";
import { useForm } from "@mantine/form";
import { IconCalendarClock, IconCaretDownFilled, IconReload } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Modal, Select, TextInput, PaginatedDataTable as DataTable, DateRangePickerInput, TextArea, FileAttachment } from "@shared/components";
import ReferenceNoInput from "@shared/components/ReferenceInput";

export default function NewRequest({ opened, onClose, buttonClose }: ModalProps) {
  const size = useMatches({ base: "100%", sm: "50%" });
  const small = useMediaQuery("(max-width: 40em)");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dateDuration, setDateDuration] = useState<[string | null, string | null]>([null, null]);
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

  return (
    <Fragment>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        size={size}
        buttonClose={buttonClose}
        title="New Request"
        formProps={{
          onSubmit: () => {},
        }}
        footer={
          <Stack className="flex flex-col justify-end">
            <Button type="submit" variant="gradient" radius="md" size="md" h={35} w={100}>
              SUBMIT
            </Button>
          </Stack>
        }>
        <Stack className="w-full h-full">
          <Group className="w-full">
            <Flex className="w-full bg-[#559cda] py-2 rounded-lg flex flex-row justify-center items-center gap-2 cursor-pointer">
              <IconCalendarClock color="white" />
              <Text className="text-center text-white text-md font-medium" onClick={() => setOpenModal(true)}>
                Total Credits: 13.5
              </Text>
            </Flex>
            <Modal opened={openModal} onClose={() => setOpenModal(false)} buttonClose={() => setOpenModal(false)} title="Offset Credits" size="lg">
              <Flex direction={{ base: "column", sm: "row" }} align="center" gap={10} px={small ? 20 : 30}>
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
                    <IconReload className="cursor-pointer rounded-md p-1" style={{ background: "#dfecfd" }} size={40} color="#559CDA" />
                  </Popover.Target>
                  <Popover.Dropdown style={{ pointerEvents: "none" }}>
                    <Text size="sm">Refresh</Text>
                  </Popover.Dropdown>
                </Popover>
              </Flex>
              <DataTable
                columns={[
                  { accessor: "documentNo", title: "Document No" },
                  { accessor: "expiry", title: "Expiry" },
                  { accessor: "used", title: "Used" },
                  { accessor: "current", title: "Current" },
                ]}
                idAccessor="date"
                key="date"
                records={[]}
                // onRowClick={(data: any) => {
                //   handleOptionSelect(data.record);
                // }}
                page={1}
                onPageChange={() => {}}
                totalRecords={10}
                recordsPerPage={5}
                // paginationText={({ totalRecords }) => `${totalRecords} items found in (0.225) seconds`}
              />
            </Modal>

            <DateRangePickerInput
              size="md"
              dateValue={dateDuration}
              setDateValue={(value) => setDateDuration(value)}
              label="Duration"
              placeholder="Start Date"
              withAsterisk
              className="border-none w-full"
              styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            />

            <Flex direction={{ base: "column", sm: "row" }} className="w-full" gap={20}>
              <Select
                size="md"
                label="Leave Option"
                placeholder="Select Leave Option"
                withAsterisk
                radius={8}
                rightSection={<IconCaretDownFilled />}
                className="border-none w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
              <ReferenceNoInput
                code="cto"
                size="md"
                radius={8}
                label="Reference No."
                placeholder="Input Reference Number(if necessary)"
                className="w-full"
                max={14}
                classNames={{ input: "poppins" }}
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
            </Flex>

            <TextArea
              size="md"
              label="Reason"
              placeholder="Briefly state the reason for filing Offset"
              withAsterisk
              className="w-full"
              classNames={{ input: "poppins" }}
              styles={{
                // input: { height: "100px" },
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
