import { createBrowserRouter } from "react-router-dom";
import { AboutUsPage, Homepage } from "../pages";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />, // Renders directly at the root URL
  },
  {
    path: "/aboutus",
    element: <AboutUsPage />,
  },
]);
