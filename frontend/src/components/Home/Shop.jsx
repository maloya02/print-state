import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
} from 'mdb-react-ui-kit';
import ShopImg from '../../img/Banner/heroshop.png';

const HeroShop = () => {
  return (
    <MDBContainer fluid style={{ height: '700px' }}>
      <MDBRow className='d-flex justify-content-center gap-3'>
        <MDBCol>
          <MDBContainer
            fluid
            className='content-text d-flex align-items-center justify-content-center flex-column'
            style={{ height: '100vh' }}
          >
            <MDBTypography tag='h1' className='display-2 pb-3 mb-3'>
              <span style={{ color: '#000000' }}>Shop &</span>{' '}
              <span style={{ color: '#F8567B' }}>Order</span>
            </MDBTypography>
            <MDBTypography tag='div' className='pb-3 mb-3 text-center w-50 fs-20'>
              We offer a wide range of quality items that you can choose from different stores.
              We are dedicated to providing exceptional products and exceptional services.
            </MDBTypography>
            <Link to='/Ecom'>
              <MDBBtn className='custom-button mx-5'>Explore</MDBBtn>
            </Link>
          </MDBContainer>
        </MDBCol>

        <MDBCol lg='6' md='6' sm='12' xs='12' className='d-flex justify-content-center h-400'>
          <img src={ShopImg} alt='' style={{ objectFit: 'contain', width: '80%' }} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default HeroShop;
