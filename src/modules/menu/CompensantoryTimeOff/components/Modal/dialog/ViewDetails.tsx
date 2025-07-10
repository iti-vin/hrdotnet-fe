/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { IconNotes } from "@tabler/icons-react";
import { Flex, Stack, Text, useMatches } from "@mantine/core";
//--- Layouts
import { ModalProps } from "@shared/assets/types/Modal";
import { Panel } from "@shared/assets/types/Global";
import { DateRangePickerInput, Modal, TextArea, TextInput } from "@shared/components";
import ReferenceNoInput from "@shared/components/ReferenceInput";

//--- Shared
interface ViewDetailsProps extends ModalProps {
  panel?: Panel;
  onHandleSingleEndorse?: () => void;
  onHandleSingleApprove?: () => void;
}

export default function ViewDetails({
  opened,
  onClose,
  buttonClose,
}: // onHandleSingleEndorse,
// onHandleSingleApprove,
// panel,
ViewDetailsProps) {
  const size = useMatches({ base: "100%", sm: "50%" });
  return (
    <Modal
      title="View Details"
      size={size}
      opened={opened}
      onClose={onClose}
      buttonClose={buttonClose}
      formProps={{ onSubmit: () => console.log("Submit") }}
      footer={<Stack className="pt-5 flex flex-row justify-end">{/* {rndrBtnContent()} */}</Stack>}>
      <div className="flex flex-col gap-5" style={{ color: "#6D6D6D" }}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 flex flex-col gap-2  border-solid border-0.5 border-sky-500 p-4 rounded-lg">
            <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
              General Information
            </Text>
            <Stack className="flex flex-col gap-2">
              <DateRangePickerInput
                size="md"
                dateValue={[null, null]}
                setDateValue={(value) => console.log(value)}
                label="Duration"
                placeholder="Start Date"
                withAsterisk
                className="border-none w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
              <TextInput size="lg" radius={8} label="Duration Days" placeholder="0000-0000-0000" className="w-full" disabled />
              <ReferenceNoInput code="cto-view" size="lg" radius={8} label="Reference Number" placeholder="0000-0000-0000" className="w-full" disabled />
            </Stack>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg">
            <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
              Detailed Information
            </Text>
            <div>
              <Text
                size="md"
                // bg={statusInfo.color}
                className="font-medium text-sm lg:text-lg text-white text-center gap-1 rounded-md py-3"
              />
            </div>

            <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }} align="end">
              <TextInput label="Document No." className="w-full" radius="md" size="lg" placeholder="00000000" disabled />

              <TextInput label="Transaction Date" className="w-full" radius="md" size="lg" placeholder="none" disabled />
            </Flex>

            <div className="flex flex-col">
              <TextArea label="Endorsement Information" size="lg" radius="md" placeholder="Endorsed by Jane Smith on October 25, 2024 at 6:43 PM." className="w-full" disabled />
            </div>
            <div className="flex flex-col">
              <TextArea
                label="Approval Information"
                size="lg"
                radius="md"
                placeholder="Approved by Jane Smith on October 25, 2024 at 6:43 PM (Batch Approval)"
                className="w-full"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <TextArea label="Cancellation Information" size="lg" radius="md" placeholder="No Information" className="w-full" disabled />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg">
          <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
            Reason{" "}
          </Text>
          <TextArea size="xl" radius="md" placeholder="Briefly state the reasons for filing leave." disabled />
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
            <TextArea
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
    </Modal>
  );
}
