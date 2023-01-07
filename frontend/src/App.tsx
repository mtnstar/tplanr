import { RouterProvider } from 'react-router-dom';
import './i18n';
import router from './router';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient();

function App() {
  axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json';
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
