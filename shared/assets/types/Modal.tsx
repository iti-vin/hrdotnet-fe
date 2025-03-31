/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

export interface ModalProps {
  opened: boolean;
  onClose: () => void;
  buttonClose?: () => void;
}
