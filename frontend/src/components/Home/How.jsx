import {
  MDBCol,
  MDBContainer,
  MDBTypography,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
} from 'mdb-react-ui-kit'
import React from 'react';
import ShapeBanner from '../../img/Banner/HowBanner.png';
import One from '../../img/Number/1.png';
import Two from '../../img/Number/2.png';
import Three from '../../img/Number/3.png';
import Four from '../../img/Number/4.png';
import Five from '../../img/Number/5.png';


const HeroHow = () => {
  return (
     <div style={{backgroundColor: '#000', color: '#fff'}}>
        <img src={ShapeBanner} alt='' className='w-100' style={{marginTop: '-2px'}}/>  
      <MDBTypography tag='h1' className='text-center text-light display-1 fw-bold pb-5'>
        How print<span className='text-pink'>State</span> works?
      </MDBTypography>

      <MDBRow className=' d-flex justify-content-center align-items-center '>
        {/* 1st row */}
        <MDBRow >
          <MDBCol md='5' className='mx-5 text-light'>
            <MDBRow>
            <MDBCol md='3'>
            <img src={One} alt=''/>
            </MDBCol>
            <MDBCol md='8'>
            <MDBTypography tag='h1'>
            Create Your Account:
             </MDBTypography>
            <MDBTypography tag='p'>
            In this step, users are prompted to create their accounts on the platform or website. They may need to provide their email address, username, and password to register. Creating an account allows users to access various features and functionalities specific to registered users.
             </MDBTypography>
            </MDBCol>
            </MDBRow>
           </MDBCol>
          {/* Right */}
          <MDBCol md='6'>
            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/182.webp' alt='...' position='top' className='w-75' />
          </MDBCol>
        </MDBRow>

        {/* 2nd row */}
        <MDBRow >
        <MDBCol md='6'>
            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/182.webp' alt='...' position='top' className='w-75' />
          </MDBCol>
          {/* Right */}
          <MDBCol md='5' className='mt-5 text-light'>
            <MDBRow>
            <MDBCol md='3'>
            <img src={Two} alt=''/>
            </MDBCol>
            <MDBCol md='8'>
            <MDBTypography tag='h1'>
            Choose from Our Products:
             </MDBTypography>
            <MDBTypography tag='p'>
            After creating an account or logging in, users can browse through the available products offered by the platform. This could include a variety of items such as clothing, electronics, accessories, or any other goods the platform deals with.
             </MDBTypography>
            </MDBCol>
            </MDBRow>
           </MDBCol>
        </MDBRow>

        {/* 3rd row */}
        <MDBRow >
          <MDBCol md='5' className='mx-5 text-light'>
            <MDBRow>
            <MDBCol md='3'>
            <img src={Three} alt=''/>
            </MDBCol>
            <MDBCol md='8'>
            <MDBTypography tag='h1'>
            Design & Customize:
             </MDBTypography>
            <MDBTypography tag='p'>
            This step suggests that users have the option to design and customize certain products according to their preferences. For example, they may be able to personalize clothing items with custom text, images, or color choices.
             </MDBTypography>
            </MDBCol>
            </MDBRow>
           </MDBCol>
          {/* Right */}
          <MDBCol md='6'>
            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/182.webp' alt='...' position='top' className='w-75' />
          </MDBCol>
        </MDBRow>

      {/* 4th row */}
      <MDBRow >
        <MDBCol md='6'>
            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/182.webp' alt='...' position='top' className='w-75' />
          </MDBCol>
          {/* Right */}
          <MDBCol md='5' className='mt-5 text-light'>
            <MDBRow>
            <MDBCol md='3'>
            <img src={Four} alt=''/>
            </MDBCol>
            <MDBCol md='8'>
            <MDBTypography tag='h1'>
            Publish & Sell:
             </MDBTypography>
            <MDBTypography tag='p'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi quibusdam incidunt, esse quasi atque odit quisquam magni ipsa fugiat nihil ab nesciunt, facilis ipsam eaque velit dignissimos saepe, consequatur adipisci.
             </MDBTypography>
            </MDBCol>
            </MDBRow>
           </MDBCol>
        </MDBRow>


       {/* 5th row */}
       <MDBRow >
          <MDBCol md='5' className='mx-5 text-light'>
            <MDBRow>
            <MDBCol md='3'>
            <img src={Five} alt=''/>
            </MDBCol>
            <MDBCol md='8'>
            <MDBTypography tag='h1'>
            Earn & Make a Profit:
             </MDBTypography>
            <MDBTypography tag='p'>
            After publishing their products, users have the opportunity to earn money by selling them to other users or customers on the platform. As their products are purchased, they can make a profit from the sales.
             </MDBTypography>
            </MDBCol>
            </MDBRow>
           </MDBCol>
          {/* Right */}
          <MDBCol md='6'>
            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/182.webp' alt='...' position='top' className='w-75' />
          </MDBCol>
        </MDBRow>

      </MDBRow>

    </div>
  )
}

export default HeroHow