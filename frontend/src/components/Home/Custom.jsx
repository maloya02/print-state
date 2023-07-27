import React from 'react';
import {
  MDBTypography,
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import CustomPink from '../../img/Banner/CustomPink.png';
import Custom from '../../img/Banner/Custom.png'


const HeroCustom = () => {
  return (
    <div style={{ position:'relative'}}>  
     <div style={{backgroundColor: '#F8567B', marginTop: '-180px',}}>
      <MDBTypography tag='h1' className='text-center mt-5  fw-bold' style={{color: ' rgba(255, 255, 255, 0.25)', fontSize: '180px' }}>
        DESIGN
        <MDBTypography tag='h1' className='text-center mt-5  fw-bold' style={{color: '#000', fontSize: '80px', position: 'absolute', top: '10px', padding: '0 42%'}}>
        CUSTOM
      </MDBTypography>
      </MDBTypography>
     

      <MDBRow>
        {/* LEFT */}
        <MDBCol>
          <img src={Custom} alt="" />
        </MDBCol>



        {/* RIGHT */}
        <MDBCol style={{marginTop: '120px', padding: '0 200px'}} className='text-justify'>
          <MDBRow>
            <MDBTypography tag='h4' className='mt-5' style={{ color: '#000000' }}>
              Personalized Items
            </MDBTypography>
            <MDBTypography tag='p' className='mt-2 mb-5 text-light'>
            Design unique products that reflect your style and personality. Create custom pieces that are one-of-a-kind and truly special. Make a statement with personalized items that showcase your individuality.
            </MDBTypography>
          </MDBRow>

          <MDBRow>
            <MDBTypography tag='h4' className='my-2' style={{ color: '#000000' }}>
              Create your design
            </MDBTypography>
            <MDBTypography tag='p' className=' mb-5 text-light'>
            Let your imagination run wild as you bring your ideas to life. Customize every detail, from colors to patterns, and make something truly original. Your creativity knows no bounds, and your design will be a true reflection of who you are.
            </MDBTypography>
          </MDBRow>

          <MDBRow>
            <MDBTypography tag='h4' className='mt-2' style={{ color: '#000000' }}>
              Make it your Statement
            </MDBTypography>
            <MDBTypography tag='p' className='mt-2 text-light'>
            Stand out from the crowd with personalized items that speak volumes about you. Embrace your uniqueness and show the world what sets you apart. Your personalized statement pieces will leave a lasting impression and make a mark wherever you go.
            </MDBTypography>
         
          </MDBRow>

        </MDBCol>
      </MDBRow>


    </div>

    </div>


            

    
  )
}

export default HeroCustom