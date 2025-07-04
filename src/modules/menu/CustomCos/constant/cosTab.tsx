import Approval from "../pages/Approval";
import Filings from "../pages/Filings";
import Request from "../pages/Request";
import Review from "../pages/Review";

export const cosTab = [
  {
    value: "request",
    label: "My Request",
    panel: <Request />,
  },
  {
    value: "review",
    label: "For Review",
    panel: <Review />,
  },
  {
    value: "approval",
    label: "For Approval",
    panel: <Approval />,
  },
  {
    value: "filings",
    label: "Employee Filings",
    panel: <Filings />,
  },
];
