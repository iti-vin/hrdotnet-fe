/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */
//--- React Modules
import React from "react";
//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { Button, Checkbox, Flex, ScrollArea, Skeleton, Stack, Text, Textarea, TextInput } from "@mantine/core";

//--- Shared Modules
import { Modal } from "@shared/template";
import { statusColors } from "@shared/assets/types/Global";

//--- Store
import useCOS from "../../store";
import useRequestCosStore from "../../store/request";

interface ViewDetailsProps {
  panel?: "FILINGS" | "REQUEST" | "REVIEWAL" | "APPROVAL";
  endorse?: React.ReactNode;
  approve?: React.ReactNode;
  cancel?: React.ReactNode;
}

export default function ViewDetails({ panel, endorse, approve, cancel }: ViewDetailsProps) {
  const small = useMediaQuery("(max-width: 770px)");
  const { onViewDetails, setOnViewDetails, viewItems } = useCOS();
  const { setOnEditRequest, setOnCancelRequest } = useRequestCosStore();

  const statusInfo = statusColors.find((item) => item.status === viewItems.filing.filingStatus.name) || { status: "Unknown", color: "gray" };

  const cancelBtn = () => {
    setOnCancelRequest(true);
    setOnViewDetails(false);
  };

  const editBtn = () => {
    setOnViewDetails(false);
    setOnEditRequest(true);
  };

  const rndrBtnContent = () => {
    if (panel === "REQUEST") {
      let button: React.ReactNode;
      if (viewItems.filing.filingStatus.name === "Filed") {
        button = (
          <React.Fragment>
            <Button variant="outline" className="rounded-md" onClick={cancelBtn}>
              Cancel Request
            </Button>
            <Button className="border-none custom-gradient rounded-md" onClick={editBtn}>
              Edit Request
            </Button>
          </React.Fragment>
        );
      } else if (viewItems.filing.filingStatus.name === "Reviewed") {
        return (
          <Button variant="outline" className="rounded-md" onClick={cancelBtn}>
            Cancel Request
          </Button>
        );
      } else if (viewItems.filing.filingStatus.name === "Approved" || viewItems.filing.filingStatus.name === "Cancelled") {
        return null;
      }
      return button;
    } else if (panel === "REVIEWAL") {
      let button: React.ReactNode;
      if (viewItems.filing.filingStatus.name === "Filed") {
        button = (
          <React.Fragment>
            {cancel}
            {endorse}
          </React.Fragment>
        );
      } else return null;
      return button;
    } else if (panel === "APPROVAL" || "FILINGS") {
      let button: React.ReactNode;
      if (viewItems.filing.filingStatus.name === "Filed" || "Reviewed") {
        button = (
          <React.Fragment>
            {cancel}
            {approve}
          </React.Fragment>
        );
      } else return null;
      return button;
    } else {
      return null;
    }
  };

  return (
    <Modal opened={onViewDetails} onClose={() => setOnViewDetails(false)} buttonClose={() => setOnViewDetails(false)} size="80%" title="Change Schedule Request Details">
      <ScrollArea className="flex flex-col gap-5 mt-3 w-full text-[#6d6d6d] relative" h={650} styles={{ scrollbar: { display: "none" } }}>
        <Skeleton visible={!viewItems}>
          <Flex className="flex-col gap-2">
            <Flex className="flex-col w-full p-0 md:flex-row gap-2">
              <div className="w-full md:w-1/2 flex flex-col gap-2  border-solid border-0.5 border-sky-500 p-4 rounded-lg">
                <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
                  General Information
                </Text>
                <div className="flex flex-col gap-2">
                  <DatePickerInput
                    size={small ? "xs" : "md"}
                    valueFormat="YYYY MMM DD"
                    label="From Date"
                    placeholder={viewItems.filing.dateFiled.dateFrom}
                    className="w-full"
                    radius={8}
                    disabled
                  />
                  <DatePickerInput
                    size={small ? "xs" : "md"}
                    valueFormat="YYYY MMM DD"
                    label="To Date"
                    placeholder={viewItems.filing.dateFiled.dateFrom}
                    className="w-full"
                    radius={8}
                    disabled
                  />
                  <TextInput size={small ? "xs" : "md"} radius={8} label="Request Schedule" placeholder={viewItems.filing.requested.name} className="w-full" disabled />
                  <Checkbox label="Rest Day" radius="xs" checked={viewItems.filing.requested.isRestDay} readOnly />
                  <TextInput size={small ? "xs" : "md"} radius={8} label="Reference No." placeholder="0000-0000-0000" className="w-full" disabled />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-2  border-solid border-0.5 border-sky-500 p-4 rounded-lg">
                <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
                  Detailed Information
                </Text>
                <div className="flex flex-col gap-2">
                  <div className="text-sm md:text-[16px]">Status</div>
                  <Text
                    size="md"
                    bg={statusInfo.color}
                    className="font-medium text-sm lg:text-lg text-white text-center gap-1 rounded-md py-3"
                    children={viewItems.filing.filingStatus.name}
                  />
                  <Flex className="flex-col gap-2 md:flex-row">
                    <DatePickerInput
                      size={small ? "xs" : "md"}
                      valueFormat="YYYY MMM DD"
                      label="Document Number"
                      placeholder={viewItems.filing.documentNo}
                      className="w-full"
                      radius={8}
                      disabled
                    />
                    <TextInput size={small ? "xs" : "md"} radius={8} label="Transaction Date" placeholder="Total Number of Days" className="w-full" disabled />
                  </Flex>
                  <Textarea
                    size={small ? "xs" : "md"}
                    radius={8}
                    label="Endorsement Information"
                    placeholder="Endorsement date and time by (name)using endorsement type."
                    className="w-full"
                    disabled
                  />
                  <Textarea
                    size={small ? "xs" : "md"}
                    radius={8}
                    label="Approval Information"
                    placeholder="Endorsement date and time by (name)using endorsement type."
                    className="w-full"
                    disabled
                  />
                  <Textarea
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
              <Textarea
                size={small ? "xs" : "lg"}
                radius={8}
                required
                label="Reason"
                placeholder={viewItems.filing.reason}
                className="w-full"
                classNames={{ label: " text-[#559CDA] font-bold", input: "bg-[#EEEEEE]" }}
                disabled
              />
            </Stack>
            <Stack className="border-solid border-0.5 border-sky-500 p-4 rounded-lg w-full">
              <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold">
                Attachment
              </Text>
              <div className="border-[1px] border-[#A8A8A8] bg-[#EEEEEE] border-dashed h-10 text-center content-center poppins text-xs">File: attachment.pdf Size: 20mb</div>
            </Stack>
            <Stack className="border-solid border-0.5 border-sky-500 p-4 rounded-lg w-full">
              <Textarea
                size={small ? "xs" : "lg"}
                radius={8}
                label="Edit Log"
                placeholder="Endorsement date and time by (name)using endorsement type."
                className="w-full"
                classNames={{ label: "text-[#559CDA]  font-bold", input: "bg-[#EEEEEE]" }}
                disabled
              />
            </Stack>
          </Flex>
        </Skeleton>
      </ScrollArea>
      <Stack className="pt-5 flex flex-row justify-end">{rndrBtnContent()}</Stack>
    </Modal>
  );
}
