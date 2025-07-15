/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import AlertModal, { IAlertModal } from "@shared/components/modals/alert";

export default function Cancel({ opened, onClose, header = "Requested Cancelled", body = "Your request has been cancelled!", duration = 5000 }: IAlertModal) {
  return (
    <>
      <AlertModal variant="warning" opened={opened} onClose={onClose} header={`${header}`} body={`${body}`} duration={duration} />
    </>
  );
}
