import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";

import './scss/app.scss'
import Home from './pages/Home';
// import NotFound from './pages/NotFound';
// import Cart from './pages/Cart';
// import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';


const Cart =React.lazy(() => import(/*webpackChunkName:"Cart"*/'./pages/Cart'))
const FullPizza =React.lazy(() => import(/*webpackChunkName:"FullPizza"*/'./pages/FullPizza'))
const  NotFound =React.lazy(() => import(/*webpackChunkName:"NotFound"*/'./pages/NotFound'))



function App() {
  return (
    
        <Routes>
     
            <Route path='/' element={<MainLayout />}>
              <Route path='' element={<Home />}/>
              <Route path='cart' element={
                <React.Suspense fallback={<div className="content">Loading...</div>}>
                  <Cart/>
                </React.Suspense>
              }/>
              <Route path='pizza/:id' element={
                  <React.Suspense fallback={<div className="content">Loading...</div>}>
                     <FullPizza/>
                  </React.Suspense>
              }/>
              <Route path='*' element={
                  <React.Suspense fallback={<div className="content">Loading...</div>}>
                    <NotFound/>
                  </React.Suspense>
              }/>
            </Route>
        </Routes>
    
     

  );
}

export default App;
