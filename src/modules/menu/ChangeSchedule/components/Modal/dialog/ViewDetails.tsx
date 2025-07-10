/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */
//--- React Modules
//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { Checkbox, Flex, Stack, Text } from "@mantine/core";

//--- Shared Modules

import { Panel, statusColors } from "@shared/assets/types/Global";
import { ModalProps } from "@shared/assets/types/Modal";
import ESSButton from "@shared/ui/Buttons";
import { useChangeOfScheduleStore } from "../../../store";
import { CosServices } from "../../../services/api";
import { useEffect, useRef } from "react";
import { CosItems } from "../../../models/response";
import { DatePickerInput } from "@mantine/dates";
import { Modal, TextInput, TextArea, FileAttachment } from "@shared/components";

//--- Store

interface ViewDetailsProps extends ModalProps {
  panel?: Panel;
  onHandleSingleEndorse?: () => void;
  onHandleSingleApprove?: () => void;
}
export default function ViewDetails({ opened, onClose, buttonClose, onHandleSingleEndorse, onHandleSingleApprove, panel }: ViewDetailsProps) {
  const small = useMediaQuery("(max-width: 770px)");

  const { viewItems, setOpenDialog, setOpenConfirmation, setSingleItem } = useChangeOfScheduleStore();
  // const handleCopy = () => {
  //   const dateFrom = document.getElementById("date_from")?.innerText.trim() || "";
  //   const dateTo = document.getElementById("date_to")?.innerText.trim() || "";
  //   const reason = (document.getElementById("reason") as HTMLTextAreaElement)?.value.trim() || "";
  //   const referenceNo = document.getElementById("reference_no")?.innerText.trim() || "";

  //   const textToCopy = JSON.stringify({ dateFrom, dateTo, reason, referenceNo });
  //   navigator.clipboard
  //     .writeText(textToCopy)
  //     .then(() => {
  //       alert("Text copied to clipboard!");
  //     })
  //     .catch((err) => {
  //       console.error("Failed to copy: ", err);
  //       alert("Failed to copy text!");
  //     });
  // };
  const onHandleSingleCancel = () => {
    setOpenDialog("");
    setOpenConfirmation("SingleCancel");
  };

  const onHandleEditRequest = () => {
    setOpenDialog("EditRequest");
  };

  const statusInfo = statusColors.find((item) => item.status === viewItems.filing.filingStatus.name) || {
    status: "Unknown",
    color: "gray",
  };

  const rndrBtnContent = () => (
    <>
      <ESSButton
        panel={panel!}
        filingStatus={viewItems.filing.filingStatus.name}
        onHandleSingleCancel={onHandleSingleCancel}
        onHandleEditRequest={onHandleEditRequest}
        onHandleSingleEndorse={onHandleSingleEndorse}
        onHandleSingleApprove={onHandleSingleApprove}
      />
    </>
  );

  const fetchCOSDetails = async (id: number, type: Panel) => {
    const apiMap: Record<Panel, ((id: number) => Promise<CosItems>) | null> = {
      REQUEST: CosServices.getMyCOSById,
      REVIEWAL: CosServices.getReviewalCOSById,
      APPROVAL: CosServices.getApprovalCOSById,
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
      fetchCOSDetails(viewItems.filing.id, panel!);
    }
  }, [viewItems.filing.id]);

  const printRef = useRef<HTMLDivElement>(null);

  // const handlePrint = () => {
  //   if (!printRef.current) return;

  //   // const printContent = printRef.current.innerHTML;
  //   // const originalContent = document.body.innerHTML;

  //   // document.body.innerHTML = printContent;
  //   window.print();
  // };

  return (
    <Modal opened={opened} onClose={onClose} buttonClose={buttonClose} size="xl" title="Change Schedule Request Details" footer={<>{rndrBtnContent()}</>}>
      <Flex ref={printRef} className="print-container flex-col gap-5">
        <Flex className="flex-col w-full p-0 md:flex-row gap-5">
          <div className="w-full md:w-1/2 flex flex-col gap-2  border-solid border-0.5 border-sky-500 p-4 rounded-lg">
            <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
              General Information
            </Text>
            <div className="flex flex-col gap-[29px]">
              <DatePickerInput
                size={small ? "xs" : "md"}
                valueFormat="YYYY MMM DD"
                label="From Date"
                placeholder={viewItems.filing.dateFiled.dateFrom}
                className="w-full"
                id="date_from"
                disabled
              />
              <DatePickerInput size={small ? "xs" : "md"} label="To Date" placeholder={viewItems.filing.dateFiled.dateFrom} className="w-full" id="date_to" disabled />

              <TextInput size={small ? "xs" : "md"} label="Request Schedule" placeholder={viewItems.filing.requested.name} className="w-full" disabled />
              <Checkbox label="Rest Day" radius="xs" checked={viewItems.filing.requested.isRestDay} readOnly />
              <TextInput size={small ? "xs" : "md"} label="Reference No." placeholder="0000-0000-0000" className="w-full" disabled />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-3  border-solid border-0.5 border-sky-500 p-4 rounded-lg">
            <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
              Detailed Information
            </Text>
            <div className="flex flex-col gap-5">
              <div className="text-sm md:text-[16px]">Status</div>
              <Text
                size="md"
                bg={statusInfo.color}
                className="font-medium text-sm lg:text-lg text-white text-center gap-1 rounded-md py-3"
                children={viewItems.filing.filingStatus.name}
              />
              <Flex className="flex-col gap-2 md:flex-row">
                {/* <DatePickerInput
                  size={small ? "xs" : "md"}
                  valueFormat="YYYY MMM DD"
                  label="Document Number"
                  placeholder={viewItems.filing.documentNo}
                  className="w-full"
                  disabled
                /> */}
                <TextInput size={small ? "xs" : "md"} label="Document Number" placeholder={viewItems.filing.documentNo} className="w-full" disabled />
                <TextInput size={small ? "xs" : "md"} radius={8} label="Transaction Date" placeholder="Total Number of Days" className="w-full" disabled />
              </Flex>
              <TextArea
                size={small ? "xs" : "md"}
                radius={8}
                label="Endorsement Information"
                placeholder="Endorsement date and time by (name)using endorsement type."
                className="w-full"
                disabled
              />
              <TextArea
                size={small ? "xs" : "md"}
                radius={8}
                label="Approval Information"
                placeholder="Endorsement date and time by (name)using endorsement type."
                className="w-full"
                disabled
              />
              <TextArea
                size={small ? "xs" : "md"}
                radius={8}
                label="Cancellation Information"
                placeholder="Endorsement date and time by (name)using endorsement type."
                className="w-full"
                disabled
              />
            </div>
          </div>
        </Flex>
        <Stack className="border-solid border-0.5 border-sky-500 p-4 rounded-lg w-full">
          <TextArea
            size={small ? "xs" : "lg"}
            required
            label="Reason"
            labelVariant="header"
            value={viewItems.filing.reason}
            placeholder={viewItems.filing.reason}
            className="w-full"
            disabled
            id="reason"
          />
        </Stack>
        <Stack className="no-print border-solid border-0.5 border-sky-500 p-4 rounded-lg w-full">
          <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold">
            Attachment
          </Text>
          <FileAttachment />
        </Stack>
        <Stack className="no-print border-solid border-0.5 border-sky-500 p-4 rounded-lg w-full">
          <TextArea
            size={small ? "xs" : "lg"}
            label="Edit Log"
            placeholder="Endorsement date and time by (name)using endorsement type."
            className="w-full"
            labelVariant="header"
            disabled
          />
        </Stack>
      </Flex>
    </Modal>
  );
}
