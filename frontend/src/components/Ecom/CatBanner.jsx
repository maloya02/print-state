import React from 'react';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import './CatBanner.module.scss';
import Men from '../../img/Banner/CatMen.png';
import Women from '../../img/Banner/CatWomen.png';
import Kids from '../../img/Banner/CatKids.png';
import Baby from '../../img/Banner/CatBaby.png';

const CatBanner = () => {
  return (
    <MDBContainer fluid className="categories mt-4">
      <MDBRow>
        <MDBCol md={3}>
        
            <img src={Men} alt="" />
      
        </MDBCol>
        <MDBCol md={6}>
          <MDBRow className='pb-2'>
           
              <img src={Kids} alt="" />
           
          </MDBRow>
          <MDBRow className='pt-2'>
          
              <img src={Baby} alt="" />
            
          </MDBRow>
        </MDBCol>
        <MDBCol md={3}>
         
            <img src={Women} alt="" />
         
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default CatBanner;
