/**
 * @version    HRDOffsetNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Fragment, useState } from "react";
import { Flex, Group, Stack, Text, useMatches } from "@mantine/core";
import { IconCalendarClock, IconCaretDownFilled } from "@tabler/icons-react";
import { ModalProps } from "@shared/assets/types/Modal";
import { useForm } from "@mantine/form";
import { Button, DateRangePickerInput, FileAttachment, Modal, Select, TextArea } from "@shared/components";
import ReferenceNoInput from "@shared/components/ReferenceInput";

export default function EditRequest({ opened, onClose, buttonClose }: ModalProps) {
  const size = useMatches({ base: "100%", sm: "50%" });
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
        title="Edit Request"
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
            <Flex className="w-full bg-[#559cda] py-2 rounded-lg flex flex-row justify-center items-center gap-2">
              <IconCalendarClock color="white" />
              <Text className="text-center text-white text-md font-medium">Total Credits: 13.5</Text>
            </Flex>

            <DateRangePickerInput
              size="md"
              dateValue={dateDuration}
              setDateValue={(value) => setDateDuration(value)}
              fl="Duration"
              required
              fp="Start Date"
              sp="End Date"
              className="border-none w-full"
              styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            />
            <Flex direction={{ base: "column", sm: "row" }} className="w-full" gap={20}>
              <Select
                size="md"
                label="Leave Option"
                placeholder="Select Leaave Option"
                withAsterisk
                radius={8}
                rightSection={<IconCaretDownFilled />}
                className="border-none w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
              <ReferenceNoInput
                code="edit-cto"
                size="md"
                radius={8}
                label="Reference No."
                placeholder="Input Reference Number(if necessary)"
                className="w-full"
                max={14}
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
            </Flex>

            <TextArea
              size="md"
              label="Reason"
              placeholder="Briefly state the reason for filing Offset"
              withAsterisk
              className="w-full"
              styles={{
                input: { height: "100px" },
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
