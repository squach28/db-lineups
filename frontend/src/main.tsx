import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Paddlers from "./pages/Paddlers.tsx";
import Home from "./pages/Home.tsx";
import Lineups from "./pages/Lineups.tsx";
import AddPaddler from "./pages/AddPaddler.tsx";
import ConfirmAddPaddlers from "./pages/ConfirmAddPaddlers.tsx";
import AddLineup from "./pages/LineupDetail.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Profile from "./pages/Profile.tsx";
import LineupDetail from "./pages/LineupDetail.tsx";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/paddlers",
        element: <Paddlers />,
      },
      {
        path: "/paddlers/add",
        element: <AddPaddler />,
      },
      {
        path: "/paddlers/add/confirm",
        element: <ConfirmAddPaddlers />,
      },
      {
        path: "/lineups",
        element: <Lineups />,
      },
      {
        path: "/lineups/:id",
        element: <LineupDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  // {
  //   path: "/paddlers",
  //   element: <Paddlers />,
  // },
  // {
  //   path: "/lineups",
  //   element: <Lineups />,
  // },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  // {
  //   path: "/signup",
  //   element: <Signup />,
  // },
  // {
  //   path: "/paddlers/add",
  //   element: <AddPaddler />,
  // },
  // {
  //   path: "/paddlers/add/confirm",
  //   element: <ConfirmAddPaddlers />,
  // },
  // {
  //   path: "/lineups/:id",
  //   element: <LineupDetail />,
  // },
  // {
  //   path: "/profile",
  //   element: <Profile />,
  // },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
