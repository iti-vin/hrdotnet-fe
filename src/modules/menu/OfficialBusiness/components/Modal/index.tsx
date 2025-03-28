import { Fragment } from "react";

import ViewDetails from "./dialog/ViewDetails";
import NewRequest from "./dialog/NewRequest";
import NewFilings from "./dialog/NewFilings";

import BatchApprove from "./confirmation/BatchApprove";
import BatchEndorse from "./confirmation/BatchEndorse";
import BatchCancel from "./confirmation/BatchCancel";
import CancelConfirmation from "./confirmation/CancelConfirmation";
import UpdateConfirmation from "./confirmation/UpdateConfirmation";

import Cancel from "./alert/Cancel";
import Success from "./alert/Success";

import Toast from "@/layout/main/alert/toast";

import { useOfficialBusinessStore } from "../../store";
import EditRequest from "./dialog/EditRequest";

interface ModalProps {
  panel?: "FILINGS" | "REQUEST" | "REVIEWAL" | "APPROVAL";
  endorse?: React.ReactNode;
  approve?: React.ReactNode;
}

export default function index({ panel, approve, endorse }: ModalProps) {
  const { openDialog, setOpenDialog, openAlert, setOpenAlert, openConfirmation, setOpenConfirmation, error, setError, warning, setWarning, success, setSuccess } =
    useOfficialBusinessStore();
  return (
    <Fragment>
      {/* Dialogs */}
      <EditRequest opened={openDialog === "EditRequest"} onClose={() => setOpenDialog("")} buttonClose={() => setOpenDialog("")} />
      <NewRequest opened={openDialog === "NewRequest"} onClose={() => setOpenDialog("")} buttonClose={() => setOpenDialog("")} />
      <NewFilings opened={openDialog === "NewFilings"} onClose={() => setOpenDialog("")} buttonClose={() => setOpenDialog("")} />
      <ViewDetails
        opened={openDialog === "ViewDetails"}
        onClose={() => setOpenDialog("")}
        buttonClose={() => setOpenDialog("")}
        panel={panel}
        approve={approve}
        endorse={endorse}
      />

      {/* Confirmation */}
      <BatchEndorse opened={openConfirmation === "BatchEndorse"} onClose={() => setOpenConfirmation("")} buttonClose={() => setOpenConfirmation("")} />
      <BatchApprove opened={openConfirmation === "BatchApprove"} onClose={() => setOpenConfirmation("")} buttonClose={() => setOpenConfirmation("")} />
      <BatchCancel opened={openConfirmation === "BatchCancel"} onClose={() => setOpenConfirmation("")} buttonClose={() => setOpenConfirmation("")} />
      <CancelConfirmation opened={openConfirmation === "SingleCancel"} onClose={() => setOpenConfirmation("")} />
      <UpdateConfirmation opened={openConfirmation === "UpdateRequest"} onClose={() => setOpenConfirmation("")} />

      {/* Alerts */}
      <Cancel opened={openAlert === "CancelAlert"} onClose={() => setOpenAlert("")} />
      <Success opened={openAlert === "SuccessUpdate"} onClose={() => setOpenAlert("")} title="Request Updated" message="Your Application has been successfully updated" />
      <Success opened={openAlert === "SuccessSubmit"} onClose={() => setOpenAlert("")} title="Request Submitted" message="Your Application has been successfully submitted!" />
      <Success opened={openAlert === "SuccessApprove"} onClose={() => setOpenAlert("")} title="Request Approved" message="Your Application has been successfully approved!" />
      <Success opened={openAlert === "SuccessEndorse"} onClose={() => setOpenAlert("")} title="Request Endorse" message="Your Application has been successfully endorsed!" />

      {/* Toast */}
      <Toast opened={error != ""} type="error" message={error} onClose={() => setError("")} />
      <Toast opened={warning != ""} type="warning" message={warning} onClose={() => setWarning("")} />
      <Toast opened={success != ""} type="success" message={success} onClose={() => setSuccess("")} />
    </Fragment>
  );
}
