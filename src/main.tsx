import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import router from "@/router/index.tsx";
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
