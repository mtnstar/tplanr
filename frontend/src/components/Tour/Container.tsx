import TourNav from './Nav';
import { Outlet } from 'react-router-dom';
import { QueryClientProvider, QueryClient, useQuery } from 'react-query';

const queryClient = new QueryClient();

function TourContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <TourNav />
      <Outlet />
    </QueryClientProvider>
  );
}

export default TourContainer;
