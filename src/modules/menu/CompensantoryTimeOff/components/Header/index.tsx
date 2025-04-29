/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Tabler Icons Modules
import { IconCirclePlus, IconFileDiff } from "@tabler/icons-react";
//--- Shared Modules
import { Panel, PanelNavList } from "@shared/assets/types/Global";
//--- Container Layout
import Header from "@/layout/main/container/header";
import { HeaderButtonProps } from "@shared/assets/types/Component";
import { useCTOStore } from "../../store";

interface MissedLogHeaderI {
  panel: Panel;
}

export default function index({ panel }: MissedLogHeaderI) {
  const { setOpenDialog, setOpenConfirmation } = useCTOStore();
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
          setOpenConfirmation("BatchEndorse");
          // selectedRecords.length >= 1 && setOpenConfirmation("BatchEndorse");
        },
        sOnClick: () => {
          setOpenConfirmation("BatchCancel");
          // selectedRecords.length >= 1 && setOpenConfirmation("BatchCancel");
        },
        innerLabel: "ENDORSE",
      };
    } else if (panel === PanelNavList.Approval || PanelNavList.Filings) {
      return {
        label: "Batch Process",
        icon: <IconFileDiff size={25} stroke={2} />,
        fOnClick: () => {
          setOpenConfirmation("BatchApprove");
          // selectedRecords.length >= 1 && setOpenConfirmation("BatchApprove");
        },
        sOnClick: () => {
          setOpenConfirmation("BatchCancel");
          // selectedRecords.length >= 1 && setOpenConfirmation("BatchCancel");
        },
        innerLabel: "APPROVE",
      };
    } else return undefined;
  };

  return (
    <Header
      title="Compensatory Time Off"
      normalBtn={panel !== PanelNavList.Reviewal ? rndrNormalBtn() : undefined}
      popoverBtn={panel !== PanelNavList.Request ? rndrPopOverBtn() : undefined}
    />
  );
}
