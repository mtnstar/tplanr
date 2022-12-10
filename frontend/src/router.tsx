import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import ItemList from './components/Item/List';
import Layout from './components/Layout';
import TourContainer from './components/Tour/Container';
import TourEdit from './components/Tour/Edit';
import TourList from './components/Tour/List';
import TourShow from './components/Tour/Show';
import TourNew from './components/Tour/New';
import SectionList from './components/Section/List';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/tours',
        element: <TourContainer />,
        children: [
          { path: '/tours', element: <TourList /> },
          { path: '/tours/new', element: <TourNew /> },
          { path: '/tours/:id', element: <TourShow /> },
          { path: '/tours/:id/edit', element: <TourEdit /> },
          { path: '/tours/:id/items', element: <ItemList /> },
          { path: '/tours/:id/sections', element: <SectionList /> },
        ],
      },
    ],
  },
]);

export default router;
