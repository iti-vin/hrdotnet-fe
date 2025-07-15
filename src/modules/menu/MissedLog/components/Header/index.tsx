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
import { useMissedLogStore } from "../../store/main";

interface MissedLogHeaderI {
  panel: "FILINGS" | "REQUEST" | "REVIEWAL" | "APPROVAL" | "LEDGER";
}

interface ButtonsProps {
  normalBtn: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };

  popoverBtn: {
    label: string;
    icon: React.ReactNode;
    innerLabel?: string;
    fOnClick: () => void;
    sOnClick: () => void;
  };
}

export default function index({ panel }: MissedLogHeaderI) {
  const { setOpenDialog, selectedRecords, setOpenConfirmation } = useMissedLogStore();
  // Single Usage Button On Header
  const rndrNormalBtn = (): ButtonsProps["normalBtn"] | undefined => {
    if (panel === PanelNavList.Request) {
      return {
        label: "New Request",
        onClick: () => setOpenDialog("NewRequest"),
      };
    } else if (panel === PanelNavList.Approval || PanelNavList.Filings) {
      return {
        label: "New Filings",
        onClick: () => setOpenDialog("NewFiling"),
        icon: <IconCirclePlus size={25} stroke={2} />,
      };
    } else return undefined;
  };

  // Popover Option Button on Header
  const rndrPopOverBtn = (): ButtonsProps["popoverBtn"] | undefined => {
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
      };
    } else return undefined;
  };

  return (
    <Header
      title="Missed Log"
      normalBtn={panel !== PanelNavList.Reviewal ? rndrNormalBtn() : undefined}
      popoverBtn={panel !== PanelNavList.Request ? rndrPopOverBtn() : undefined}
    />
  );
}
