/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { IconNotes } from "@tabler/icons-react";
import { Flex, ScrollArea, Stack, Tabs, Text, useMatches } from "@mantine/core";
//--- Layouts
import { ModalProps } from "@shared/assets/types/Modal";
import { Panel, statusColors } from "@shared/assets/types/Global";
import { useOvertimeStore } from "../../../store";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import ESSButton from "@shared/ui/Buttons";
import { OvertimeItems } from "../../../models/response";
import { OvertimeServices } from "../../../services/api";
import { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";

import { DatePickerInput, TimePickerInput, TextArea, TextInput, Select, Modal } from "@shared/components";
import ReferenceNoInput from "@shared/components/ReferenceInput";
//--- Shared
interface ViewDetailsProps extends ModalProps {
  panel?: Panel;
  onHandleSingleEndorse?: () => void;
  onHandleSingleApprove?: () => void;
}

export default function ViewDetails({ opened, onClose, buttonClose, onHandleSingleEndorse, onHandleSingleApprove, panel }: ViewDetailsProps) {
  const size = useMatches({ base: "100%", sm: "50%" });
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
    <Modal
      title={`Overtime: ` + DateTimeUtils.getIsoDateWord(viewItems.filing.dateFiled)}
      size={size}
      opened={opened}
      onClose={onClose}
      buttonClose={buttonClose}
      containerClassName="p-0"
      footer={<Stack className="flex flex-row justify-end">{rndrBtnContent()}</Stack>}>
      <div className="flex flex-col gap-5" style={{ color: "#6D6D6D" }}>
        <Tabs variant="pills" defaultValue="overview">
          <Tabs.List className="h-[5%]">
            <Tabs.Tab value="overview" className="btn-view">
              Overview
            </Tabs.Tab>
            <Tabs.Tab value="attachment" className="btn-view">
              Attachment
            </Tabs.Tab>
            <Tabs.Tab value="history" className="btn-view">
              History
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" className="h-[95%] w-full py-4">
            <ScrollArea className="h-full w-full" type="hover">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 flex flex-col gap-2  border-solid border-0.5 border-[#6d6d6d] p-4 rounded-lg">
                  <Text style={{ color: "#6d6d6d" }} fz={{ base: 12, sm: 14, md: 15 }} className="font-bold text-center md:text-start">
                    General Information
                  </Text>
                  <Stack className="flex flex-col gap-2">
                    <DatePickerInput
                      size={small ? "xs" : "md"}
                      label="Overtime Date"
                      value={DateTimeUtils.getIsoDateWord(viewItems.filing.dateFiled)}
                      setValue={() => {}}
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
                      <ReferenceNoInput
                        code="reference-no"
                        size={small ? "xs" : "md"}
                        radius={8}
                        label="Reference No."
                        className="w-full"
                        max={14}
                        placeholder="0000-0000-0000"
                        disabled
                        value=""
                      />
                    </Flex>

                    <Flex direction={{ base: "column", sm: "row" }} justify="space-between" className="w-full" gap={20}>
                      <TimePickerInput
                        code="actualIn"
                        disabled
                        size="md"
                        label="Actual OT In"
                        value={DateTimeUtils.getCurrTimeDefault(viewItems.filing.actual.dateFrom)}
                        withDropdown
                        withSeconds
                        required
                      />
                      <TimePickerInput
                        code="actualIn"
                        disabled
                        size="md"
                        label="Actual OT Out"
                        value={DateTimeUtils.getCurrTimeDefault(viewItems.filing.actual.dateTo)}
                        withDropdown
                        withSeconds
                        required
                      />
                    </Flex>
                    <Flex direction={{ base: "column", sm: "row" }} justify="space-between" gap={20}>
                      <TimePickerInput
                        code="actualIn"
                        disabled
                        size="md"
                        label="OT From"
                        value={DateTimeUtils.getCurrTimeDefault(viewItems.filing.requested.dateFrom)}
                        withDropdown
                        withSeconds
                        required
                      />
                      <TimePickerInput
                        code="actualIn"
                        disabled
                        size="md"
                        label="OT To"
                        value={DateTimeUtils.getCurrTimeDefault(viewItems.filing.requested.dateTo)}
                        withDropdown
                        withSeconds
                        required
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

                <div className="w-full md:w-1/2 flex flex-col gap-2 border-solid border-0.5 border-[#6d6d6d] p-4 rounded-lg">
                  <Text style={{ color: "#6d6d6d" }} fz={{ base: 12, sm: 14, md: 15 }} className="font-bold text-center md:text-start">
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

                    <DatePickerInput
                      label="Transaction Date"
                      size={small ? "xs" : "md"}
                      placeholder="none"
                      disabled
                      value={DateTimeUtils.getIsoDateWord(viewItems.filing.dateFiled)}
                      setValue={() => {}}
                    />
                  </Flex>

                  <div className="flex flex-col">
                    <TextArea
                      code="reason"
                      id="reason"
                      label="Endorsement Information"
                      size={small ? "xs" : "md"}
                      placeholder="Endorsed by Jane Smith on October 25, 2024 at 6:43 PM."
                      withAsterisk
                      className="w-full"
                      styles={{
                        input: { height: "100px" },
                        label: { fontSize: "16px", color: "#6d6d6d" },
                      }}
                      radius={8}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <TextArea
                      code="reason"
                      id="reason"
                      label="Approval Information"
                      size={small ? "xs" : "md"}
                      placeholder="Approved by Jane Smith on October 25, 2024 at 6:43 PM (Batch Approval)"
                      withAsterisk
                      className="w-full"
                      styles={{
                        input: { height: "100px" },
                        label: { fontSize: "16px", color: "#6d6d6d" },
                      }}
                      radius={8}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <TextArea
                      code="reason"
                      id="reason"
                      label="Cancellation Information"
                      size={small ? "xs" : "md"}
                      placeholder="No Information"
                      withAsterisk
                      className="w-full"
                      styles={{
                        input: { height: "100px" },
                        label: { fontSize: "16px", color: "#6d6d6d" },
                      }}
                      radius={8}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </Tabs.Panel>

          <Tabs.Panel value="attachment" className="h-[95%] w-full py-4">
            <ScrollArea className="h-full w-full py-4" type="hover">
              <div className="flex flex-col gap-5 border-solid border-0.5 border-[#6d6d6d] p-4 rounded-lg">
                <Text style={{ color: "#6d6d6d" }} fz={{ base: 12, sm: 14, md: 15 }} className="font-bold text-center md:text-start">
                  Attachment
                </Text>
                <div
                  className="border-dashed border-0.5 border-sky-500 px-4 py-2 rounded-lg flex flex-col justify-center cursor-pointer"
                  onClick={() => {}}
                  style={{ background: "#EEEEEE", opacity: "0.5" }}>
                  <div className="flex items-center gap-5">
                    <IconNotes size={35} />

                    <div className="flex flex-col">
                      <Text fz={14} fw={700} c="#6d6d6d">
                        File: attachment.pdf
                      </Text>
                      <Text fz={10}>Size: 20 MB </Text>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </Tabs.Panel>

          <Tabs.Panel value="history" className="h-[95%] w-full py-4">
            <Stack className="h-full w-full py-4">
              <div className="w-full h-full flex flex-col gap-2 border-solid border-0.5 border-[#6d6d6d] p-4 rounded-lg">
                <Text style={{ color: "#6d6d6d" }} fz={{ base: 12, sm: 14, md: 15 }} className="font-bold text-center md:text-start">
                  History
                </Text>

                <ScrollArea className="h-full w-full" type="hover">
                  <Flex></Flex>
                </ScrollArea>
              </div>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </div>
    </Modal>
  );
}
