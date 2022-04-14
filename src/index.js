import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import Main_Page from './Pages/Main_Page';
import Product_Page from './Pages/Product_Page';  
import Register_Page from './Pages/Register_Page'
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
    <BrowserRouter>
 <Routes>
      <Route path="/" element={<Main_Page />} />
      <Route path="/Product_Page" element={<Product_Page />} />
      <Route path='/Register_Page' element={<Register_Page/>} />
    </Routes>
  </BrowserRouter>,
   document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
