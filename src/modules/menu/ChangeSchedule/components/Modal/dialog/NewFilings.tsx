/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import {
  Button,
  Checkbox,
  Flex,
  Group,
  Popover,
  ScrollArea,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
//--- Shared Modules
import { Dropzone } from "@shared/template";
import Modal from "@/layout/main/dialog/Modal";
//--- Icons
import { IconCaretDownFilled, IconDots, IconReload } from "@tabler/icons-react";
import { ModalProps } from "@shared/assets/types/Modal";
import { useState } from "react";
import { DataTable } from "mantine-datatable";
import { useChangeOfScheduleStore } from "../../../store";

export default function NewFilings({ opened, onClose, buttonClose }: ModalProps) {
  const small = useMediaQuery("(max-width: 40em)");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { setOpenDialog, setOpenConfirmation } = useChangeOfScheduleStore();

  return (
    <Modal title="New Filings" size="80%" opened={opened} onClose={onClose} buttonClose={buttonClose}>
      <form className="relative">
        <Stack className="w-full h-full">
          <ScrollArea
            px={small ? 20 : 30}
            className="flex flex-col mt-3 w-full text-[#6d6d6d] relative"
            h={650}
            styles={{ scrollbar: { display: "none" } }}>
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
              <Modal
                opened={openModal}
                onClose={() => setOpenModal(false)}
                buttonClose={() => setOpenModal(false)}
                title="Employee List"
                size="lg">
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
                      <IconReload
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
                  classNames={{ root: "px-10" }}
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
              <Flex className="flex flex-col w-full md:flex-row gap-3 md:gap-5">
                <DatePickerInput
                  size={small ? "xs" : "md"}
                  valueFormat="MM/DD/YYYY"
                  label="From Date"
                  className="w-full"
                  placeholder="mm/dd/yyyy"
                  radius={8}
                  required
                />
                <DatePickerInput
                  size={small ? "xs" : "md"}
                  valueFormat="MM/DD/YYYY"
                  label="To Date"
                  className="w-full"
                  placeholder="mm/dd/yyyy"
                  radius={8}
                  required
                />
              </Flex>
              <Flex className="flex flex-col w-full md:flex-row gap-3 md:gap-5">
                <Select
                  size={small ? "xs" : "md"}
                  radius={8}
                  label="Request Schedule"
                  className="w-full"
                  placeholder="Same Day"
                  rightSection={"▼"}
                  required
                />
                <TextInput
                  size={small ? "xs" : "md"}
                  radius={8}
                  label="Reference No."
                  placeholder="0000-0000-0000"
                  className="w-full"
                />
              </Flex>
              <Checkbox label="Rest Day" radius="xs" className="select-none w-full items-start cursor-pointer" />
              <Textarea
                size={small ? "xs" : "lg"}
                radius={8}
                required
                label="Reason"
                className="w-full"
                maxLength={250}
              />
              <Dropzone />
            </Group>
          </ScrollArea>
        </Stack>
        <Stack className="pt-5 flex flex-row justify-end" px={small ? 20 : 30}>
          <Button
            size="md"
            className="w-44 border-none custom-gradient rounded-md"
            onClick={() => {
              setOpenDialog("");
              setOpenConfirmation("SummaryDetails");
            }}>
            SUBMIT
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
