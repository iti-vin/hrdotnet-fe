import "mantine-datatable/styles.layer.css";
import { Flex, Select, Stack, Tooltip, useMatches } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconCaretDownFilled } from "@tabler/icons-react";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import useLeaveStore from "../../../store/LeaveStore";
import { cloneElement, useState } from "react";
import { useForm } from "@mantine/form";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { CreateData } from "../../../models/request";
import { useMutation } from "@tanstack/react-query";
import { LeaveServices } from "../../../services/main";
import { queryClient } from "@/services/client";
import { LeaveTypes } from "./assets/leave-types";

import { Button, DateRangePickerInput, FileAttachment, Modal, NumberInput, TextInput } from "@shared/components";
import ReferenceNoInput from "@shared/components/ReferenceInput";

export default function NewRequest() {
  const { openDialog, setOpenDialog, setError } = useLeaveStore();
  const [dateFiled, setDateFiled] = useState<[string | null, string | null]>([null, null]);
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
  const slidesNum = useMatches({ base: 1, xs: 2, sm: 3, md: 5 });
  const size = useMatches({ base: "100%", sm: "50%" });
  const { leaveOption } = useLeaveStore();
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
    <Modal
      title="New Request"
      size={size}
      opened={"NewRequest" === openDialog}
      onClose={() => setOpenDialog("")}
      buttonClose={() => setOpenDialog("")}
      formProps={{ onSubmit: newForm.onSubmit(handleSubmit) }}
      footer={
        <Button type="submit" variant="gradient" radius="md" size="md" w={100} h={35}>
          SUBMIT
        </Button>
      }>
      <Stack className="flex flex-col gap-4" style={{ color: "#6D6D6D", maxWidth: "100%" }}>
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
        <Stack className="w-full h-auto">
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
            <ReferenceNoInput size="md" radius="md" label="Reference Number" placeholder="Input Refence Number (if necessary)" className="w-full sm:w-1/2" />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-end sm:gap-8">
            <DateRangePickerInput
              fl="Leave Dates"
              fp="Date From"
              sp="Date To"
              dateValue={dateFiled}
              setDateValue={(value) => {
                setDateFiled(value);
              }}
              gap={10}
            />
            <NumberInput code="duration" radius="md" size="md" label="Duration" disabled className="w-1/2" value={String(0)} />
          </div>
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
      </Stack>
    </Modal>
  );
}
