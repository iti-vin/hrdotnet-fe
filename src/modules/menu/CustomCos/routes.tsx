import { Navigate, type RouteObject } from "react-router-dom";
import CustomCos from ".";
import Request from "./pages/Request";
import Review from "./pages/Review";
import Approval from "./pages/Approval";
import Fillings from "./pages/Filings";
import { PATH } from "./utils/pageRoutes";

export const customCosRoutes: RouteObject = {
  path: "custom-change-schedule",
  element: <CustomCos />,
  children: [
    {
      index: true,
      element: <Navigate to={PATH.REQUEST} />,
    },
    {
      path: PATH.REQUEST,
      element: <Request />,
    },
    {
      path: PATH.REVIEW,
      element: <Review />,
    },
    {
      path: PATH.APPROVAL,
      element: <Approval />,
    },
    {
      path: PATH.FILLINGS,
      element: <Fillings />,
    },
  ],
};
