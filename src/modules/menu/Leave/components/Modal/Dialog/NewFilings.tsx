import "mantine-datatable/styles.layer.css";
import { Flex, Popover, Stack, Tooltip, useMatches } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconCaretDownFilled, IconDots, IconReload } from "@tabler/icons-react";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import useLeaveStore from "../../../store/LeaveStore";
import { cloneElement, useState } from "react";
import { LeaveTypes } from "./assets/leave-types";
import { useMediaQuery } from "@mantine/hooks";
import { Button, DateRangePickerInput, FileAttachment, Modal, NumberInput, Select, TextArea, TextInput, PaginatedDataTable as DataTable } from "@shared/components";

export default function NewFilings() {
  const { openDialog, setOpenDialog } = useLeaveStore();
  const small = useMediaQuery("(max-width: 40em)");
  const size = useMatches({ base: "100%", sm: "50%" });
  const slidesNum = useMatches({ base: 1, xs: 2, sm: 3, md: 5 });
  const [selectedLeaveType, setSelectedLeaveType] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <Modal
      title="New Filings"
      size={size}
      opened={"NewFilings" === openDialog}
      onClose={() => setOpenDialog("")}
      buttonClose={() => setOpenDialog("")}
      formProps={{ onSubmit: () => {} }}
      footer={
        <Button type="submit" variant="gradient" radius="md" size="md" w={100} h={35}>
          SUBMIT
        </Button>
      }>
      <Stack className="flex flex-col gap-4" style={{ color: "#6D6D6D", maxWidth: "100%" }}>
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
            onRowClick={(data) => {
              console.log(data.record);
            }}
            page={1}
            onPageChange={() => {}}
            totalRecords={10}
            recordsPerPage={5}
            paginationText={({ totalRecords }) => `${totalRecords} items found in (0.225) seconds`}
          />
        </Modal>
        <Stack className="w-full h-auto p-0">
          <Text className="font-medium">Select Available Leave Type</Text>
          <Carousel slideSize={{ base: "70%", xs: "50%", sm: "33.333%", md: "20%" }} slideGap="lg" initialSlide={slidesNum}>
            {LeaveTypes.map((leave, index) => (
              <Tooltip key={index} label={leave.label}>
                <Carousel.Slide onClick={() => setSelectedLeaveType(leave.label)}>
                  <Stack className={`${leave.label === selectedLeaveType ? "selected" : "unselected"}`}>
                    <Flex className="w-1/2 flex flex-row px-2 justify-between items-center">
                      {cloneElement(leave.icon, {
                        style: {
                          ...leave.icon.props.style,
                          color: leave.label === selectedLeaveType ? "white" : "#559cda",
                        },
                        size: 75,
                        color: leave.label === selectedLeaveType ? "white" : "#559cda",
                      })}
                      <Text style={{ fontSize: "2.2rem" }} c={leave.label === selectedLeaveType ? "white" : "#559cda"}>
                        {leave.count}
                      </Text>
                    </Flex>
                  </Stack>
                </Carousel.Slide>
              </Tooltip>
            ))}
          </Carousel>
        </Stack>

        <TextInput size="md" label="Leave Type" placeholder="" className="w-full"></TextInput>

        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:gap-8">
          <Select
            withAsterisk
            size="md"
            radius="md"
            label="Leave Option"
            data={["Vacation Leave", "Sick Leave", "Emergency Leave", "Birthday Leave"]}
            placeholder="Select Leave Option"
            className="w-full sm:w-1/2"
            rightSection={<IconCaretDownFilled size={18} />}
          />
          <TextInput size="md" radius="md" label="Reference Number" placeholder="Input Refence Number (if necessary)" className="w-full sm:w-1/2" />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-end sm:gap-8">
          <DateRangePickerInput fl="Leave Dates" dateValue={[null, null]} setDateValue={(newValue) => console.log(newValue)} />
          <NumberInput code="duration" radius="md" size="md" label="Duration" value="8 Days" disabled className="w-1/2" />
        </div>

        <TextArea size="xl" radius="md" label="Reason" placeholder="Briefly state the reasons for filing leave." />

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
      </Stack>
    </Modal>
  );
}
