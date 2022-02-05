import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import "../node_modules/font-awesome/css/font-awesome.css";
import DefaultLayout from './components/containers/DefaultLayout';
import HomePage from './components/Home';
import AnimalList from './components/AnimalList';
import AddNewAnimal from './components/AddNewAnimal';
import AnimalById from './components/AnimalById';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={< HomePage />} />

          { <Route
            path="/animals/list"
            element={
              <Suspense fallback={null}>
                <AnimalList />
              </Suspense>
            }
          /> }

          { <Route path="/animals/add" element={<AddNewAnimal />} /> }

          { <Route
            path="/animals/item/:id"
            element={
              <Suspense fallback={null}>
                <AnimalById />
              </Suspense>
            }
          /> }
          
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
