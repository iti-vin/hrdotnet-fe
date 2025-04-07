/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Fragment } from "react";

import { ViewDetails, EditRequest, NewFilings, NewRequest } from "./dialog";
import { BatchApprove, BatchCancel, BatchEndorse, CancelConfirmation, UpdateConfirmation } from "./confirmation";
import { Batch, Cancel, Success } from "./alert";

// Shared
import Toast from "@/layout/main/alert/toast";
import { Panel } from "@shared/assets/types/Global";
import { useCTOStore } from "../../store";

interface ModalProps {
  panel?: Panel;
  onHandleSingleEndorse?: () => void;
  onHandleSingleApprove?: () => void;
}

export default function index({ panel, onHandleSingleEndorse, onHandleSingleApprove }: ModalProps) {
  const {
    openDialog,
    setOpenDialog,
    openAlert,
    setOpenAlert,
    openConfirmation,
    setOpenConfirmation,
    error,
    setError,
    warning,
    success,
  } = useCTOStore();
  return (
    <Fragment>
      {/* Dialogs */}
      <EditRequest
        opened={openDialog === "EditRequest"}
        onClose={() => setOpenDialog("")}
        buttonClose={() => setOpenDialog("")}
      />
      <NewRequest
        opened={openDialog === "NewRequest"}
        onClose={() => setOpenDialog("")}
        buttonClose={() => setOpenDialog("")}
      />
      <NewFilings
        opened={openDialog === "NewFilings"}
        onClose={() => setOpenDialog("")}
        buttonClose={() => setOpenDialog("")}
      />
      <ViewDetails
        opened={openDialog === "ViewDetails"}
        onClose={() => setOpenDialog("")}
        buttonClose={() => setOpenDialog("")}
        panel={panel}
        onHandleSingleEndorse={onHandleSingleEndorse}
        onHandleSingleApprove={onHandleSingleApprove}
      />

      {/* Confirmation */}
      <BatchEndorse
        opened={openConfirmation === "BatchEndorse"}
        onClose={() => setOpenConfirmation("")}
        buttonClose={() => setOpenConfirmation("")}
      />
      <BatchApprove
        opened={openConfirmation === "BatchApprove"}
        onClose={() => setOpenConfirmation("")}
        buttonClose={() => setOpenConfirmation("")}
      />
      <BatchCancel
        opened={openConfirmation === "BatchCancel"}
        onClose={() => setOpenConfirmation("")}
        buttonClose={() => setOpenConfirmation("")}
      />
      <CancelConfirmation opened={openConfirmation === "SingleCancel"} onClose={() => setOpenConfirmation("")} />
      <UpdateConfirmation opened={openConfirmation === "UpdateRequest"} onClose={() => setOpenConfirmation("")} />

      {/* Alerts */}
      <Cancel opened={openAlert === "CancelAlert"} onClose={() => setOpenAlert("")} />
      <Success
        opened={openAlert === "SuccessUpdate"}
        onClose={() => setOpenAlert("")}
        title="Request Updated"
        message="Your Application has been successfully updated"
      />
      <Success
        opened={openAlert === "SuccessSubmit"}
        onClose={() => setOpenAlert("")}
        title="Request Submitted"
        message="Your Application has been successfully submitted!"
      />
      <Success
        opened={openAlert === "SuccessApprove"}
        onClose={() => setOpenAlert("")}
        title="Request Approved"
        message="Your Application has been successfully approved!"
      />
      <Success
        opened={openAlert === "SuccessEndorse"}
        onClose={() => setOpenAlert("")}
        title="Request Endorse"
        message="Your Application has been successfully endorsed!"
      />
      <Batch
        opened={openAlert === "BatchApprove"}
        onClose={() => setOpenAlert("")}
        headerTitle="Approve"
        failedFilings={`${warning}`}
        successFilings={`${success}`}
      />
      <Batch
        opened={openAlert === "BatchEndorse"}
        onClose={() => setOpenAlert("")}
        headerTitle="Endorse"
        failedFilings={`${warning}`}
        successFilings={`${success}`}
      />
      <Batch
        opened={openAlert === "BatchCancel"}
        onClose={() => setOpenAlert("")}
        headerTitle="Cancel"
        failedFilings={`${warning}`}
        successFilings={`${success}`}
      />

      <Toast opened={error != ""} type="error" message={error} onClose={() => setError("")} />
    </Fragment>
  );
}
