import "mantine-datatable/styles.layer.css";
import { Button, Select, Stack, Textarea, TextInput, Tooltip } from "@mantine/core";
import { Text } from "@mantine/core";
import {
  IconBriefcase,
  IconCake,
  IconCalendarClock,
  IconCaretDownFilled,
  IconCircleCheck,
  IconFaceMask,
  IconGrave2,
  IconMoodKid,
  IconUrgent,
  IconVenus,
} from "@tabler/icons-react";
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
import { useForm } from "@mantine/form";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { calculateTwoDate } from "@shared/hooks/useCount";
import { CreateData } from "../../../models/request";
import { useMutation } from "@tanstack/react-query";
import { LeaveServices } from "../../../services/main";
import { queryClient } from "@/services/client";

export default function NewRequest() {
  const { openDialog, setOpenDialog, dateFiled, setDateFiled, setError } = useLeaveStore();
  const slidesNum = useMatches({
    base: 1,
    xs: 2,
    sm: 3,
    md: 4,
  });
  const iconStyle = { width: "rem(100)", height: "rem(100)", stroke: "1.5" };
  const leaveTypes = [
    { count: 0, label: "VACATION LEAVE", icon: <IconBriefcase size={75} style={iconStyle} className="mb-2" /> },
    { count: 0, label: "SICK LEAVE", icon: <IconFaceMask size={75} style={iconStyle} className="mb-2" /> },
    { count: 0, label: "EMERGENCY Leave", icon: <IconUrgent size={75} style={iconStyle} className="mb-2" /> },
    { count: 0, label: "BIRTHDAY LEAVE", icon: <IconCake size={75} style={iconStyle} className="mb-2" /> },
    { count: 0, label: "LEAVE WITHOUT PAY", icon: <IconCircleCheck style={iconStyle} size={75} className="mb-2" /> },
    { count: 0, label: "BEREAVEMENT LEAVE", icon: <IconGrave2 size={75} style={iconStyle} className="mb-2" /> },
    { count: 0, label: "MATERNITY LEAVE", icon: <IconMoodKid size={75} style={iconStyle} className="mb-2" /> },
    { count: 0, label: "SSS ALLOCATION LEAVE", icon: <p style={{ fontSize: "2.6rem", color: "#559cda", fontWeight: "600", width: "4rem", textAlign: "center" }}>SSS</p> },
    { count: 0, label: "MAGNA CARTA", icon: <IconVenus size={75} style={iconStyle} className="mb-2" /> },
    { count: 7, label: "COMPENSATORY TIME OFF", icon: <IconCalendarClock size={75} style={iconStyle} /> },
  ];

  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const newForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      DateFiled: { DateFrom: "", DateTo: "" },
      LeaveParameter: { Id: 0, Code: "", Name: "" },
      LeaveOption: {
        Id: 0,
        Name: "",
        Type: "",
        Amount: "",
      },
      Reason: "",
      ReferenceNo: "",
      FileAttachment: "",
    },
  });

  const { leaveOption, leaveType } = useLeaveStore();
  const { mutate: createLeave } = useMutation({
    mutationFn: async (values: typeof newForm.values) => {
      const formattedValues = {
        ...values,
        DateFiled: {
          DateFrom: DateTimeUtils.dateTZToWithTZAddDay(new Date(`${dateFiled[0]}`).toISOString()),
          DateTo: DateTimeUtils.dateTZToWithTZAddDay(new Date(`${dateFiled[1]}`).toISOString()),
        },
      };
      const formData = CreateData(formattedValues);
      return LeaveServices.createLeaveRequest(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request_leave"] });
      setOpenDialog("");
      newForm.setValues({});
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });
  const handleSubmit = (data: typeof newForm.values) => {
    createLeave(data);
  };
  return (
    <Modal title="New Request" size="80%" opened={"NewRequest" === openDialog} onClose={() => setOpenDialog("")} buttonClose={() => setOpenDialog("")}>
      <form onSubmit={newForm.onSubmit(handleSubmit)}>
        <Stack className="w-full h-full">
          <ScrollArea className="flex flex-col gap-5 mt-3 w-full text-[#6d6d6d] relative" h={650} styles={{ scrollbar: { display: "none" } }}>
            <Stack className="w-full h-auto">
              <Text className="font-medium">Select Available Leave Type</Text>
              <Carousel slideSize={{ base: "70%", xs: "50%", sm: "33.333%", md: "20%" }} slideGap={{ base: "sm" }} slidesToScroll={slidesNum}>
                {leaveTypes.map((leave, index) => {
                  const selectedItem = leaveType.find((item) => item.name === leave.label);
                  if (selectedItem) {
                    return (
                      <Tooltip key={index} label={leave.label} style={{ background: "gray", color: "white" }} className="shadow-xl">
                        <Carousel.Slide>
                          <div
                            className={`unselectedLeaveType ${leave.label === selectedLeaveType ? "selectedLeaveType " : ""}`}
                            onClick={() => {
                              setSelectedLeaveType(leave.label);
                              newForm.setValues({
                                LeaveParameter: {
                                  Id: selectedItem.id,
                                  Name: selectedItem.name,
                                  Code: selectedItem.code,
                                },
                              });
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
                              <Text style={{ fontSize: "2.2rem" }}>
                                {leave.count}
                                {selectedItem.id}
                              </Text>
                            </>
                          </div>
                        </Carousel.Slide>
                      </Tooltip>
                    );
                  } else return null;
                })}
              </Carousel>
            </Stack>

            <TextInput size="md" label="Leave Type" placeholder="" className="w-full" key={newForm.key("LeaveParameter.Name")} {...newForm.getInputProps("LeaveParameter.Name")} />
            <div className="flex flex-col sm:flex-row gap-4 justify-between sm:gap-8 w-full">
              <Select
                withAsterisk
                size="md"
                radius="md"
                label="Leave Option"
                placeholder="Select Leave Option"
                data={leaveOption.map((item) => ({ value: item.id.toString(), label: item.name }))}
                onChange={(selectedValue) => {
                  const selectedItem = leaveOption.find((item) => item.id.toString() === selectedValue);
                  if (selectedItem) {
                    newForm.setValues(() => ({
                      LeaveOption: {
                        Id: selectedItem.id,
                        Name: selectedItem.name,
                        Type: selectedItem.type,
                        Amount: selectedItem.amount,
                      },
                    }));
                  }
                }}
                className="w-full sm:w-1/2"
                rightSection={<IconCaretDownFilled size={18} />}
              />
              <TextInput size="md" radius="md" label="Reference Number" placeholder="Input Refence Number (if necessary)" className="w-full sm:w-1/2" />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-end sm:gap-8">
              <DateRangePicker
                fl="Leave Dates"
                dateProps={dateFiled}
                setDateProps={(newValue: [Date, Date]) => {
                  setDateFiled(newValue);
                }}
              />
              <TextInput radius="md" size="md" label="Duration" disabled className="w-1/2" value={String(calculateTwoDate(dateFiled))} />
            </div>

            <div className="flex flex-col gap-2">
              <Text>
                Reason <span className="text-red-400 font-medium">*</span>
              </Text>
              <Textarea size="xl" radius="md" placeholder="Briefly state the reasons for filing leave." key={newForm.key("Reason")} {...newForm.getInputProps("Reason")} />
            </div>

            <div className="flex flex-col gap-2 rounded-lg">
              <Dropzone />
            </div>
          </ScrollArea>
        </Stack>
        <Stack className="flex flex-col justify-end mt-3">
          <Button type="submit" className="w-2/4 sm:w-2/5 md:w-1/6  br-gradient self-end border-none" radius="md" size="md">
            SUBMIT
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
