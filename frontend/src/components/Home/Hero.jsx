import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Banner from '../../img/Banner/banner1.png';
import Tshirt from '../../img/Banner/Tshirt.png';


const Hero = () => {
  return (
    <MDBContainer fluid style={{ height: "100vh", backgroundImage: `url(${Banner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} >
      <MDBRow className='d-flex justify-content-center gap-3'>
        <MDBCol>
          <MDBContainer fluid className='d-flex align-items-center justify-content-center flex-column' style={{ height: '100vh' }}>
            <MDBTypography tag='div' className='pb-3 mb-3 text-light' >
              <h1 className='display-2 fw-bold'>Your Ideas, Our Prints:</h1>
              <h3 className='text-center'>PrintState, Made Just for You!</h3>
            </MDBTypography>
            <div class="d-grid gap-2 d-md-block">
              <Link to='/Ecom'>
                <MDBBtn className='custom-btn fw-bold'>Shop</MDBBtn>
              </Link>
              <Link to='/'>
                <MDBBtn className='custom-btn2 fw-bold'>Create</MDBBtn>
              </Link>
            </div>
          </MDBContainer>
        </MDBCol>
        <MDBCol lg='6' md='6' sm='12' xs='12' className='d-flex justify-content-center h-300'>
          <img src={Tshirt} alt="" style={{padding: '50px',  objectFit: 'contain', padding: '0px 80px 80px 80px' }}/>
        </MDBCol>
      </MDBRow>


    </MDBContainer>
  );
}

export default Hero;
