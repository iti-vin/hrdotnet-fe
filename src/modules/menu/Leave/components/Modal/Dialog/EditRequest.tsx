import "mantine-datatable/styles.layer.css";
import { Flex, Stack, Tooltip, useMatches } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconCaretDownFilled } from "@tabler/icons-react";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import useLeaveStore from "../../../store/LeaveStore";
import { cloneElement, useState } from "react";
import { useForm } from "@mantine/form";
import { UpdateData, UpdateInitialData } from "../../../models/request";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { LeaveServices } from "../../../services/main";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Alert from "@/layout/main/alert";
import { LeaveTypes } from "./assets/leave-types";

import { Button, DateRangePickerInput, FileAttachment, Modal, NumberInput, TextInput, TextArea, Select } from "@shared/components";
import ReferenceNoInput from "@shared/components/ReferenceInput";

export default function EditRequest() {
  const { openDialog, setOpenDialog, viewItems, openAlert, setOpenAlert, setError } = useLeaveStore();
  const queryClient = useQueryClient();
  const [dateFiled, setDateFiled] = useState<[string | null, string | null]>([null, null]);
  const [selectedLeaveType, setSelectedLeaveType] = useState(viewItems.filing.leaveParameter.name);
  const slidesNum = useMatches({ base: 1, xs: 2, sm: 3, md: 5 });
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

  const { leaveOption } = useLeaveStore();
  return (
    <>
      <Modal
        title="Edit Request"
        size="60%"
        opened={"EditRequest" === openDialog}
        onClose={() => setOpenDialog("")}
        buttonClose={() => setOpenDialog("")}
        formProps={{
          onSubmit: editForm.onSubmit(handleConfirm),
        }}
        footer={
          <Button type="submit" variant="gradient" radius="md" size="md" w={100} h={35}>
            UPDATE
          </Button>
        }>
        <Stack className="w-full h-full">
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
            <ReferenceNoInput
              code="edit-request"
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
            <DateRangePickerInput
              fl="Leave Dates"
              required
              dateValue={dateFiled}
              setDateValue={(value) => {
                setDateFiled(value);
              }}
            />
            <NumberInput code="duration" radius="md" size="md" label="Duration" value={viewItems.filing.numberOfDays} disabled className="w-1/2" />
          </div>
          <TextArea
            size="xl"
            radius="md"
            label="Reason"
            placeholder="Briefly state the reasons for filing leave."
            key={editForm.key("Reason")}
            {...editForm.getInputProps("Reason")}
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
        </Stack>
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
