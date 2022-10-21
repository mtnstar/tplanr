import ToursList from './components/Tours/list'
import Layout from './components/layout'
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "tours",
        element: <ToursList />,
      },
    ],
  },
]);

export default router;
