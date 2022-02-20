import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import './App.css';
import "../node_modules/font-awesome/css/font-awesome.css";
import DefaultLayout from './components/containers/DefaultLayout';
import HomePage from './components/Home';
import AnimalList from './components/AnimalList';
import AddNewAnimal from './components/AddNewAnimal';
import AnimalById from './components/AnimalById';
import BookList from './components/AddMultiImagesBook/BookList';
import AddNewBook from './components/AddMultiImagesBook/AddNewBook';


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

          { <Route
            path="/books/listbooks"
            element={
              <Suspense fallback={null}>
                <BookList />
              </Suspense>
            }
          /> }

          { <Route path="/animals/add" element={<AddNewAnimal />} /> }
          { <Route path="/books/addbook" element={<AddNewBook />} /> }
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
