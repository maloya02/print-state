import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBTypography
} from 'mdb-react-ui-kit';
import Logo from '../../img/logo.jpg';

const Footer = () => {
  return (
    <MDBFooter className='text-lg-left bg-pink' style={{ width: '100%', marginTop: 'auto' }}>
      <MDBContainer className='p-4 pb-0'>
        <MDBRow className='mt-3'>
          <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
            <MDBRow>
              <MDBCol md='3' lg='4' xl='3'>
                <img src={Logo} alt='' style={{ width: '50px', height: '50px', objectFit: 'cover',borderRadius: '5px'}} />
              </MDBCol>
              <MDBCol md='3' lg='4' xl='3'>
                <MDBTypography tag='h1'>
                  printState
                </MDBTypography>
              </MDBCol>
            </MDBRow>
            <MDBTypography tag='p'>
            printState is an innovative e-commerce platform where creativity meets commerce. Design and customize a wide range of products, from fashion items to accessories. Publish your creations and earn a profit. Join printState today!
            </MDBTypography>
          </MDBCol>

          <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
            <p>
              <a href='#!' className='text-reset'>
                How it Works?
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Custom
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Shop
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Need Help?
              </a>
            </p>
          </MDBCol>

          <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Contact Us</h6>
            <p>
              <MDBIcon color='secondary' icon='home' className='' />
              Manila, Philippines
            </p>
            <p>
              <MDBIcon color='secondary' icon='envelope' className='' />
              printstate@gmail.com
            </p>
            <p>
              <MDBIcon color='secondary' icon='phone' className='' /> +81-80-9039-1994
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className='text-center p-3 text-pink' style={{ backgroundColor: '#0C0C0C' }}>
        &copy; {new Date().getFullYear()}{' '}
        <a className='text-light' href='#'>
          All Rights Reserved
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
