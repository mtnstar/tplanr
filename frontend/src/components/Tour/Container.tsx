import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';
import TourNav from './Nav';

const queryClient = new QueryClient();

function TourContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <TourNav />
      <div className='container mt-4'>
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default TourContainer;
