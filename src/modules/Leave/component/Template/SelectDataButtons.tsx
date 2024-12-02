import "mantine-datatable/styles.layer.css";
import { LeaveStore } from "../../LeaveStore";
import { Button } from "@mantine/core";
import "@mantine/dates/styles.css";

export default function SelectDataButtons() {
  const { SELECTED_DATA, SET_ALERT, SET_SELECTED_DATA, ACTIVE_TAB } = LeaveStore();

  const renderListButtons = () => {
    if (SELECTED_DATA.status === "Cancelled") return null;

    if (SELECTED_DATA.status === "Filed") {
      return (
        <div className="w-2/3 md:w-1/3 flex gap-2 self-end">
          <Button
            className="w-1/2 rounded-md"
            variant="outline"
            onClick={() => {
              SET_SELECTED_DATA({});
              SET_ALERT("RequestCancelled");
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="transparent"
            className="w-1/2 rounded-md text-white border-none br-gradient"
            onClick={() => {
              SET_SELECTED_DATA({});
              SET_ALERT("RequestUpdated");
            }}
          >
            UPDATE
          </Button>
        </div>
      );
    } else {
      return (
        <div className="w-2/3 md:w-1/6 flex gap-2 self-end">
          <Button
            className="w-full rounded-md"
            variant="outline"
            onClick={() => {
              SET_SELECTED_DATA({});
              SET_ALERT("RequestCancelled");
            }}
          >
            CANCEL
          </Button>
        </div>
      );
    }
  };

  const renderReviewButtons = () => {
    if (["Cancelled", "Reviewed"].includes(SELECTED_DATA.status)) return null;

    return (
      <div className="w-2/3 md:w-1/3 flex gap-2 self-end">
        <Button
          className="w-1/2 rounded-md"
          variant="outline"
          onClick={() => {
            SET_SELECTED_DATA({});
            SET_ALERT("RequestRejected");
          }}
        >
          REJECT
        </Button>
        <Button
          variant="transparent"
          className="w-1/2 rounded-md text-white border-none br-gradient"
          onClick={() => {
            SET_SELECTED_DATA({});
            SET_ALERT("EndorsementSuccess");
          }}
        >
          ENDORSE
        </Button>
      </div>
    );
  };

  const renderApproveButtons = () => {
    if (["Cancelled", "Approved"].includes(SELECTED_DATA.status)) return null;

    return (
      <div className="w-2/3 md:w-1/3 flex gap-2 self-end">
        <Button
          className="w-1/2 rounded-md"
          variant="outline"
          onClick={() => {
            SET_SELECTED_DATA({});
            SET_ALERT("RequestRejected");
          }}
        >
          REJECT
        </Button>
        <Button
          variant="transparent"
          className="w-1/2 rounded-md text-white border-none br-gradient"
          onClick={() => {
            SET_SELECTED_DATA({});
            SET_ALERT("RequestApproved");
          }}
        >
          APPROVE
        </Button>
      </div>
    );
  };

  return (
    <>
      {ACTIVE_TAB === "list" && renderListButtons()}
      {ACTIVE_TAB === "review" && renderReviewButtons()}
      {ACTIVE_TAB === "approve" && renderApproveButtons()}
    </>
  );
}
