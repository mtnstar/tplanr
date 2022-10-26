import ToursList from './components/Tours/List'
import Main from './components/Main'
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "tours",
        element: <ToursList />,
      },
    ],
  },
]);

export default router;
