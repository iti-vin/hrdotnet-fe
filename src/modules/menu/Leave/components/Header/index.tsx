/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Header from "@/layout/main/container/header";
import { IconCirclePlus, IconFileDiff } from "@tabler/icons-react";
import useLeaveStore from "../../store/LeaveStore";

interface LeaveHeaderProps {
  panel: "FILINGS" | "REQUEST" | "REVIEWAL" | "APPROVAL" | "LEDGER";
}

interface ButtonsProps {
  normalBtn?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };

  popoverBtn?: {
    label: string;
    icon: React.ReactNode;
    innerLabel?: string;
    fOnClick: () => void;
    sOnClick: () => void;
  };
}

export default function index({ panel }: LeaveHeaderProps) {
  const { setOpenDialog, selectedRecords } = useLeaveStore();
  const rndrNormalBtn = (): ButtonsProps["normalBtn"] | undefined => {
    if (panel === "REQUEST") {
      return {
        label: "New Request",
        onClick: () => setOpenDialog("NewRequest"),
      };
    } else if (panel === "APPROVAL" || "FILINGS") {
      return {
        label: "New Filings",
        onClick: () => setOpenDialog("NewFilings"),
        icon: <IconCirclePlus size={25} stroke={2} />,
      };
    } else return undefined;
  };

  const rndrPopoverBtn = (): ButtonsProps["popoverBtn"] | undefined => {
    if (panel === "REVIEWAL") {
      return {
        label: "Batch Process",
        icon: <IconFileDiff size={25} stroke={2} />,
        fOnClick: () => {
          selectedRecords.length >= 1 && setOpenDialog("BatchEndorse");
        },
        sOnClick: () => {
          selectedRecords.length >= 1 && setOpenDialog("BatchCancel");
        },
        innerLabel: "ENDORSE",
      };
    } else if (panel === "APPROVAL" || "FILINGS") {
      return {
        label: "Batch Process",
        icon: <IconFileDiff size={25} stroke={2} />,
        fOnClick: () => {
          selectedRecords.length >= 1 && setOpenDialog("BatchApprove");
        },
        sOnClick: () => {
          selectedRecords.length >= 1 && setOpenDialog("BatchCancel");
        },
        innerLabel: "APPROVE",
      };
    } else return undefined;
  };

  return (
    <Header
      title="Leave"
      normalBtn={panel !== "REVIEWAL" ? rndrNormalBtn() : undefined}
      popoverBtn={panel !== "REQUEST" ? rndrPopoverBtn() : undefined}
    />
  );
}
