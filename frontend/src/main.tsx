import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Paddlers from "./pages/Paddlers.tsx";
import Home from "./pages/Home.tsx";
import Lineups from "./pages/Lineups.tsx";
import AddPaddler from "./pages/AddPaddler.tsx";
import ConfirmAddPaddlers from "./pages/ConfirmAddPaddlers.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/paddlers",
    element: <Paddlers />,
  },
  {
    path: "/lineups",
    element: <Lineups />,
  },
  {
    path: "/paddlers/add",
    element: <AddPaddler />,
  },
  {
    path: "/paddlers/add/confirm",
    element: <ConfirmAddPaddlers />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
