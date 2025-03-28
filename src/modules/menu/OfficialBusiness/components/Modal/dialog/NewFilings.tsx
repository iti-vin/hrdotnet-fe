/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Fragment } from "react";
//--- Mantine Modules
import { Button, useMatches, Stack, ScrollArea, Select, Flex, Textarea, TextInput } from "@mantine/core";
//--- Tabler Icons
//-- Shared Template
import Dropzone from "@shared/template/Dropzone";
import Modal from "@/layout/main/dialog/Modal";
import { DatePickerInput, TimeInput } from "@mantine/dates";

interface ModalRequest {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}
export default function NewFilings({ opened, onClose, buttonClose }: ModalRequest) {
  const size = useMatches({ base: "100%", sm: "70%" });

  return (
    <Fragment>
      <Modal opened={opened} onClose={onClose} centered size={size} buttonClose={buttonClose} title="New Filings">
        <form onSubmit={undefined}>
          <Stack className="w-full h-full">
            <ScrollArea px={20} className="flex flex-col mt-3 w-full text-[#6d6d6d] relative" h={650} styles={{ scrollbar: { display: "none" } }}>
              <Flex gap={5} direction="column">
                <TextInput label="Employee Name" className="w-full" styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }} size="md" radius={8} withAsterisk />
                <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
                  <DatePickerInput label="From Date" className="w-full" styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }} size="md" radius={8} withAsterisk />
                  <DatePickerInput label="To Date" className="w-full" styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }} size="md" radius={8} withAsterisk />
                </Flex>
                <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
                  <TimeInput label="OB Time In" className="w-full" styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }} size="md" radius={8} withAsterisk />
                  <TimeInput label="OB Time  Out" className="w-full" styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }} size="md" radius={8} withAsterisk />
                </Flex>
                <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }} align="end">
                  <Select label="Location" className="w-full" styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }} size="md" radius={8} withAsterisk />
                  <Select label="Branch" className="w-full" styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }} size="md" radius={8} withAsterisk />
                </Flex>

                <Textarea label="Reason" withAsterisk rows={4} />
                <Dropzone />
              </Flex>
            </ScrollArea>
          </Stack>
          <Stack className="flex flex-col justify-end mt-3">
            <Button type="submit" className="w-2/4 sm:w-2/5 md:w-1/6  br-gradient self-end border-none" radius="md" size="md">
              SUBMIT
            </Button>
          </Stack>
        </form>
      </Modal>
    </Fragment>
  );
}
