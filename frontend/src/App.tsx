import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tours from './components/tours'
import Layout from './components/layout'

function App() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Layout />}>
         <Route index element={<Tours />} />
       </Route>
     </Routes>
   </BrowserRouter>
  );
}

export default App;
