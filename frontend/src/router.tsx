import ToursList from './components/ToursList'
import Layout from './components/Layout'
import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Home from './components/Home';
import TourShow from './components/Tour/Show';
import TourLayout from './components/Tour/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "tours",
        element: <ToursList /> 
      },
      {
        path: "/tours/:id",
        element: <TourLayout />,
        children: [
          {
            path: "/tours/:id",
            element: <TourShow />,
          }]},
    ],
  },
]);

export default router;
