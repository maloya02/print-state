import React from 'react'
import Hero from '../components/Home/Hero'
import HeroShop from '../components/Home/Shop'
import HeroChoose from '../components/Home/Choose'
import HeroTagLine from '../components/Home/TagLine'
import HeroCustom from '../components/Home/Custom'
import HeroHow from '../components/Home/How'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import { useNavigate} from 'react-router-dom'
import { useEffect } from 'react'





const Home = () => {
  const navigate=useNavigate();
  // useEffect(() => {
  //   console.log('home render');
  //   const token = localStorage.getItem('token');
  //   if(token) {
  //     const accessToken = atob(token.split('.')[1])
  //     console.log( atob(token.split('.')[1]));
  //     if(accessToken.iat * 1000 <  Date.now()) {
  //       localStorage.removeItem('token');
  //       navigate('/Login');
  //     } else {
  //       // let them stay
  //     }
  //   } else {
  //     localStorage.removeItem('token');
  //     navigate('/Login');
  //   }
    
  // } );
  return (
    <div>
      <NavBar />
      <Hero />
      <HeroShop />
      <HeroChoose />
      <HeroTagLine />
      <HeroCustom />
      <HeroHow />
      <Footer />
    </div>
  )
}

export default Home

