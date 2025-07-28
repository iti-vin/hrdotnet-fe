/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Tabler Icons Modules
import { IconCirclePlus, IconFileDiff } from "@tabler/icons-react";
//--- Shared Modules
import { PanelNavList } from "@shared/assets/types/Global";
//--- Container Layout
import Header from "@/layout/main/container/header";
import { useOvertimeStore } from "../../store";
import { HeaderButtonProps } from "../../assets/types";

interface MissedLogHeaderI {
  panel: "FILINGS" | "REQUEST" | "REVIEWAL" | "APPROVAL" | "LEDGER";
}

export default function index({ panel }: MissedLogHeaderI) {
  const { selectedRecords, setOpenDialog, setOpenConfirmation } = useOvertimeStore();

  // Single Usage Button On Header
  const rndrNormalBtn = (): HeaderButtonProps["normalBtn"] | undefined => {
    if (panel === PanelNavList.Request) {
      return {
        label: "New Request",
        onClick: () => setOpenDialog("NewRequest"),
      };
    } else if (panel === PanelNavList.Approval || PanelNavList.Filings) {
      return {
        label: "New Filings",
        onClick: () => setOpenDialog("NewFilings"),
        icon: <IconCirclePlus size={25} stroke={2} />,
      };
    } else return undefined;
  };

  // Popover Option Button on Header
  const rndrPopOverBtn = (): HeaderButtonProps["popoverBtn"] | undefined => {
    if (panel === PanelNavList.Reviewal) {
      return {
        label: "Batch Process",
        icon: <IconFileDiff size={25} stroke={2} />,
        fOnClick: () => {
          selectedRecords.length >= 1 && setOpenConfirmation("BatchEndorse");
        },
        sOnClick: () => {
          selectedRecords.length >= 1 && setOpenConfirmation("BatchCancel");
        },
        innerLabel: "ENDORSE",
        disabled: selectedRecords.length === 0,
      };
    } else if (panel === PanelNavList.Approval || PanelNavList.Filings) {
      return {
        label: "Batch Process",
        icon: <IconFileDiff size={25} stroke={2} />,
        fOnClick: () => {
          selectedRecords.length >= 1 && setOpenConfirmation("BatchApprove");
        },
        sOnClick: () => {
          selectedRecords.length >= 1 && setOpenConfirmation("BatchCancel");
        },
        innerLabel: "APPROVE",
        disabled: selectedRecords.length === 0,
      };
    } else return undefined;
  };

  return (
    <Header title="Overtime" normalBtn={panel !== PanelNavList.Reviewal ? rndrNormalBtn() : undefined} popoverBtn={panel !== PanelNavList.Request ? rndrPopOverBtn() : undefined} />
  );
}
