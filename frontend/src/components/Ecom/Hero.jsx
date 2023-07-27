import { MDBContainer } from 'mdb-react-ui-kit';
import React from 'react';
import img1 from '../../img//Banner/carousel1.png'

const EcomHero = () => {
  return (
    <MDBContainer fluid className='p-0'>
      <img
        src={img1}
        className='img-fluid shadow-4 w-100 h-100'
        alt='...'
        style={{ objectFit: 'cover', maxHeight: '100vh' }}
      />
    </MDBContainer>
  );
}

export default EcomHero;
