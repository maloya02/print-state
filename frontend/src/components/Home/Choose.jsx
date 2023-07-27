import React from 'react';
import {
  MDBContainer,
  MDBTypography,
  MDBRow,
  MDBCol,
  MDBListGroup,
} from 'mdb-react-ui-kit';
import ChooseImg from '../../img/Banner/herochoose.png';
import Shop from '../../img/icons/bag.png';
import Earn from '../../img/icons/earn.png';
import Support from '../../img/icons/support.png';
import Delivery from '../../img/icons/delivery.png';

const HeroChoose = () => {
  return (
    <MDBContainer fluid className='services' style={{marginTop: '300px'}}>
      <MDBRow className='bg2'>

        <MDBCol lg='6' md='6' sm='12' xs='12' className='d-flex justify-content-center'>
          <img src={ChooseImg} position='top' alt='...' className='h-100' style={{ objectFit: "contain", width: '80%'}} />
        </MDBCol>

        <MDBCol lg='6' md='8' sm='10' xs='12' className=''>
          <MDBContainer  >

            <MDBRow className='flex-wrap justify-content-center px-5'>
              <MDBCol md='8' lg='10' className='mt-5'>
                <MDBListGroup>
                  <MDBTypography tag='h1' className='text-center text-md-start  display-3 pb-2'>
                    <span style={{ color: '#000000' }}>Why</span> <span style={{ color: '#F8567B' }}> Choose us?</span> 
                  </MDBTypography>
                  <p className='text-justify fs-20'>
                    At printState, we go beyond just being an e-commerce shop. We also provide a range of additional services like print on demand to support sellers in their journey of selling.
                  </p>
                <MDBRow className='py-4 text-center'>
                  <MDBCol md='6' lg='6'className="d-flex flex-wrap align-items-center flex-column flex-md-row gap-3 pt-2 pb-3">
                    <img src={Shop} alt='...'  />
                  </MDBCol>
                  <MDBCol  md='6' lg='6' className="d-flex flex-wrap align-items-center flex-column flex-md-row gap-3 pt-2 pb-3">
                    <img src={Earn} alt='...'  />
                    </MDBCol>
                  <MDBCol md='6' lg='6'>
                   <p className="text-md-start"><strong>SHOP</strong> <br/>We offer quality products that you can choose from and where you can sell too</p>
                  </MDBCol>
                  <MDBCol md='6' lg='6'>  
                    <p className="text-md-start"><strong>SELL AND EARN</strong> <br/> sell your items online without buying upront inventory without printing t-shirts</p>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md='6' lg='6' className="d-flex flex-wrap align-items-center flex-column flex-md-row gap-3 pt-2 pb-3">
                    <img src={Support} alt='...' />
                  </MDBCol>
                  <MDBCol md='6' lg='6' className="d-flex flex-wrap align-items-center flex-column flex-md-row gap-3 pt-2 pb-3">
                    <img src={Delivery} alt='...'  />
                  </MDBCol>
                  <MDBCol md='6' lg='6'>
                   <p className="text-md-start"><strong>CUSTOMER SUPPORT</strong><br/>We provide exceptional service with 24/7 support to our customers</p>
                  </MDBCol>
                  <MDBCol md='6' lg='6'>  
                    <p className="text-md-start"><strong>DELIVERY </strong><br/> No need to worry because we’ll print package and ship the orders for you</p>
                  </MDBCol>
                </MDBRow>

                </MDBListGroup>
              </MDBCol>
            </MDBRow>

          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default HeroChoose