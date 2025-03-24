import "mantine-datatable/styles.layer.css";
import { Button, Select, Stack, Textarea, TextInput, Tooltip } from "@mantine/core";
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
import { useForm } from "@mantine/form";
import { UpdateData, UpdateInitialData } from "../../../models/request";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { LeaveServices } from "../../../services/main";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Alert from "@/layout/main/alert";

export default function EditRequest() {
  const { openDialog, setOpenDialog, viewItems, dateFiled, setDateFiled, openAlert, setOpenAlert, setError } = useLeaveStore();
  const queryClient = useQueryClient();
  const slidesNum = useMatches({
    base: 1,
    xs: 2,
    sm: 3,
    md: 5,
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
  ];
  const [selectedLeaveType, setSelectedLeaveType] = useState(viewItems.filing.leaveParameter.name);

  const editForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      UploadedFile: "",
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

  const { mutate: updateLeave } = useMutation({
    mutationFn: async (values: typeof editForm.values) => {
      const formattedValues = {
        ...values,
        ...UpdateInitialData(viewItems),
        UploadedFile: "",
        DateFiled: {
          DateFrom: values.DateFiled.DateFrom ? DateTimeUtils.dateTZToWithTZAddDay(new Date(`${dateFiled[0]}`).toISOString()) : viewItems.filing.dateFiled.dateFrom,
          DateTo: values.DateFiled.DateTo ? DateTimeUtils.dateTZToWithTZAddDay(new Date(`${dateFiled[1]}`).toISOString()) : viewItems.filing.dateFiled.dateTo,
        },
        LeaveParameter: {
          Id: values.LeaveParameter.Id ? values.LeaveParameter.Id : viewItems.filing.leaveParameter.id,
          Code: values.LeaveParameter.Code ? values.LeaveParameter.Code : viewItems.filing.leaveParameter.code!,
          Name: values.LeaveParameter.Name ? values.LeaveParameter.Name : viewItems.filing.leaveParameter.name,
        },
        LeaveOption: {
          Id: values.LeaveOption.Id ? values.LeaveOption.Id : viewItems.filing.leaveOption.id,
          Name: values.LeaveOption.Name ? values.LeaveOption.Name : viewItems.filing.leaveOption.name,
          Type: values.LeaveOption.Type ? values.LeaveOption.Type : viewItems.filing.leaveOption.type,
          Amount: values.LeaveOption.Amount ? values.LeaveOption.Amount : viewItems.filing.leaveOption.amount,
        },
        Reason: values.Reason ?? viewItems.filing.reason,
        FileAttachment: values.FileAttachment ?? "",
      };

      const formData = UpdateData(formattedValues);
      return LeaveServices.updateLeaveRequest(viewItems.filing.id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request_leave"] });
    },
    onError: (error: any) => {
      setError(error.response.data.title ? error.response.data.title : "Internal Server Error");
    },
  });
  const [data, setData] = useState<typeof editForm.values>({ ...editForm.values });
  const handleConfirm = async (values: typeof editForm.values) => {
    setOpenDialog("");
    setOpenAlert("Update");
    setData(values);
  };

  const handleUpdate = () => {
    updateLeave(data);
    setOpenAlert("");
  };

  const { leaveOption, leaveType } = useLeaveStore();
  return (
    <>
      <Modal title="Edit Request" size="80%" opened={"EditRequest" === openDialog} onClose={() => setOpenDialog("")} buttonClose={() => setOpenDialog("")}>
        <form onSubmit={editForm.onSubmit(handleConfirm)}>
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
                              className={`unselectedLeaveType ${leave.label === selectedLeaveType ? "selectedLeaveType" : ""}`}
                              onClick={() => {
                                setSelectedLeaveType(leave.label);
                                editForm.setValues({
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
                                <Text style={{ fontSize: "2.2rem" }}>{leave.count}</Text>
                              </>
                            </div>
                          </Carousel.Slide>
                        </Tooltip>
                      );
                    } else return null;
                  })}
                </Carousel>
              </Stack>

              <TextInput
                size="md"
                label="Leave Type"
                placeholder={viewItems.filing.leaveParameter.name}
                className="w-full"
                readOnly
                key={editForm.key("LeaveParameter.Name")}
                {...editForm.getInputProps("LeaveParameter.Name")}
              />

              <div className="flex flex-col sm:flex-row gap-4 justify-between sm:gap-8 w-full">
                <Select
                  withAsterisk
                  size="md"
                  radius="md"
                  label="Leave Option"
                  placeholder={viewItems.filing.leaveOption.name}
                  data={leaveOption.map((item) => ({ value: item.id.toString(), label: item.name }))}
                  onChange={(selectedValue) => {
                    const selectedItem = leaveOption.find((item) => item.id.toString() === selectedValue);
                    if (selectedItem) {
                      editForm.setValues(() => ({
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
                <TextInput
                  size="md"
                  radius="md"
                  label="Reference Number"
                  placeholder="Input Refence Number (if necessary)"
                  className="w-full sm:w-1/2"
                  key={editForm.key("ReferenceNo")}
                  {...editForm.getInputProps("ReferenceNo")}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-end sm:gap-8">
                <DateRangePicker
                  fl="Leave Dates"
                  dateProps={dateFiled}
                  setDateProps={(newValue: [Date, Date]) => {
                    setDateFiled(newValue);
                  }}
                />
                <TextInput radius="md" size="md" label="Duration" value={viewItems.filing.numberOfDays} disabled className="w-1/2" />
              </div>

              <div className="flex flex-col gap-2">
                <Text>
                  Reason <span className="text-red-400 font-medium">*</span>
                </Text>
                <Textarea size="xl" radius="md" placeholder="Briefly state the reasons for filing leave." key={editForm.key("Reason")} {...editForm.getInputProps("Reason")} />
              </div>

              <div className="flex flex-col gap-2 rounded-lg">
                <Dropzone />
              </div>
            </ScrollArea>
          </Stack>
          <Stack className="flex flex-col justify-end mt-3">
            <Button type="submit" className="w-2/4 sm:w-2/5 md:w-1/6  br-gradient self-end border-none" radius="md" size="md">
              UPDATE
            </Button>
          </Stack>
        </form>
      </Modal>
      <Alert
        opened={openAlert === "Update"}
        onClose={() => setOpenAlert("")}
        headerTitle="Update Request"
        size="lg"
        icon="Warning"
        title="Are you sure you want to update this request? This will override your existing filling details."
        description="Filing deadline for this cutoff period will end in a day."
        yes={{
          onClick: () => handleUpdate(),
        }}
        no={{
          onClick: () => setOpenAlert(""),
        }}
      />
    </>
  );
}
