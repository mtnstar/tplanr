import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './i18n';
import router from './router';
import axios from 'axios';

function App() {
  axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json';
  return <RouterProvider router={router} />;
}

export default App;
