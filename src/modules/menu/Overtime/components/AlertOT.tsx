import { Alert } from "@shared/template/";
import React from "react";

interface AlertProps {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;

  tabs?: "List" | "Review" | "Approve";

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


export const Rejected = ({ ...props }: AlertProps) => {
  return (
    <Alert
      {...props}
      title="Request Rejected"
      content="
          The request has been rejected."
    />
  );
};

export const Alerts = ({ opened, onClose, buttonClose, tabs }: AlertProps ) => {
  return (
    <React.Fragment>
      {tabs === "List" && (
       <>
        <SuccessRequest
          opened={opened}
          onClose={onClose}
          buttonClose={buttonClose}
        />
       </>
      )}
      {tabs === "Review" && (
        <SuccessEndorse
          opened={opened}
          onClose={onClose}
          buttonClose={buttonClose}
        />
      )}
      {tabs === "Approve" && (
        <SuccessApprove
          opened={opened}
          onClose={onClose}
          buttonClose={buttonClose}
        />
      )}
      <Cancelled opened={false} onClose={() => {}} buttonClose={() => {}} />
    </React.Fragment>
  );
};
