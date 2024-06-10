import React from 'react';
import { DataProvider, useData } from '../src/contexts/dataContexts';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from 'components/pages/Home';
import About from 'components/pages/About';
import NavBar from 'components/NavBar/NavBar';
import Analytic from 'components/pages/Analytic';

const App = () => {
  const { data } = useData();
  console.log(data)
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/analytic' element={<Analytic />} />
        </Routes  >
      </BrowserRouter>

    </div>
  );
};

const AppWithProvider = () => (
  <DataProvider>
    <App />
  </DataProvider>
);

export default AppWithProvider;
