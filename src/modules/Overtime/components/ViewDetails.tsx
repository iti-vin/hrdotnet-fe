import React, { useState } from "react";
import {
  IconCalendar,
  IconChevronDown,
  IconDots,
  IconNotes,
} from "@tabler/icons-react";
import { Modal } from "@shared/template/";

import {
  Container,
  Flex,
  Group,
  MultiSelect,
  Select,
  Text,
  Textarea,
  TextInput,
  useMatches,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import Attachment from "@shared/template/main/Dropzone";
import { useOvertimeStore } from "@/modules/Overtime/store/useOT";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { Buttons } from "@/modules/Overtime/components/Button";
import { useDisclosure } from "@mantine/hooks";
import { Alerts, Rejected } from "@/modules/Overtime/components/AlertOT";

interface ModalViewProps {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
  tabs?: "List" | "Review" | "Approve";
}

export default function Viewdialog({
  opened,
  onClose,
  buttonClose,
  tabs = "List",
}: ModalViewProps) {
  const size = useMatches({
    base: "100%",
    sm: "70%",
  });

  const { selectedData, setSelectedData } = useOvertimeStore();

  let color;
  switch (selectedData.filingStatus) {
    case "Filed":
      color = "#9B51E0";
      break;
    case "Approved":
      color = "#1E8449";
      break;
    case "Cancelled":
      color = "#FF4B34";
      break;
    case "Reviewed":
      color = "#FF7800";
      break;
    default:
      color = "gray";
  }
  const [timeValue, setTimeValue] = React.useState("10:30 AM");
  const [isReadOnly, setIsReadOnly] = useState(true)
  const [dialog, { open: dialogOpen, close: dialogClose }] =
    useDisclosure(false);
  const [reject, { open: rejectOpen, close: rejectClose }] =
    useDisclosure(false);

  return (
    <>
      <Modal
        isIconsActionsRequired={true}
        radius={'md'}
        opened={opened}
        onClose={() => {
          setSelectedData({});
          onClose();
        }}
        centered
        size={size}
        buttonClose={() => {
          setSelectedData({});
          buttonClose();
        }}
        title=''
      >
        <Flex
          direction={{ base: "column", sm: "row" }}
          className="w-full gap-6"
        // gap={10}
        // px={{ base: 0, sm: 12 }}
        >

          <div className='w-full md:w-1/2 flex flex-col gap-2  border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
            <Text style={{ color: '#559CDA' }} className='font-bold'>General Information</Text>

            <div className="flex flex-col gap-2">
              <MultiSelect
                size="lg"
                label="Overtime Date"
                placeholder={selectedData.dateFiled}
                radius={8}
                data={["React", "Angular", "Vue", "Svelte"]}
                rightSection={<></>}
                className="border-none w-full"
                disabled
              />
              <Flex
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                className="w-full"
                gap={20}
              >
                <Select
                  size="lg"
                  label="Shift"
                  placeholder="Schedule 001"
                  radius={8}
                  data={["React", "Angular", "Vue", "Svelte"]}
                  rightSection={<></>}
                  className="border-none w-full"
                  disabled
                />
                <TextInput
                  size="lg"
                  radius={8}
                  label="Reference No."
                  placeholder="0000-0000-0000"
                  className="w-full"
                  disabled
                />
              </Flex>

              <div className='flex flex-col gap-8  sm:gap-9'>

                <Flex
                  direction={{ base: "column", sm: "row" }}
                  justify="space-between"
                  className="w-full"
                  gap={20}
                >
                  <TimeInput
                    size="lg"
                    radius={8}
                    label="Actual OT In"
                    className="w-full"
                    value={timeValue}
                    placeholder={timeValue}
                    onChange={(value: any) => setTimeValue(value)}
                    disabled
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TimeInput
                    size="lg"
                    radius={8}
                    label="Actual OT Out"
                    value={DateTimeUtils.getIsoTimeDefaultWithUnits(
                      selectedData.actualFrom
                    )}
                    placeholder={DateTimeUtils.getIsoTimeDefaultWithUnits(
                      selectedData.actualFrom
                    )}
                    className="w-full"
                    disabled
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Flex>
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  justify="space-between"
                  className="w-full"
                  gap={20}
                >
                  <TimeInput
                    size="lg"
                    radius={8}
                    label="OT From"
                    className="w-full"
                    disabled
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TimeInput
                    size="lg"
                    radius={8}
                    label="OT To"
                    className="w-full"
                    disabled
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Flex>
                <DatePickerInput
                  valueFormat="YYYY MMM DD"
                  label="Duration"
                  placeholder="Pick date"
                  className="w-full"
                  size="lg"
                  radius={8}
                  disabled
                />
              </div>
            </div>

          </div>


          <div className='w-full md:w-1/2 flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
            <Text style={{ color: '#559CDA' }} className='font-bold'>Detailed Information</Text>
            <div>
              <Text size="md" fw={500} className=" flex gap-1" c="#6d6d6d">
                Status
              </Text>
              <div style={{ background: color }} className='w-full text-center p-3 rounded-md text-white'>
                <Text className=''>{selectedData.filingStatus}</Text>
              </div>
            </div>

            <div className='flex flex-col md:flex-row justify-between gap-4'>

              <div className='flex flex-col w-full md:w-1/2'>
                {/* <Text >Document No.</Text> */}
                <TextInput
                  disabled={isReadOnly}
                  label="Document No."
                  radius="md"
                  size="lg"
                  placeholder="00000000"
                />
              </div>


              <div className='flex flex-col w-full md:w-1/2'>
                {/* <Text >Transaction Date</Text> */}
                <DatePickerInput
                  disabled={isReadOnly}
                  label="Transaction Date"
                  radius="md"
                  size="lg"
                  placeholder="mm/dd/yyyy"
                />
              </div>
            </div>

            <div className='flex flex-col'>
              {/* <Text >Endorsement Information</Text> */}
              <Textarea
                disabled={isReadOnly}
                label="Endorsement Information"
                size="lg"
                radius="md"
                placeholder="Endorsed by Jane Smith on October 25, 2024 at 6:43 PM."
                className="w-full"
              />
            </div>
            <div className='flex flex-col'>
              {/* <Text >Approval Information</Text> */}
              <Textarea
                disabled={isReadOnly}
                label="Approval Information"
                size="lg"
                radius="md"
                placeholder="Approved by Jane Smith on October 25, 2024 at 6:43 PM (Batch Approval)"
                className="w-full"
              />
            </div>
            <div className='flex flex-col'>
              {/* <Text >Cancellation Information</Text> */}
              <Textarea
                disabled={isReadOnly}
                label="Cancellation Information"
                size="lg"
                radius="md"
                placeholder="No Information"
                className="w-full"
              />
            </div>

          </div>
        </Flex>

        <div className="border-solid border-0.5 border-sky-500 p-4 rounded-lg">
          <Textarea
            size="md"
            label="Reason"
            placeholder={selectedData.reason}
            disabled
            className="w-full"
            styles={{ input: { height: "100px" }, label: { fontSize: "16px" } }}
            radius={8}
            classNames={{ label: "text-[#559cda] font-bold" }}
          />
        </div>

        <div className='flex flex-col gap-5 border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
          <Text style={{ color: '#559CDA' }} className='font-bold '>Attachment </Text>
          <div className='border-dashed border-0.5 border-sky-500 p-4 rounded-lg flex flex-col  items-center' style={{ color: '#6D6D6D', background: '#EEEEEE', opacity: '0.5' }}>
            <div className='flex items-center' >
              <IconNotes />
              <Text>File: attachment.pdf Size: 20 MB </Text>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2  w-full border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
          <Text style={{ color: '#559CDA' }} className='font-bold'>Edit Log</Text>
          <Textarea
            size="md"
            disabled
            placeholder="Briefly state the reason for filing overtime"
            className="w-full"
            styles={{ input: { height: "100px" }, label: { color: "#6d6d6d" } }}
            radius={8}
            classNames={{ label: "text-[#559cda] font-bold" }}
          />
        </div>

        <Buttons
          tabs={tabs}
          status={selectedData.filingStatus}
          open={() => {
            setSelectedData({});
            onClose();
            dialogOpen();
          }}
          close={() => {
            setSelectedData({});
            buttonClose();
            rejectOpen();
          }}
        />
      </Modal>

      {/* <Alerts
        opened={dialog}
        onClose={dialogClose}
        buttonClose={dialogClose}
        tabs={tabs}
      />

      <Rejected
        opened={reject}
        onClose={rejectClose}
        buttonClose={rejectClose}
      /> */}
    </>
  );
}
