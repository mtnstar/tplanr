import ToursList from './components/Tours/List'
import Main from './components/Main'
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
} from "react-router-dom";
import Home from './components/Home';
import TourShow from './components/Tours/Show';

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
        element: <ToursList /> },
      {
        path: "/tours/:id",
        element: <TourShow />,
      }
    ],
  },
]);

export default router;
