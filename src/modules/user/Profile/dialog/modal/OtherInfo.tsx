/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Modal from "@/layout/main/dialog/UpdatedModal";
import { Button, Flex, ScrollArea, Stack, TextInput, useMatches } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { ModalProps } from "@shared/assets/types/Modal";
import { IconCalendar } from "@tabler/icons-react";
import { Fragment } from "react";

export default function UpdateOtherInfo({ opened, onClose, buttonClose }: ModalProps) {
  const size = useMatches({ base: "100%", sm: "70%" });
  return (
    <Fragment>
      <Modal opened={opened} onClose={onClose} buttonClose={buttonClose} size={size} title="Update Other Information">
        <form onSubmit={undefined}>
          <Stack className="w-full h-full">
            <ScrollArea
              className="flex flex-col mt-3 w-full text-[#6d6d6d] relative  px-10"
              h={650}
              styles={{ scrollbar: { display: "block" } }}>
              <Flex className="w-full flex flex-col gap-5">
                <Flex className="w-full flex flex-col lg:flex-row gap-4 lg:gap-5">
                  <TextInput
                    size="md"
                    radius={8}
                    label="Spouse's Name"
                    placeholder="Input Name"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <DateInput
                    size="md"
                    radius={8}
                    label="Spouse's Birth Date"
                    placeholder="Select Date"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    rightSection={<IconCalendar />}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="Spouse's Occupation"
                    placeholder="Input Occupation"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="Spouse's Employer"
                    placeholder="Input Employer"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Flex>
                <Flex className="w-full flex flex-col lg:flex-row gap-4 lg:gap-5">
                  <TextInput
                    size="md"
                    radius={8}
                    label="Father's Name"
                    placeholder="Input Name"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <DateInput
                    size="md"
                    radius={8}
                    label="Father's Birth Date"
                    placeholder="Select Date"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    rightSection={<IconCalendar />}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="Father's Occupation"
                    placeholder="Input Occupation"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Flex>
                <Flex className="w-full flex flex-col lg:flex-row gap-4 lg:gap-5">
                  <TextInput
                    size="md"
                    radius={8}
                    label="Mother's Name"
                    placeholder="Input Name"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <DateInput
                    size="md"
                    radius={8}
                    label="Mother's Birth Date"
                    placeholder="Select Date"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    rightSection={<IconCalendar />}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="Mother's Occupation"
                    placeholder="Input Occupation"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Flex>
              </Flex>
            </ScrollArea>
          </Stack>
          <Stack className="flex flex-col justify-end mt-3 px-10">
            <Button type="submit" className="w-auto  br-gradient self-end border-none" radius="md" size="md">
              SAVE
            </Button>
          </Stack>
        </form>
      </Modal>
    </Fragment>
  );
}
