import { Alert } from "@shared/template/";

interface AlertProps {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
}

export const SuccessRequest = ({ ...props }: AlertProps) => {
  return (
    <Alert
      {...props}
      title="Request Submitted"
      isChecked
      content="
          The request has been successfully submitted."
    />
  );
};

export const SuccessEndorse = ({ ...props }: AlertProps) => {
  return (
    <Alert
      {...props}
      title="Endorsement Success"
      isChecked
      content="
          The request has been successfully endorsed to the approver."
    />
  );
};

export const SuccessApprove = ({ ...props }: AlertProps) => {
  return (
    <Alert
      {...props}
      title="Request Approved"
      isChecked
      content="
          The request has been successfully approved."
    />
  );
};

export const Cancelled = ({ ...props }: AlertProps) => {
  return (
    <Alert
      {...props}
      title="Request Cancelled"
      content="
          The request has been cancelled."
    />
  );
};
