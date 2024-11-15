//--- React Modules
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
//--- Mantine Modules
import { MantineProvider } from "@mantine/core";

//--- Global Style
import "@mantine/core/styles.css";
import "@/index.css";
//--- Routes
import { router } from "@shared/routes/Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);
