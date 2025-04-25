import Home from "@/views/home/home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: ":id",
        element: <div>chat</div>,
      },
      {
        path: "new",
        element: <div>new chat</div>,
      },
    ],
  },
]);
export default router;
