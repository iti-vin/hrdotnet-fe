/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Button } from "@mantine/core";
import { FilingStatus, Panel, PanelNavList } from "@shared/assets/types/Global";

interface ButtonBuilderProps {
  panel: Panel;
  filingStatus: string;
  onHandleSingleCancel: () => void;
  onHandleEditRequest: () => void;
  onHandleSingleEndorse?: () => void;
  onHandleSingleApprove?: () => void;
}

/**
 * @const       ESSButton
 * @description render button based on the panel and filing status
 * @return      {Button} dynamically return button
 */
const ESSButton: React.FC<ButtonBuilderProps> = ({
  panel,
  filingStatus,
  onHandleSingleCancel,
  onHandleEditRequest,
  onHandleSingleEndorse,
  onHandleSingleApprove,
}) => {
  switch (panel) {
    case PanelNavList.Request:
      switch (filingStatus) {
        case FilingStatus.Filed:
          return (
            <>
              <Button variant="outline" className="rounded-md" onClick={onHandleSingleCancel}>
                CANCEL REQUEST
              </Button>
              <Button className="border-none custom-gradient rounded-md" onClick={onHandleEditRequest}>
                EDIT REQUEST
              </Button>
            </>
          );
        case FilingStatus.Reviewed:
          return (
            <Button variant="outline" className="rounded-md" onClick={onHandleSingleCancel}>
              CANCEL REQUEST
            </Button>
          );
        case FilingStatus.Approved:
        case FilingStatus.Cancelled:
          return null;
      }
      break;

    case PanelNavList.Reviewal:
      return (
        <>
          <Button variant="outline" className="rounded-md" onClick={onHandleSingleCancel}>
            CANCEL
          </Button>
          {filingStatus === FilingStatus.Filed && (
            <Button className="border-none custom-gradient rounded-md" onClick={onHandleSingleEndorse}>
              ENDORSE
            </Button>
          )}
        </>
      );

    case PanelNavList.Approval:
    case PanelNavList.Filings:
      return (
        <>
          <Button variant="outline" className="rounded-md" onClick={onHandleSingleCancel}>
            CANCEL
          </Button>
          {(filingStatus === FilingStatus.Filed || filingStatus === FilingStatus.Reviewed) && (
            <Button className="border-none custom-gradient rounded-md" onClick={onHandleSingleApprove}>
              APPROVE
            </Button>
          )}
        </>
      );

    default:
      return null;
  }
};

export default ESSButton;
