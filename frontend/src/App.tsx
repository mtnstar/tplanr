import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToursList from './components/Tours/list'
import Layout from './components/layout'
import './i18n';

function App() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Layout />}>
         <Route index element={<ToursList />} />
       </Route>
     </Routes>
   </BrowserRouter>
  );
}

export default App;
