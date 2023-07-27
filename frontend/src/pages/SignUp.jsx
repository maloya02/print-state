import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import Bg from '../../src/img/bg/signup.png';
import Logo from '../../src/img/favicon.jpg';
import { Link } from 'react-router-dom';

const SignUp = () => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [emailTakenError, setEmailTakenError] = useState('');

  const sendUserToDatabase = async (e) => {
    e.preventDefault();

    const user = {
      userEmail: userEmail,
      userPassword: userPassword,
      userType: 'user',
    };

    try {
      const response = await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User sent to the database successfully.');
        // Handle the response data if needed
        console.log(data);
        setUserEmail('');
        setUserPassword('');
        setEmailTakenError(''); // Clear the error message if successful
      } else {
        const errorData = await response.json();
        console.log('Failed to send user to the database. Server returned:', errorData);
        if (errorData.error === 'User already exists') {
          setEmailTakenError('Email is already taken. Please use a different email.');
        } else {
          setEmailTakenError('An error occurred while processing your request.');
        }
      }
    } catch (error) {
      console.log('An error occurred while sending user to the database:', error);
      setEmailTakenError('An error occurred while processing your request.');
    }
  };

  return (
    <div className='d-flex align-items-center justify-content-center background-radial-gradient'
      style={{
        minHeight: '100vh',
        height: '100%',
        backgroundImage: `url(${Bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
        <MDBRow>
          <MDBCol md='6' className='position-relative'>
            <MDBCard className='my-5' style={{ margin: '150px' }}>
              <MDBCardBody className='p-5 '>
                <MDBRow className='d-flex justify-content-center'>
                  <img src={Logo} style={{ width: '120px' }} className='pb-5' alt='Logo' />
                  <h1 className="mb-5 fw-bold ls-tight px-3 text-dark text-center" >
                    SIGNUP
                  </h1>
                </MDBRow>
                {/* Display the error message above the form */}
                {emailTakenError && (
                  <div className="alert alert-danger">{emailTakenError}</div>
                )}
                <form onSubmit={sendUserToDatabase}>
                  <MDBInput
                    wrapperclassName='mb-4'
                    label='Email'
                    id='form3'
                    type='email'
                    className='py-2'
                    value={userEmail}
                    onChange={(e) => { setUserEmail(e.target.value) }}
                  />
                  <MDBInput
                    wrapperclassName='mb-4'
                    label='Password'
                    id='form4'
                    type='password'
                    className='py-2 my-4'
                    value={userPassword}
                    onChange={(e) => { setUserPassword(e.target.value) }}
                  />

                  <MDBBtn className='w-100 p-3 mb-4 custom-btn' size='md' type='submit'>
                    Sign UP
                  </MDBBtn>
                </form>
                <div className='d-flex justify-content-center mt-2'>
                  Already have an account? <Link to='/Login'> &nbsp; Login</Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-end text-light'>
            <h6 className="fw-bold ls-tight px-3" >
              REGISTER NOW!
            </h6>
            <p className='px-3' >
              Create your account by signing up your details  <br />to register and join us!
            </p>
            <h6 className=" fw-bold ls-tight px-3" >
              SHOP, DESIGN CUSTOMIZE AND EARN!
            </h6>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default SignUp;
