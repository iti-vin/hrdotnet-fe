/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { Checkbox, Flex, Group, Popover, Stack, Text } from "@mantine/core";

//--- Icons
import { IconCaretDownFilled, IconDots, IconReload } from "@tabler/icons-react";
import { ModalProps } from "@shared/assets/types/Modal";
import { useState } from "react";

import { useChangeOfScheduleStore } from "../../../store";
import { DataTable } from "@shared/components/table";
import { Select, TextInput, Modal, FileAttachment, TextArea, Button } from "@shared/components";

export default function NewFilings({ opened, onClose, buttonClose }: ModalProps) {
  const small = useMediaQuery("(max-width: 40em)");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { setOpenDialog, setOpenConfirmation } = useChangeOfScheduleStore();

  return (
    <Modal
      title="New Filings"
      size="xl"
      opened={opened}
      onClose={onClose}
      buttonClose={buttonClose}
      footer={
        <Button
          size="lg"
          variant="gradient"
          onClick={() => {
            setOpenDialog("");
            setOpenConfirmation("SummaryDetails");
          }}>
          SUBMIT
        </Button>
      }>
      <form className="relative">
        <Stack className="w-full h-full">
          <Group className="flex flex-col gap-3 pt-2">
            <Select
              size={small ? "xs" : "md"}
              radius={8}
              label="Employee Name"
              className="w-full"
              placeholder="Select Employee"
              rightSection={<IconDots onClick={() => setOpenModal(true)} />}
              onClick={() => setOpenModal(true)}
              required
            />
            <Modal opened={openModal} onClose={() => setOpenModal(false)} buttonClose={() => setOpenModal(false)} title="Employee List" size="lg">
              <Flex direction={{ base: "column", sm: "row" }} align="center" gap={10} px={small ? 20 : 30}>
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
                // classNames={{ root: "px-10" }}
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
                // striped={true}
                // highlightOnHover={true}
                // withTableBorder={true}
                // className="select-none"
                // onRowClick={(data: any) => {
                //   handleOptionSelect(data.record);
                // }}
                // page={1}
                // onPageChange={() => {}}
                // totalRecords={10}
                // recordsPerPage={5}
                // paginationText={({ totalRecords }) => `${totalRecords} items found in (0.225) seconds`}
                // styles={{
                //   header: {
                //     color: "rgba(109, 109, 109, 0.6)",
                //     fontWeight: 500,
                //   },
                //   root: {
                //     color: "rgba(0, 0, 0, 0.6)",
                //   },
                // }}
              />
            </Modal>
            <Flex className="flex flex-col w-full md:flex-row gap-3 md:gap-5">
              <DatePickerInput size={small ? "xs" : "md"} valueFormat="MM/DD/YYYY" label="From Date" className="w-full" placeholder="mm/dd/yyyy" required />
              <DatePickerInput size={small ? "xs" : "md"} valueFormat="MM/DD/YYYY" label="To Date" className="w-full" placeholder="mm/dd/yyyy" required />
            </Flex>
            <Flex className="flex flex-col w-full md:flex-row gap-3 md:gap-5">
              <Select size={small ? "xs" : "md"} label="Request Schedule" className="w-full" placeholder="Same Day" rightSection={"▼"} required />
              <TextInput size={small ? "xs" : "md"} label="Reference No." placeholder="0000-0000-0000" className="w-full" />
            </Flex>
            <Checkbox label="Rest Day" radius="xs" className="select-none w-full items-start cursor-pointer" />
            <TextArea size={small ? "xs" : "lg"} required label="Reason" className="w-full" maxLength={250} />
            <FileAttachment />
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
