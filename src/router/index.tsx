import App from "@/App";
import Chat from "@/views/chat/chat";
import Home from "@/views/home/home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: ":id",
        element: <Chat />,
      },
      {
        path: "new",
        element: <App />,
      },
    ],
  },
]);
export default router;
