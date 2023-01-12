import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import TourContainer from './components/Tour/Container';
import TourEdit from './components/Tour/Edit';
import TourList from './components/Tour/List';
import TourShow from './components/Tour/Show';
import TourNew from './components/Tour/New';
import SectionList from './components/Section/List';
import Login from './components/Login';
import ItemListContainer from './components/ItemList/Container';
import ItemListList from './components/ItemList/List';
import ItemList from './components/Item/List';
import ItemListShow from './components/ItemList/Show';
import ParticipationTourItemList from './participation/components/Tour/Item/List';
import ParticipationLayout from './participation/components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/login',
            element: <Login />,
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
          {
            path: '/item_lists',
            element: <ItemListContainer />,
            children: [
              { path: '/item_lists', element: <ItemListList /> },
              { path: '/item_lists/:id', element: <ItemListShow /> },
            ],
          },
        ],
      },
      {
        path: '/participation/:uid',
        element: <ParticipationLayout />,
        children: [
          {
            path: '/participation/:uid',
            element: <ParticipationTourItemList />,
          },
        ],
      },
    ],
  },
]);

export default router;
