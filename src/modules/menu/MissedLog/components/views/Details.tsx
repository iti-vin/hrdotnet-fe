import React, { useEffect, useState } from "react";
import { IconCalendar, IconCaretDownFilled, IconClock, IconNotes } from "@tabler/icons-react";
import { Modal } from "@shared/template/";

import { ActionIcon, Flex, MultiSelect, rem, Text, Textarea, TextInput, useMatches } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { Buttons } from "./";
import { useML } from "../../store/useMissedLog";
import { FilingStatus } from "@shared/assets/types/Global";

interface ModalViewProps {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
  tabs?: "List" | "Review" | "Approve";
}

export default function Viewdialog({ opened, onClose, buttonClose, tabs = "List" }: ModalViewProps) {
  const size = useMatches({
    base: "100%",
    sm: "70%",
  });

  const { selectedData, setSelectedData, activeTab } = useML();

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
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (activeTab === "list") {
      setTitle("Missed Log Details");
    } else {
      setTitle(selectedData.name as string);
    }
  }, [selectedData]);
  const [date, setDate] = React.useState<Date | null>(null);
  const ref = React.useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  return (
    <>
      <Modal
        isIconsActionsRequired={true}
        radius={"md"}
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
        title={title}>
        <Flex direction={{ base: "column", sm: "row" }} className="w-full gap-6">
          <div className="w-full md:w-1/2 flex flex-col gap-2  border-solid border-0.5 border-sky-500 p-4 rounded-lg">
            <Text style={{ color: "#559CDA" }} className="font-bold">
              General Information
            </Text>

            <div className="flex flex-col gap-2 justify-between">
              <DatePickerInput
                size="md"
                radius={8}
                withAsterisk
                value={date}
                onChange={setDate}
                label="Date"
                disabled
                placeholder="MM/DD/YYYY"
                className="w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                rightSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
              />
              <TextInput
                size="md"
                radius={8}
                label="Reference Number"
                placeholder="0000-0000-0000"
                withAsterisk
                className="w-full"
                max={14}
                disabled
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
              <Flex direction="column" justify="space-between" className="w-full" gap={20}>
                <MultiSelect
                  size="md"
                  label="Log Type"
                  placeholder="Time In"
                  radius={8}
                  withAsterisk
                  disabled
                  data={["Time In", "Time Out"]}
                  rightSection={<IconCaretDownFilled size={18} />}
                  className="border-none w-full"
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
                <TimeInput
                  size="md"
                  radius={8}
                  label="Log Time"
                  withAsterisk
                  disabled
                  className="w-full"
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  ref={ref}
                  rightSection={pickerControl}
                />
              </Flex>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg">
            <Text style={{ color: "#559CDA" }} className="font-bold">
              Detailed Information
            </Text>
            <div>
              <Text size="md" fw={500} className=" flex gap-1" c="#6d6d6d">
                Status
              </Text>
              <div style={{ background: color }} className="w-full text-center p-3 rounded-md text-white">
                <Text className="">{selectedData.filingStatus}</Text>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-col w-full md:w-1/2">
                {/* <Text >Document No.</Text> */}
                <TextInput disabled label="Document No." radius="md" size="lg" placeholder="00000000" />
              </div>

              <div className="flex flex-col w-full md:w-1/2">
                {/* <Text >Transaction Date</Text> */}
                <DatePickerInput disabled label="Transaction Date" radius="md" size="lg" placeholder="mm/dd/yyyy" />
              </div>
            </div>

            <div className="flex flex-col">
              {/* <Text >Endorsement Information</Text> */}
              <Textarea disabled label="Endorsement Information" size="lg" radius="md" placeholder="Endorsed by Jane Smith on October 25, 2024 at 6:43 PM." className="w-full" />
            </div>
            <div className="flex flex-col">
              {/* <Text >Approval Information</Text> */}
              <Textarea
                disabled
                label="Approval Information"
                size="lg"
                radius="md"
                placeholder="Approved by Jane Smith on October 25, 2024 at 6:43 PM (Batch Approval)"
                className="w-full"
              />
            </div>
            <div className="flex flex-col">
              {/* <Text >Cancellation Information</Text> */}
              <Textarea disabled label="Cancellation Information" size="lg" radius="md" placeholder="No Information" className="w-full" />
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

        <div className="flex flex-col gap-5 border-solid border-0.5 border-sky-500 p-4 rounded-lg">
          <Text style={{ color: "#559CDA" }} className="font-bold ">
            Attachment{" "}
          </Text>
          <div className="border-dashed border-0.5 border-sky-500 p-4 rounded-lg flex flex-col  items-center" style={{ color: "#6D6D6D", background: "#EEEEEE", opacity: "0.5" }}>
            <div className="flex items-center">
              <IconNotes />
              <Text>File: attachment.pdf Size: 20 MB </Text>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2  w-full border-solid border-0.5 border-sky-500 p-4 rounded-lg">
          <Text style={{ color: "#559CDA" }} className="font-bold">
            Edit Log
          </Text>
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
          status={selectedData.filingStatus as FilingStatus}
          open={() => {
            setSelectedData({});
            onClose();
          }}
          close={() => {
            setSelectedData({});
            buttonClose();
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
