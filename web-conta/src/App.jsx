import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SigPag from './components/SigPag';
import PriPag from './components/PriPag';



const App = () => {
 

  return (
    <Router>
      <Routes>
        <Route path='/table' element={<SigPag />} />
        <Route path='/' element={<PriPag/>} />
      </Routes>
    </Router>
  )
};

export default App;