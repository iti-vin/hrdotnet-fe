/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { Fragment, useState } from "react";
import { Stack, Flex } from "@mantine/core";

//--- Layouts

//-- Shared Template
import { ModalProps } from "@shared/assets/types/Modal";
import { Button, DateRangePickerInput, FileAttachment, Modal, Select, TextArea, TextInput, TimePickerInput } from "@shared/components";

export default function NewFilings({ opened, onClose, buttonClose }: ModalProps) {
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);

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
                <DateRangePickerInput
                  fl="From Date"
                  sl="To Date"
                  fp="From"
                  sp="To"
                  direction="row"
                  dateValue={dateRange}
                  setDateValue={(date) => {
                    setDateRange(date);
                  }}
                />{" "}
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
