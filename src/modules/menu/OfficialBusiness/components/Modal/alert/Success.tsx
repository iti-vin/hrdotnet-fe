/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import AlertModal, { IAlertModal } from "@shared/components/modals/alert";

export default function Success({ opened, onClose, header = "request success", body = "Your request has been successfully submitted!", duration = 5000 }: IAlertModal) {
  return (
    <>
      <AlertModal variant="primary" opened={opened} onClose={onClose} header={`${header}`} body={`${body}`} duration={duration} />
    </>
  );
}
