import TourList from './components/Tour/List';
import Layout from './components/Layout';
import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import TourShow from './components/Tour/Show';
import TourContainer from './components/Tour/Container';
import TourEdit from './components/Tour/Edit';
import ItemList from './components/Item/List';

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
          { path: '/tours/:id', element: <TourShow /> },
          { path: '/tours/:id/edit', element: <TourEdit /> },
          { path: '/tours/:id/items', element: <ItemList /> },
        ],
      },
    ],
  },
]);

export default router;
