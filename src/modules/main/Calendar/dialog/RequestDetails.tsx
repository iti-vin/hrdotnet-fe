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
import { statusColors } from "@shared/assets/types/Global";
import { ModalProps } from "@shared/assets/types/Modal";
import { memo } from "react";
import GeneralInfo from "../components/GeneralInfo";
import { useMediaQuery } from "@mantine/hooks";

export default function RequestDetails({ opened, onClose, buttonClose }: ModalProps) {
  const small = useMediaQuery("(max-width: 40em)");
  const statusInfo = statusColors.find((item) => item.status === "") || {
    status: "Unknown",
    color: "gray",
  };

  const GeneralInformation = memo(({ filings }: { filings: any }) => {
    return <GeneralInfo key={filings.id} items={filings} />;
  });

  // const apiEndpoint = ({ documentNo }: { documentNo: string }): string | null => {
  //   const prefix = documentNo.slice(0, 3);
  //   switch (prefix) {
  //     case "OB":
  //       return "/filings/me/official-businesses";
  //     case "OT":
  //       return "/filings/me/overtime-filings";
  //     case "OFF":
  //       return "/filings/me/offset-filings";
  //     case "COS":
  //       return "/schedules/filings/me/change-of-schedules";
  //     case "LV":
  //       return "/filings/me/leave-filings";
  //     case "ML":
  //       return "/filings/me/missed-logs";
  //     default:
  //       return null;
  //   }
  // };

  // console.log(apiEndpoint({ documentNo: "COS" }));

  return (
    <Modal
      isIconsActionsRequired
      title={"Request Details"}
      size="70%"
      opened={opened}
      onClose={onClose}
      buttonClose={buttonClose}>
      <ScrollArea
        className="flex flex-col gap-5 mt-3 w-full text-[#6d6d6d] relative"
        h={650}
        px={small ? 20 : 30}
        styles={{ scrollbar: { display: "none" } }}>
        <div className="flex flex-col gap-5" style={{ color: "#6D6D6D" }}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 flex flex-col gap-2  border-solid border-0.5 border-sky-500 p-4 rounded-lg">
              <GeneralInformation filings={[]} />
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg">
              <Text style={{ color: "#559CDA" }} className="font-bold">
                Detailed Information
              </Text>
              <div>
                <Text
                  size="md"
                  bg={statusInfo.color}
                  className="font-medium text-sm lg:text-lg text-white text-center gap-1 rounded-md py-3"
                />
              </div>

              <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }} align="end">
                <TextInput
                  label="Document No."
                  className="w-full"
                  radius="md"
                  size="lg"
                  placeholder="00000000"
                  disabled
                />

                <TextInput
                  label="Transaction Date"
                  className="w-full"
                  radius="md"
                  size="lg"
                  placeholder="none"
                  disabled
                />
              </Flex>

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
            <Text style={{ color: "#559CDA" }} className="font-bold">
              Reason{" "}
            </Text>
            <Textarea size="xl" radius="md" placeholder="Briefly state the reasons for filing leave." disabled />
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
                  <Text style={{ color: "#559CDA" }} className="font-bold">
                    Filing Breakdown
                  </Text>
                  <FilingBreakdown />
                </div>
              )} */}
            <div className="flex flex-col gap-2  w-full border-solid border-0.5 border-sky-500 p-4 rounded-lg">
              <Text style={{ color: "#559CDA" }} className="font-bold">
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

      <Stack className="pt-5 flex flex-row justify-end"></Stack>
    </Modal>
  );
}
