import { createBrowserRouter } from "react-router-dom";
import { ClassPage } from "../pages/ClassesPage";
import { Homepage } from "../pages/HomePage";
import { Calender } from "../pages";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/classes",
    element: <ClassPage />,
  },
  {
    path: "/calender",
    element: <Calender />,
  },
]);
