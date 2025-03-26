/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { Fragment } from "react";

//--- Dialogs
import NewRequest from "./dialog/NewRequest";
import NewFilings from "./dialog/NewFilings";
import ViewDetails from "./dialog/ViewDetails";
import EditRequest from "./dialog/EditRequest";

//--- Confirmation
import CancelConfirmation from "./dialog/confirmation/CancelConfirmation";
import UpdateConfirmation from "./dialog/confirmation/UpdateConfirmation";
import BatchEndorse from "./dialog/confirmation/BatchEndorse";
import BatchApprove from "./dialog/confirmation/BatchApprove";
import BatchCancel from "./dialog/confirmation/BatchCancel";

//--- Alerts
import Cancel from "./alert/Cancel";
import Success from "./alert/Success";

//--- Missed Log Store
import { useMissedLogStore } from "../../store/main";
import Toast from "@/layout/main/alert/toast";

interface ModalProps {
  panel?: "FILINGS" | "REQUEST" | "REVIEWAL" | "APPROVAL";
  endorse?: React.ReactNode;
  approve?: React.ReactNode;
}

export default function index({ panel, approve, endorse }: ModalProps) {
  const { error, setError, warning, setWarning, success, setSuccess, openAlert, setOpenAlert, openDialog, setOpenDialog, openConfirmation, setOpenConfirmation } =
    useMissedLogStore();
  return (
    <Fragment>
      <NewRequest opened={openDialog === "NewRequest"} onClose={() => setOpenDialog("")} buttonClose={() => setOpenDialog("")} />
      <EditRequest opened={openDialog === "EditRequest"} onClose={() => setOpenDialog("")} buttonClose={() => setOpenDialog("")} />
      <NewFilings opened={openDialog === "NewFiling"} onClose={() => setOpenDialog("")} buttonClose={() => setOpenDialog("")} />
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
      <Cancel opened={openAlert === "SuccessCancel"} onClose={() => setOpenAlert("")} />
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
