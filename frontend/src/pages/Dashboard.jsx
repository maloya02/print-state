import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import { ShopContextProvider } from '../components/Ecom/EcomContext';
import SideMenu from '../components/Dashboard/SideMenu'
import { useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import { Navbar } from 'react-bootstrap';




const Dashboard = () => {

  const navigate=useNavigate();
  useEffect(() => {
    console.log('Dashboard render');
    const token = localStorage.getItem('token');
    console.log(token);
    if(token) {
      const accessToken = JSON.parse(atob(token.split('.')[1]))
      console.log(accessToken);
      console.log( atob(token.split('.')[1]));
      // if(accessToken.iat * 1000 <  Date.now()) {
      //   localStorage.removeItem('token');
      //   navigate('/Login');
      // }
      if(accessToken.userType !== 'admin'){
        console.log('to home');
        console.log(accessToken.userType);
        navigate('/')
      }
    } else {
      localStorage.removeItem('token');
      console.log('to log');
      navigate('/Login');
    }
    
  },[] );
  return (
    <ShopContextProvider>
      <NavBar/>
      <SideMenu />
    </ShopContextProvider>
  );
};

export default Dashboard;