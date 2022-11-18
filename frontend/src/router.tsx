import ToursList from './components/ToursList'
import Layout from './components/Layout'
import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Home from './components/Home';
import TourShow from './components/Tour/Show';
import TourContainer from './components/Tour/Container';
import TourEdit from './components/Tour/Edit';

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
        element: <TourContainer />,
        children: [
          { path: "/tours/:id",
            element: <TourShow />, },
          { path: "/tours/:id/edit",
            element: <TourEdit />, },
        ]},
    ],
  },
]);

export default router;
