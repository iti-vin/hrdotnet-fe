import Modal from "@/layout/main/dialog/Modal";
import { Button, ScrollArea, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconNotes } from "@tabler/icons-react";
import useLeaveStore from "../../../store/LeaveStore";
import { statusColors } from "@shared/assets/types/Global";
import React from "react";

interface ViewDetailsProps {
  panel?: "FILINGS" | "REQUEST" | "REVIEWAL" | "APPROVAL";
  endorse?: React.ReactNode;
  approve?: React.ReactNode;
  cancel?: React.ReactNode;
}

export default function ViewDetails({ panel, endorse, approve }: ViewDetailsProps) {
  const { openDialog, setOpenDialog, viewItems, setOpenAlert } = useLeaveStore();
  const statusInfo = statusColors.find((item) => item.status === viewItems.filing.filingStatus.name) || {
    status: "Unknown",
    color: "gray",
  };

  const onHandleClear = () => {
    setOpenDialog("");
    setOpenAlert("Cancel");
  };

  const onHandleEdit = () => {
    setOpenDialog("EditRequest");
  };

  const rndrBtnContent = () => {
    if (panel === "REQUEST") {
      let button: React.ReactNode;
      if (viewItems.filing.filingStatus.name === "Filed") {
        button = (
          <>
            <Button variant="outline" className="rounded-md" onClick={onHandleClear}>
              CANCEL REQUEST
            </Button>
            <Button className="border-none custom-gradient rounded-md" onClick={onHandleEdit}>
              EDIT REQUEST
            </Button>
          </>
        );
      } else if (viewItems.filing.filingStatus.name === "Reviewed") {
        return (
          <Button variant="outline" className="rounded-md">
            CANCEL REQUEST
          </Button>
        );
      } else if (
        viewItems.filing.filingStatus.name === "Approved" ||
        viewItems.filing.filingStatus.name === "Cancelled"
      ) {
        return null;
      }
      return button;
    } else if (panel === "REVIEWAL") {
      let button: React.ReactNode;
      if (viewItems.filing.filingStatus.name === "Filed") {
        button = (
          <>
            <Button variant="outline" className="rounded-md" onClick={onHandleClear}>
              CANCEL
            </Button>
            {endorse}
          </>
        );
      } else {
        button = (
          <Button variant="outline" className="rounded-md" onClick={onHandleClear}>
            CANCEL
          </Button>
        );
      }
      return button;
    } else if (panel === "APPROVAL" || "FILINGS") {
      let button: React.ReactNode;
      if (viewItems.filing.filingStatus.name === "Filed" || "Reviewed") {
        button = (
          <>
            <Button variant="outline" className="rounded-md" onClick={onHandleClear}>
              CANCEL
            </Button>
            {approve}
          </>
        );
      } else {
        button = (
          <Button variant="outline" className="rounded-md" onClick={onHandleClear}>
            CANCEL
          </Button>
        );
      }
      return button;
    } else {
      return null;
    }
  };

  return (
    <Modal
      title="View Details"
      size="80%"
      opened={openDialog === "ViewDetails"}
      onClose={() => setOpenDialog("")}
      buttonClose={() => setOpenDialog("")}>
      <ScrollArea
        className="flex flex-col gap-5 mt-3 w-full text-[#6d6d6d] relative"
        h={650}
        styles={{ scrollbar: { display: "none" } }}>
        <div className="flex flex-col gap-5" style={{ color: "#6D6D6D" }}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 flex flex-col gap-2  border-solid border-0.5 border-sky-500 p-4 rounded-lg">
              <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
                General Information
              </Text>

              <div>
                {/* <Text >Leave Type</Text> */}
                <TextInput
                  label="Leave Type"
                  size="lg"
                  radius="md"
                  placeholder="Select Leave Type"
                  className="w-full"
                  value={viewItems.filing.leaveParameter.name}
                  disabled
                />
              </div>
              <div>
                <TextInput
                  label="Leave Option"
                  size="lg"
                  radius="md"
                  placeholder="Select Leave Option"
                  className="w-full"
                  value={viewItems.filing.leaveOption.name}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-8  sm:gap-8">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="w-full">
                    <DatePickerInput
                      label="Start Date"
                      radius="md"
                      size="lg"
                      placeholder="Start Date"
                      value={new Date(viewItems.filing.dateFiled.dateFrom)}
                      disabled
                    />
                  </div>

                  <div className="w-full">
                    <DatePickerInput
                      label="End Date"
                      radius="md"
                      size="lg"
                      placeholder="End Date"
                      value={new Date(viewItems.filing.dateFiled.dateTo)}
                      disabled
                    />
                  </div>
                </div>

                <div className="w-full">
                  <TextInput
                    label="Duration (Days)"
                    radius="md"
                    size="lg"
                    placeholder="Total Number of Days"
                    value={viewItems.filing.numberOfDays + "Day"}
                    disabled
                  />
                </div>

                <div className="w-full">
                  <TextInput
                    label="Reference Number"
                    radius="md"
                    size="lg"
                    placeholder="00-0000-0000-0000"
                    value={viewItems.filing.referenceNo}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg">
              <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
                Detailed Information
              </Text>
              <div>
                <Text
                  size="md"
                  bg={statusInfo.color}
                  className="font-medium text-sm lg:text-lg text-white text-center gap-1 rounded-md py-3"
                  children={viewItems.filing.filingStatus.name}
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col w-full md:w-1/2">
                  <TextInput
                    label="Document No."
                    radius="md"
                    size="lg"
                    placeholder="00000000"
                    value={viewItems.filing.documentNo}
                    disabled
                  />
                </div>

                <div className="flex flex-col w-full md:w-1/2">
                  <DatePickerInput
                    label="Transaction Date"
                    radius="md"
                    size="lg"
                    placeholder="mm/dd/yyyy"
                    value={new Date(viewItems.filing.dateTransaction)}
                    disabled
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <Textarea
                  label="Endorsement Information"
                  size="lg"
                  radius="md"
                  placeholder="Endorsed by Jane Smith on October 25, 2024 at 6:43 PM."
                  className="w-full"
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <Textarea
                  label="Approval Information"
                  size="lg"
                  radius="md"
                  placeholder="Approved by Jane Smith on October 25, 2024 at 6:43 PM (Batch Approval)"
                  className="w-full"
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <Textarea
                  label="Cancellation Information"
                  size="lg"
                  radius="md"
                  placeholder="No Information"
                  className="w-full"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg">
            <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
              Reason{" "}
            </Text>
            <Textarea
              size="xl"
              radius="md"
              placeholder="Briefly state the reasons for filing leave."
              value={viewItems.filing.reason}
              disabled
            />
          </div>

          <div className="flex flex-col gap-5 border-solid border-0.5 border-sky-500 p-4 rounded-lg">
            <Text style={{ color: "#559CDA" }} className="font-bold ">
              Attachment{" "}
            </Text>
            <div
              className="border-dashed border-0.5 border-sky-500 p-4 rounded-lg flex flex-col  items-center"
              style={{ color: "#6D6D6D", background: "#EEEEEE", opacity: "0.5" }}>
              <div className="flex items-center">
                <IconNotes />
                <Text>File: attachment.pdf Size: 20 MB </Text>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row  gap-4">
            {/* {SELECTED_DATA.status != "Filed" && isMultipleDayLeave && (
                <div className="flex flex-col w-full md:w-2/3 gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg">
                  
              <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
                    Filing Breakdown
                  </Text>
                  <FilingBreakdown />
                </div>
              )} */}
            <div className="flex flex-col gap-2  w-full border-solid border-0.5 border-sky-500 p-4 rounded-lg">
              <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
                Edit Log
              </Text>
              <Textarea
                styles={{ input: { height: "12.5rem" } }}
                variant="filled"
                size="xl"
                radius="md"
                placeholder="Date of Change  - Employee name changed the Application date from mm/dd/yyyy to mm/dd/yyyy."
                disabled
              />
            </div>
          </div>
        </div>
      </ScrollArea>

      <Stack className="pt-5 flex flex-row justify-end">{rndrBtnContent()}</Stack>
    </Modal>
  );
}
