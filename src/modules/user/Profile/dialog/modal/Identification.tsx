/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Modal from "@/layout/main/dialog/UpdatedModal";
import { Button, Flex, ScrollArea, Stack, TextInput, useMatches } from "@mantine/core";
import { ModalProps } from "@shared/assets/types/Modal";
import { Fragment } from "react";

export default function UpdateIdentification({ opened, onClose, buttonClose }: ModalProps) {
  const size = useMatches({ base: "100%", sm: "70%" });
  return (
    <Fragment>
      <Modal opened={opened} onClose={onClose} buttonClose={buttonClose} size={size} title="Update Identification">
        <form onSubmit={undefined}>
          <Stack className="w-full h-full">
            <ScrollArea
              className="flex flex-col mt-3 w-full text-[#6d6d6d] relative  px-10"
              h={650}
              styles={{ scrollbar: { display: "block" } }}>
              <Flex className="flex flex-col lg:flex-row gap-4 lg:gap-10">
                <Flex className="flex flex-col w-full gap-4">
                  <TextInput
                    size="md"
                    radius={8}
                    label="TIN"
                    placeholder="Type Here"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="SSS No."
                    placeholder="Type Here"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="Passport No."
                    placeholder="Type Here"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="PhilHealth No."
                    placeholder="Type Here"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Flex>
                <Flex className="flex flex-col w-full gap-4">
                  <TextInput
                    size="md"
                    radius={8}
                    label="RDO Code"
                    placeholder="Type Here"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="GSIS No."
                    placeholder="Type Here"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="Pag-Ibig No."
                    placeholder="Type Here"
                    className="w-full"
                    max={14}
                    classNames={{ input: "poppins" }}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TextInput
                    size="md"
                    radius={8}
                    label="Driver's License No."
                    placeholder="Type Here"
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
