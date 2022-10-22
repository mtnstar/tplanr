import ToursList from './components/Tours/list'
import Main from './components/Main'
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "tours",
        element: <ToursList />,
      },
    ],
  },
]);

export default router;
