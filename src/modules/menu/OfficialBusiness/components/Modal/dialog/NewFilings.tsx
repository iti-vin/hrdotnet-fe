/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { Fragment } from "react";
import { Stack, Flex } from "@mantine/core";

//--- Layouts

//-- Shared Template
import { ModalProps } from "@shared/assets/types/Modal";
import { Button, DatePickerInput, FileAttachment, Modal, Select, TextArea, TextInput, TimePickerInput } from "@shared/components";

export default function NewFilings({ opened, onClose, buttonClose }: ModalProps) {
  return (
    <Fragment>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        size="xl"
        buttonClose={buttonClose}
        title="New Filings"
        footer={
          <Button type="submit" variant="gradient" size="lg">
            SUBMIT
          </Button>
        }>
        <form onSubmit={undefined}>
          <Stack className="w-full h-full">
            <Flex gap={5} direction="column">
              <TextInput label="Employee Name" className="w-full" required />
              <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
                <DatePickerInput label="From Date" className="w-full" styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }} size="md" radius={8} withAsterisk />
                <DatePickerInput label="To Date" className="w-full" styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }} size="md" radius={8} withAsterisk />
              </Flex>
              <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
                <TimePickerInput label="OB Time In" required />
                <TimePickerInput label="OB Time  Out" required />
              </Flex>
              <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }} align="end">
                <Select label="Location" className="w-full" required />
                <Select label="Branch" className="w-full" required />
              </Flex>
              <Stack>
                <TextArea label="Reason" required rows={4} />
                <FileAttachment />
              </Stack>
            </Flex>
          </Stack>
        </form>
      </Modal>
    </Fragment>
  );
}
