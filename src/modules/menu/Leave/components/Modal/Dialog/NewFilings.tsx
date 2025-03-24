import "mantine-datatable/styles.layer.css";
import { Button, Select, Textarea, TextInput, Tooltip } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconBriefcase, IconCake, IconCaretDownFilled, IconCircleCheck, IconFaceMask, IconGrave2, IconMoodKid, IconUrgent, IconVenus } from "@tabler/icons-react";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import Dropzone from "@shared/template/Dropzone";
import { useMatches, ScrollArea } from "@mantine/core";
import Modal from "@/layout/main/dialog/Modal";
import DateRangePicker from "@shared/template/DateRange";
import useLeaveStore from "../../../store/LeaveStore";
import { cloneElement, useState } from "react";

export default function NewFilings() {
  const { openDialog, setOpenDialog } = useLeaveStore();
  const slidesNum = useMatches({
    base: 1,
    xs: 2,
    sm: 3,
    md: 5,
  });
  const iconStyle = { width: "rem(100)", height: "rem(100)", stroke: "1.5" };

  const leaveTypes = [
    { count: 6, label: "Vacation Leave", icon: <IconBriefcase size={75} style={iconStyle} className="mb-2" /> },
    { count: 3, label: "Sick Leave", icon: <IconFaceMask size={75} style={iconStyle} className="mb-2" /> },
    { count: 2, label: "Emergency Leave", icon: <IconUrgent size={75} style={iconStyle} className="mb-2" /> },
    { count: 1, label: "Birthday Leave", icon: <IconCake size={75} style={iconStyle} className="mb-2" /> },
    { count: 6, label: "Leave Without Pay", icon: <IconCircleCheck style={iconStyle} size={75} className="mb-2" /> },
    { count: 16, label: "Bereavement Leave", icon: <IconGrave2 size={75} style={iconStyle} className="mb-2" /> },
    { count: 7, label: "Maternity Leave", icon: <IconMoodKid size={75} style={iconStyle} className="mb-2" /> },
    { count: 1, label: "SSS Allocation Leave", icon: <p style={{ fontSize: "2.6rem", color: "#559cda", fontWeight: "600", width: "4rem", textAlign: "center" }}>SSS</p> },
    { count: 6, label: "Magna Carta", icon: <IconVenus size={75} style={iconStyle} className="mb-2" /> },
  ];

  const [selectedLeaveType, setSelectedLeaveType] = useState<string>("");
  // const { leaveType, leaveOption } = useLeaveStore();

  return (
    <Modal title="New Filings" size="80%" opened={"NewFilings" === openDialog} onClose={() => setOpenDialog("")} buttonClose={() => setOpenDialog("")}>
      <ScrollArea className="flex flex-col gap-5 mt-3 w-full text-[#6d6d6d] relative" h={650} styles={{ scrollbar: { display: "none" } }}>
        <div className="flex flex-col gap-4 overflow-hidden" style={{ color: "#6D6D6D" }}>
          <Select size="md" label="Employee Name" placeholder="" className="w-full" />
          <div>
            <Text className="font-medium">Select Available Leave Type</Text>
            <Carousel slideSize={{ base: "70%", xs: "50%", sm: "33.333%", md: "20%" }} slideGap={{ base: "sm", lg: "xl" }} slidesToScroll={slidesNum}>
              {leaveTypes.map((leave, index) => (
                <Tooltip key={index} label={leave.label} style={{ background: "gray", color: "white" }} className="shadow-xl">
                  <Carousel.Slide>
                    <div
                      className={`unselectedLeaveType ${leave.label === selectedLeaveType ? "selectedLeaveType " : ""}`}
                      onClick={() => {
                        setSelectedLeaveType(leave.label);
                      }}>
                      <>
                        {cloneElement(leave.icon, {
                          style: {
                            ...leave.icon.props.style,
                            color: leave.label === selectedLeaveType ? "white" : "#559cda",
                          },
                          size: 75,
                          color: leave.label === selectedLeaveType ? "white" : "#559cda",
                        })}
                        <Text style={{ fontSize: "2.2rem" }}>{leave.count}</Text>
                      </>
                    </div>
                  </Carousel.Slide>
                </Tooltip>
              ))}
            </Carousel>
          </div>

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
            <DateRangePicker fl="Leave Dates" dateProps={[new Date(), new Date()]} setDateProps={(newValue: [Date, Date]) => console.log(newValue)} />
            <TextInput radius="md" size="md" label="Duration" value="8 Days" disabled className="w-1/2" />
          </div>

          <div className="flex flex-col gap-2">
            <Text>
              Reason <span className="text-red-400 font-medium">*</span>
            </Text>
            <Textarea size="xl" radius="md" placeholder="Briefly state the reasons for filing leave." />
          </div>

          <div className="flex flex-col gap-2 rounded-lg">
            <Dropzone />
          </div>

          <Button className="w-2/4 sm:w-2/5 md:w-1/6  br-gradient self-end border-none" radius="md" size="md">
            SUBMIT
          </Button>
        </div>
      </ScrollArea>
    </Modal>
  );
}
