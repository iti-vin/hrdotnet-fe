/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { IconNotes } from "@tabler/icons-react";
import { TimeInput } from "@mantine/dates";
import { Flex, ScrollArea, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
//--- Layouts
import Modal from "@/layout/main/dialog/Modal";
import { ModalProps } from "@shared/assets/types/Modal";
import { Panel, statusColors } from "@shared/assets/types/Global";
import { useOvertimeStore } from "../../../store";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import ESSButton from "@shared/ui/Buttons";
import { OvertimeItems } from "../../../models/response";
import { OvertimeServices } from "../../../services/api";
import { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";

//--- Shared
interface ViewDetailsProps extends ModalProps {
  panel?: Panel;
  onHandleSingleEndorse?: () => void;
  onHandleSingleApprove?: () => void;
}

export default function ViewDetails({ opened, onClose, buttonClose, onHandleSingleEndorse, onHandleSingleApprove, panel }: ViewDetailsProps) {
  const small = useMediaQuery("(max-width: 40em)");
  const { viewItems, setSingleItem, setOpenDialog, setOpenConfirmation } = useOvertimeStore();
  const onHandleSingleCancel = () => {
    setOpenDialog("");
    setOpenConfirmation("SingleCancel");
  };

  const fetchOvertimeDetails = async (id: number, type: Panel) => {
    const apiMap: Record<Panel, ((id: number) => Promise<OvertimeItems>) | null> = {
      REQUEST: OvertimeServices.getMyOTById,
      REVIEWAL: OvertimeServices.getReviewalOTById,
      APPROVAL: OvertimeServices.getApprovalOTById,
      FILINGS: null,
    };

    const apiFunction = apiMap[type];

    if (!apiFunction) {
      console.warn(`No API function available for type: ${type}`);
      return null;
    }

    try {
      const response = await apiFunction(id);
      return setSingleItem(response);
    } catch (error) {
      console.error("Error fetching overtime details:", error);
      return null;
    }
  };

  useEffect(() => {
    if (viewItems.filing.id != 0) {
      fetchOvertimeDetails(viewItems.filing.id, panel!);
    }
  }, [viewItems.filing.id]);

  const onHandleEditRequest = () => {
    setOpenDialog("EditRequest");
  };

  const statusInfo = statusColors.find((item) => item.status === viewItems.filing.filingStatus.name) || {
    status: "Unknown",
    color: "gray",
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
              <Stack className="flex flex-col gap-2">
                <TextInput
                  size={small ? "xs" : "md"}
                  label="Overtime Date"
                  defaultValue={DateTimeUtils.getIsoDateWord(viewItems.filing.dateFiled)}
                  onChange={() => {}}
                  radius={8}
                  rightSection={<></>}
                  className="border-none w-full"
                  disabled
                />
                <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
                  <Select
                    size={small ? "xs" : "md"}
                    label="Shift"
                    placeholder="Schedule 001"
                    radius={8}
                    data={["React", "Angular", "Vue", "Svelte"]}
                    rightSection={<></>}
                    className="border-none w-full"
                    disabled
                  />
                  <TextInput size={small ? "xs" : "md"} radius={8} label="Reference No." placeholder="0000-0000-0000" className="w-full" disabled />
                </Flex>

                <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
                  <TimeInput
                    size={small ? "xs" : "md"}
                    radius={8}
                    label="Actual OT In"
                    defaultValue={DateTimeUtils.getCurrTimeDefault(viewItems.filing.actual.dateFrom)}
                    onChange={() => {}}
                    className="w-full"
                    disabled
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TimeInput
                    size={small ? "xs" : "md"}
                    radius={8}
                    label="Actual OT Out"
                    defaultValue={DateTimeUtils.getCurrTimeDefault(viewItems.filing.actual.dateTo)}
                    onChange={() => {}}
                    className="w-full"
                    disabled
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Flex>
                <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
                  <TimeInput
                    size={small ? "xs" : "md"}
                    radius={8}
                    label="OT From"
                    defaultValue={DateTimeUtils.getCurrTimeDefault(viewItems.filing.requested.dateFrom)}
                    onChange={() => {}}
                    className="w-full"
                    disabled
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <TimeInput
                    size={small ? "xs" : "md"}
                    radius={8}
                    label="OT To"
                    defaultValue={DateTimeUtils.getCurrTimeDefault(viewItems.filing.requested.dateTo)}
                    onChange={() => {}}
                    className="w-full"
                    disabled
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Flex>
                <TextInput
                  label="Duration"
                  placeholder="Pick date"
                  className="w-full"
                  size={small ? "xs" : "md"}
                  defaultValue={viewItems.filing.numberOfHours}
                  onChange={() => {}}
                  radius={8}
                  disabled
                />
              </Stack>
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
                <TextInput
                  label="Document No."
                  className="w-full"
                  radius="md"
                  size={small ? "xs" : "md"}
                  placeholder="00000000"
                  disabled
                  defaultValue={viewItems.filing.documentNo}
                  onChange={() => {}}
                />

                <TextInput
                  label="Transaction Date"
                  className="w-full"
                  radius="md"
                  size={small ? "xs" : "md"}
                  placeholder="none"
                  disabled
                  defaultValue={DateTimeUtils.getIsoDateFullWord(viewItems.dateTransaction)}
                  onChange={() => {}}
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
            <Textarea size="xl" radius="md" placeholder="Briefly state the reasons for filing leave." disabled defaultValue={viewItems.filing.reason} onChange={() => {}} />
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
