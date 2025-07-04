/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { Flex, ScrollArea, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { IconNotes } from "@tabler/icons-react";
//--- Layouts
import Modal from "@/layout/main/dialog/Modal";
//--- Shared
import { Panel, statusColors } from "@shared/assets/types/Global";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { calculateTwoDate } from "@shared/hooks/useCount";
import { ModalProps } from "@shared/assets/types/Modal";
import ESSButton from "@shared/ui/Buttons";

import { useOfficialBusinessStore } from "../../../store";
import { useMediaQuery } from "@mantine/hooks";

interface ViewDetailsProps extends ModalProps {
  panel?: Panel;
  onHandleSingleEndorse?: () => void;
  onHandleSingleApprove?: () => void;
}

export default function ViewDetails({ opened, onClose, buttonClose, onHandleSingleEndorse, onHandleSingleApprove, panel }: ViewDetailsProps) {
  const small = useMediaQuery("(max-width: 40em)");
  const { viewItems, setOpenDialog, setOpenConfirmation } = useOfficialBusinessStore();
  const statusInfo = statusColors.find((item) => item.status === viewItems.filing.filingStatus.name) || {
    status: "Unknown",
    color: "gray",
  };

  const onHandleSingleCancel = () => {
    setOpenDialog("");
    setOpenConfirmation("SingleCancel");
  };

  const onHandleEditRequest = () => {
    setOpenDialog("EditRequest");
  };

  const rndrBtnContent = () => (
    <ESSButton
      panel={panel!}
      filingStatus={viewItems.filing.filingStatus.name}
      onHandleSingleCancel={onHandleSingleCancel}
      onHandleEditRequest={onHandleEditRequest}
      onHandleSingleEndorse={onHandleSingleEndorse}
      onHandleSingleApprove={onHandleSingleApprove}
    />
  );

  return (
    <Modal title="View Details" size="70%" opened={opened} onClose={onClose} buttonClose={buttonClose}>
      <ScrollArea className="flex flex-col gap-5 mt-3 w-full text-[#6d6d6d] relative" h={650} px={small ? 20 : 30} styles={{ scrollbar: { display: "none" } }}>
        <div className="flex flex-col gap-5" style={{ color: "#6D6D6D" }}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 flex flex-col gap-2  border-solid border-0.5 border-sky-500 p-4 rounded-lg">
              <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
                General Information
              </Text>
              <Flex direction="column" gap={5}>
                <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
                  <TextInput
                    label="From Date"
                    className="w-full"
                    radius="md"
                    size={small ? "xs" : "md"}
                    placeholder="none"
                    disabled
                    value={DateTimeUtils.getIsoDateFullWord(viewItems.filing.dateRange.dateFrom)}
                  />
                  <TextInput
                    label="To Date"
                    className="w-full"
                    radius="md"
                    size={small ? "xs" : "md"}
                    placeholder="none"
                    disabled
                    value={DateTimeUtils.getIsoDateFullWord(viewItems.filing.dateRange.dateTo)}
                  />
                </Flex>

                <TextInput
                  label="Duration (Days)"
                  radius="md"
                  size={small ? "xs" : "md"}
                  placeholder="Total Number of Days"
                  disabled
                  value={calculateTwoDate([new Date(viewItems.filing.dateRange.dateFrom), new Date(viewItems.filing.dateRange.dateTo)])}
                />
                <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
                  <TextInput label="OB Time In" className="w-full" radius="md" size={small ? "xs" : "md"} placeholder="none" disabled value={viewItems.filing.timeRange.timeIn} />
                  <TextInput label="OB Time Out" className="w-full" radius="md" size={small ? "xs" : "md"} placeholder="none" disabled value={viewItems.filing.timeRange.timeOut} />
                </Flex>
                <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
                  <TextInput label="Location" className="w-full" radius="md" size={small ? "xs" : "md"} placeholder="none" disabled value={viewItems.filing.location.name} />
                  <TextInput
                    label="Branch"
                    className="w-full"
                    radius="md"
                    size={small ? "xs" : "md"}
                    placeholder="none"
                    disabled
                    value={viewItems.filing.location.locationBranch}
                  />
                </Flex>
                <TextInput label="Reference No." radius="md" size={small ? "xs" : "md"} placeholder="none" disabled />
              </Flex>
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

              <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }} align="end">
                <TextInput label="Document No." className="w-full" radius="md" size={small ? "xs" : "md"} placeholder="00000000" disabled value={viewItems.filing.documentNo} />

                <TextInput
                  label="Transaction Date"
                  className="w-full"
                  radius="md"
                  size={small ? "xs" : "md"}
                  placeholder="none"
                  disabled
                  value={DateTimeUtils.getIsoDateFullWord(viewItems.filing.dateTransaction)}
                />
              </Flex>

              <div className="flex flex-col">
                <Textarea
                  label="Endorsement Information"
                  size={small ? "xs" : "md"}
                  radius="md"
                  placeholder="Endorsed by Jane Smith on October 25, 2024 at 6:43 PM."
                  className="w-full"
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <Textarea
                  label="Approval Information"
                  size={small ? "xs" : "md"}
                  radius="md"
                  placeholder="Approved by Jane Smith on October 25, 2024 at 6:43 PM (Batch Approval)"
                  className="w-full"
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <Textarea label="Cancellation Information" size={small ? "xs" : "md"} radius="md" placeholder="No Information" className="w-full" disabled />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg">
            <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
              Reason{" "}
            </Text>
            <Textarea size="xl" radius="md" placeholder="Briefly state the reasons for filing leave." disabled value={viewItems.filing.reason} />
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
                placeholder="Date of Change  - Employee name changed the Application date from none to none."
                disabled
              />
            </div>
          </div>
        </div>
      </ScrollArea>

      <Stack className="pt-5 flex flex-row justify-end" px={small ? 20 : 30}>
        {rndrBtnContent()}
      </Stack>
    </Modal>
  );
}
