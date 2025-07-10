import { Text } from "@mantine/core";
import { ReactNode } from "react";
import { useMissedLogStore } from "../../../store/main";
import { statusColors } from "@shared/assets/types/Global";
import { useMediaQuery } from "@mantine/hooks";
import { Button, DatePickerInput, FileAttachment, Modal, Select, TextArea, TextInput } from "@shared/components";
interface ViewDetailsProps {
  panel?: "FILINGS" | "REQUEST" | "REVIEWAL" | "APPROVAL";
  endorse?: ReactNode;
  approve?: ReactNode;

  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export default function ViewDetails({ opened, onClose, buttonClose, panel, approve, endorse }: ViewDetailsProps) {
  const small = useMediaQuery("(max-width: 40em)");
  const { viewItems, setOpenDialog, setOpenConfirmation } = useMissedLogStore();
  const statusInfo = statusColors.find((item) => item.status === viewItems.filing.filingStatus.name) || {
    status: "Unknown",
    color: "gray",
  };

  const onHandleSingleCancel = () => {
    setOpenDialog("");
    setOpenConfirmation("SingleCancel");
  };

  const rndrBtnContent = () => {
    if (panel === "REQUEST") {
      let button: ReactNode;
      if (viewItems.filing.filingStatus.name === "Filed") {
        button = (
          <>
            <Button variant="outlineBlue" onClick={onHandleSingleCancel}>
              CANCEL REQUEST
            </Button>
            <Button variant="gradient" onClick={() => setOpenDialog("EditRequest")}>
              EDIT REQUEST
            </Button>
          </>
        );
      } else if (viewItems.filing.filingStatus.name === "Reviewed") {
        return (
          <Button variant="outlineBlue" onClick={onHandleSingleCancel}>
            CANCEL REQUEST
          </Button>
        );
      } else if (viewItems.filing.filingStatus.name === "Approved" || viewItems.filing.filingStatus.name === "Cancelled") {
        return null;
      }
      return button;
    } else if (panel === "REVIEWAL") {
      let button: ReactNode;
      if (viewItems.filing.filingStatus.name === "Filed") {
        button = (
          <>
            <Button variant="outlineBlue" onClick={onHandleSingleCancel}>
              CANCEL
            </Button>
            {endorse}
          </>
        );
      } else {
        button = (
          <Button variant="outlineBlue" onClick={onHandleSingleCancel}>
            CANCEL
          </Button>
        );
      }
      return button;
    } else if (panel === "APPROVAL" || "FILINGS") {
      let button: ReactNode;
      if (viewItems.filing.filingStatus.name === "Filed" || "Reviewed") {
        button = (
          <>
            <Button variant="outlineBlue" onClick={onHandleSingleCancel}>
              CANCEL
            </Button>
            {approve}
          </>
        );
      } else {
        button = (
          <Button variant="outlineBlue" onClick={onHandleSingleCancel}>
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
    <Modal title="View Details" size="xl" opened={opened} onClose={onClose} buttonClose={buttonClose} footer={<>{rndrBtnContent()}</>}>
      <div className="flex flex-col gap-5" style={{ color: "#6D6D6D" }}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 flex flex-col gap-5  border-solid border-0.5 border-sky-500 p-4 rounded-lg">
            <Text style={{ color: "#559CDA" }} className="text-xs md:text-lg font-bold text-center md:text-start">
              General Information
            </Text>

            <div>
              <DatePickerInput size={small ? "xs" : "md"} label="Date" placeholder="MM-DD-YYYY" className="w-full" id="date_from" value={viewItems.filing.dateFiled!} disabled />
            </div>
            <div>
              <Select label="Log Type" size={small ? "xs" : "md"} placeholder="Select log type" className="w-full" value={viewItems.filing.logType.name} disabled />
            </div>
            <div>
              <Select label="Log Time" size={small ? "xs" : "md"} placeholder="Select log time" className="w-full" value={viewItems.filing.timeInOut} disabled />
            </div>
            <div>
              <TextInput label="Reference Number" size={small ? "xs" : "md"} placeholder="Select Leave Option" className="w-full" disabled />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-5 border-solid border-0.5 border-sky-500 p-4 rounded-lg">
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
                <TextInput label="Document No." size={small ? "xs" : "md"} placeholder="00000000" value={viewItems.filing.documentNo} disabled />
              </div>

              <div className="flex flex-col w-full md:w-1/2">
                <DatePickerInput label="Transaction Date" size={small ? "xs" : "md"} placeholder="mm/dd/yyyy" value={new Date(viewItems.filing.dateTransaction)} disabled />
              </div>
            </div>

            <div className="flex flex-col">
              <TextArea
                label="Endorsement Information"
                size={small ? "xs" : "md"}
                placeholder="Endorsed by Jane Smith on October 25, 2024 at 6:43 PM."
                className="w-full"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <TextArea
                label="Approval Information"
                size={small ? "xs" : "md"}
                placeholder="Approved by Jane Smith on October 25, 2024 at 6:43 PM (Batch Approval)"
                className="w-full"
                disabled
              />
            </div>
            <div className="flex flex-col">
              <TextArea label="Cancellation Information" size={small ? "xs" : "md"} placeholder="No Information" className="w-full" disabled />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg">
          <TextArea label="Reason" labelVariant="header" placeholder="Briefly state the reasons for filing leave." value={viewItems.filing.reason} disabled />
        </div>

        <div className="flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg">
          <Text style={{ color: "#559CDA" }} className="font-bold  text-[15px] leading-[18px]">
            Attachment
          </Text>
          <FileAttachment />
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
            <TextArea label="Edit Log" labelVariant="header" placeholder="Date of Change  - Employee name changed the Application date from mm/dd/yyyy to mm/dd/yyyy." disabled />
          </div>
        </div>
      </div>
    </Modal>
  );
}
