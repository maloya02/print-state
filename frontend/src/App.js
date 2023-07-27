// App.js
import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Ecom from "./pages/Ecom";
import Checkout from "./pages/Checkout";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css'
import Dashboard from "./pages/Dashboard";
import { ShopContextProvider } from './components/Ecom/EcomContext';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import EcomDisplay from "./pages/singlepage/EcomDisplay";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Ecom" element={<Ecom />} />
            <Route path="/EcomDisplay" element={<EcomDisplay/>}/>
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Login" element={<Login />}>
            </Route>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
