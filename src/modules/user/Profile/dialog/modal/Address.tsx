/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Modal from "@/layout/main/dialog/UpdatedModal";
import { Button, Divider, Flex, ScrollArea, Select, Stack, Text, TextInput, useMatches } from "@mantine/core";
import { ModalProps } from "@shared/assets/types/Modal";
import { IconDots } from "@tabler/icons-react";
import { Fragment } from "react";

export default function UpdateAddress({ opened, onClose, buttonClose }: ModalProps) {
  const size = useMatches({ base: "100%", sm: "70%" });

  return (
    <Fragment>
      <Modal opened={opened} onClose={onClose} buttonClose={buttonClose} size={size} title="Update Address Information">
        <form onSubmit={undefined}>
          <Stack className="w-full h-full">
            <ScrollArea
              className="flex flex-col mt-3 w-full text-[#6d6d6d] relative  px-10"
              h={650}
              styles={{ scrollbar: { display: "block" } }}>
              <Flex className="w-full gap-2 flex flex-col h-full px-2">
                <Flex className="flex flex-col w-full">
                  <Text fz={18} fw={700}>
                    Present Address
                  </Text>
                  <Divider my="sm" size="sm" />
                </Flex>
                <Flex className="w-full flex flex-col lg:flex-row h-full gap-4 lg:gap-10">
                  <Flex className="flex flex-col w-full gap-4">
                    <TextInput
                      size="md"
                      radius={8}
                      label="Unit or House Number"
                      placeholder="Type Here"
                      className="w-full"
                      max={14}
                      classNames={{ input: "poppins" }}
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                    <TextInput
                      size="md"
                      radius={8}
                      label="Subdivision"
                      placeholder="Type Here"
                      className="w-full"
                      max={14}
                      classNames={{ input: "poppins" }}
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                    <Select
                      size="md"
                      placeholder="Select City"
                      label="City"
                      radius={8}
                      data={["Next Day", "Same Day"]}
                      classNames={{ input: "poppins" }}
                      rightSection={<IconDots size={18} onClick={() => {}} />}
                      className="border-none w-full"
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                    <TextInput
                      size="md"
                      radius={8}
                      label="Landline"
                      placeholder="Type Here"
                      className="w-full"
                      max={14}
                      classNames={{ input: "poppins" }}
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                  </Flex>
                  <Flex className="flex flex-col w-full  gap-4">
                    <TextInput
                      size="md"
                      radius={8}
                      label="Street"
                      placeholder="Type Here"
                      className="w-full"
                      max={14}
                      classNames={{ input: "poppins" }}
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                    <Select
                      size="md"
                      placeholder="Select Barangay"
                      label="Barangay"
                      radius={8}
                      data={["Next Day", "Same Day"]}
                      classNames={{ input: "poppins" }}
                      rightSection={<IconDots size={18} onClick={() => {}} />}
                      className="border-none w-full"
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                    <Select
                      size="md"
                      placeholder="Select"
                      label="Zipcode"
                      radius={8}
                      data={["Next Day", "Same Day"]}
                      classNames={{ input: "poppins" }}
                      rightSection={<IconDots size={18} onClick={() => {}} />}
                      className="border-none w-full"
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                    <TextInput
                      size="md"
                      radius={8}
                      label="Mobile Number"
                      placeholder="Type Here"
                      className="w-full"
                      max={14}
                      classNames={{ input: "poppins" }}
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                  </Flex>
                </Flex>
                <Flex className="flex flex-col w-full">
                  <Text fz={18} fw={700} className="flex flex-col md:flex-row items-center gap-2 md:gap-4 lg:gap-10">
                    Permanent Address
                    <Text fz={12} c="#559cda" fw={600}>
                      Same as present address
                    </Text>
                  </Text>
                  <Divider my="sm" size="sm" />
                </Flex>
                <Flex className="w-full flex flex-col lg:flex-row h-full gap-4">
                  <Flex className="flex flex-col w-full gap-4">
                    <TextInput
                      size="md"
                      radius={8}
                      label="Unit or House Number"
                      placeholder="Type Here"
                      className="w-full"
                      max={14}
                      classNames={{ input: "poppins" }}
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                    <TextInput
                      size="md"
                      radius={8}
                      label="Subdivision"
                      placeholder="Type Here"
                      className="w-full"
                      max={14}
                      classNames={{ input: "poppins" }}
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                    <Select
                      size="md"
                      placeholder="Select City"
                      label="City"
                      radius={8}
                      data={["Next Day", "Same Day"]}
                      classNames={{ input: "poppins" }}
                      rightSection={<IconDots size={18} onClick={() => {}} />}
                      className="border-none w-full"
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                    <TextInput
                      size="md"
                      radius={8}
                      label="Landline"
                      placeholder="Type Here"
                      className="w-full"
                      max={14}
                      classNames={{ input: "poppins" }}
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                  </Flex>
                  <Flex className="flex flex-col w-full  gap-4">
                    <TextInput
                      size="md"
                      radius={8}
                      label="Street"
                      placeholder="Type Here"
                      className="w-full"
                      max={14}
                      classNames={{ input: "poppins" }}
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                    <Select
                      size="md"
                      placeholder="Select Barangay"
                      label="Barangay"
                      radius={8}
                      data={["Next Day", "Same Day"]}
                      classNames={{ input: "poppins" }}
                      rightSection={<IconDots size={18} onClick={() => {}} />}
                      className="border-none w-full"
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                    <Select
                      size="md"
                      placeholder="Select"
                      label="Zipcode"
                      radius={8}
                      data={["Next Day", "Same Day"]}
                      classNames={{ input: "poppins" }}
                      rightSection={<IconDots size={18} onClick={() => {}} />}
                      className="border-none w-full"
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                    <TextInput
                      size="md"
                      radius={8}
                      label="Mobile Number"
                      placeholder="Type Here"
                      className="w-full"
                      max={14}
                      classNames={{ input: "poppins" }}
                      styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                    />
                  </Flex>
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
