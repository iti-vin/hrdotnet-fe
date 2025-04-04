/**
 * @version    HRDOffsetNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Fragment } from "react";
import Modal from "@/layout/main/dialog/Modal";
import Dropzone from "@shared/template/Dropzone";
import { Button, Flex, Group, ScrollArea, Select, Stack, Text, Textarea, TextInput, useMatches } from "@mantine/core";
import { IconCalendarClock, IconCaretDownFilled } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { ModalProps } from "@shared/assets/types/Modal";
import { useForm } from "@mantine/form";

export default function EditRequest({ opened, onClose, buttonClose }: ModalProps) {
  const size = useMatches({ base: "100%", sm: "70%" });

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
      <Modal opened={opened} onClose={onClose} centered size={size} buttonClose={buttonClose} title="Edit Request">
        <form onSubmit={undefined}>
          <Stack className="w-full h-full">
            <ScrollArea
              px={20}
              className="flex flex-col mt-3 w-full text-[#6d6d6d] relative"
              h={650}
              styles={{ scrollbar: { display: "none" } }}>
              <Group className="w-full">
                <Flex className="w-full bg-[#559cda] py-2 rounded-lg flex flex-row justify-center items-center gap-2">
                  <IconCalendarClock color="white" />
                  <Text className="text-center text-white text-md font-medium">Total Credits: 13.5</Text>
                </Flex>
                <Flex direction={{ base: "column", sm: "row" }} className="w-full" gap={20} align="end">
                  <DateInput
                    size="md"
                    value={new Date()}
                    onChange={() => {}}
                    label="Duration"
                    placeholder="Start Date"
                    withAsterisk
                    radius={8}
                    className="border-none w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <DateInput
                    size="md"
                    value={new Date()}
                    onChange={() => {}}
                    placeholder="End Date"
                    withAsterisk
                    radius={8}
                    className="border-none w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Flex>
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
                  <TextInput
                    size="md"
                    radius={8}
                    label="Reference No."
                    placeholder="Input Reference Number(if necessary)"
                    withAsterisk
                    className="w-full"
                    max={14}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Flex>

                <Textarea
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

                <Dropzone />
              </Group>
            </ScrollArea>
          </Stack>
          <Stack className="flex flex-col justify-end mt-3">
            <Button
              type="submit"
              className="w-2/4 sm:w-2/5 md:w-1/6  br-gradient self-end border-none"
              radius="md"
              size="md">
              SUBMIT
            </Button>
          </Stack>
        </form>
      </Modal>
    </Fragment>
  );
}
