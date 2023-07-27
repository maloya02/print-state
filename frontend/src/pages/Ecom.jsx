import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import { PRODUCTS } from '../product';
import { EcomProduct } from '../components/Ecom/Products';
import EcomeFeatured from '../components/Ecom/Featured';
import EcomHero from '../components/Ecom/Hero';
import CatBanner from '../components/Ecom/CatBanner';
import CategoryEcom from '../components/Ecom/CategoryEcom';
import ProductPrev from '../components/Ecom/ProductPrev';
import ProductList from '../components/Ecom/ProductList';
import { MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import EcomDisplay from './singlepage/EcomDisplay';



const Ecom = () => {
  const [products, setProducts] = useState(PRODUCTS); // Add state for products

  return (
    <div>
      <NavBar />
      <EcomHero />
      <CatBanner />
        <MDBContainer fluid className='px-5'>
          <MDBTypography variant='display-2' className='text-center fw-bold p-5 m-5'>
            Featured Products
          </MDBTypography>
          <EcomDisplay/>
        </MDBContainer>
  
      <Footer />
    </div>
  )
}

export default Ecom;
