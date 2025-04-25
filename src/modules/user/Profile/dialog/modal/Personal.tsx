/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Modal from "@/layout/main/dialog/UpdatedModal";
import { Button, Flex, ScrollArea, Select, Stack, TextInput, useMatches } from "@mantine/core";
import { ModalProps } from "@shared/assets/types/Modal";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { Fragment } from "react";

export default function UpdatePersonal({ opened, onClose, buttonClose }: ModalProps) {
  const size = useMatches({ base: "100%", sm: "70%" });
  return (
    <Fragment>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        size={size}
        buttonClose={buttonClose}
        title="Update Personal Information">
        <form onSubmit={undefined}>
          <Stack className="w-full h-full">
            <ScrollArea
              className="flex flex-col mt-3 w-full text-[#6d6d6d] relative  px-10"
              h={650}
              styles={{ scrollbar: { display: "block" } }}>
              <Flex className="w-full gap-4 lg:gap-5 flex flex-col lg:flex-row">
                <Flex className="w-full lg:w-1/2 flex flex-col gap-4">
                  <Select
                    size="md"
                    placeholder="Select Nationality"
                    label="Nationality"
                    radius={8}
                    data={["Next Day", "Same Day"]}
                    classNames={{ input: "poppins" }}
                    rightSection={<IconCaretDownFilled size={18} onClick={() => {}} />}
                    className="border-none w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="Birthdate"
                    placeholder="August 12, 2002"
                    disabled
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <Select
                    size="md"
                    placeholder="Select Gender"
                    label="Gender"
                    radius={8}
                    data={["Next Day", "Same Day"]}
                    classNames={{ input: "poppins" }}
                    rightSection={<IconCaretDownFilled size={18} onClick={() => {}} />}
                    className="border-none w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <Select
                    size="md"
                    placeholder="Select Status"
                    label="Civil Status"
                    radius={8}
                    data={["Next Day", "Same Day"]}
                    classNames={{ input: "poppins" }}
                    rightSection={<IconCaretDownFilled size={18} onClick={() => {}} />}
                    className="border-none w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="Weight"
                    placeholder="Weight in KG"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="Phone Number"
                    placeholder="Height in CM"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Flex>
                <Flex className="w-full lg:w-1/2 flex flex-col gap-4">
                  <Select
                    size="md"
                    placeholder="Select Citizenship"
                    label="Citizenship"
                    radius={8}
                    data={["Next Day", "Same Day"]}
                    classNames={{ input: "poppins" }}
                    rightSection={<IconCaretDownFilled size={18} onClick={() => {}} />}
                    className="border-none w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <Select
                    size="md"
                    placeholder="Select City"
                    label="Birthplace"
                    radius={8}
                    data={["Next Day", "Same Day"]}
                    classNames={{ input: "poppins" }}
                    rightSection={<IconCaretDownFilled size={18} onClick={() => {}} />}
                    className="border-none w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <Select
                    size="md"
                    placeholder="Select Type"
                    label="Blood Type"
                    radius={8}
                    data={["Next Day", "Same Day"]}
                    classNames={{ input: "poppins" }}
                    rightSection={<IconCaretDownFilled size={18} onClick={() => {}} />}
                    className="border-none w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <Select
                    size="md"
                    placeholder="Select Religion"
                    label="Religion"
                    radius={8}
                    data={["Next Day", "Same Day"]}
                    classNames={{ input: "poppins" }}
                    rightSection={<IconCaretDownFilled size={18} onClick={() => {}} />}
                    className="border-none w-full"
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="Height"
                    placeholder="Height in CM"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="Email Address"
                    placeholder="Type a valid Email Address"
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
