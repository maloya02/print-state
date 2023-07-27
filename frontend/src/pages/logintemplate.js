import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import Bg from '../../src/img/bg/login.png';
import Logo from '../../src/img/favicon.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      userEmail: userEmail,
      userPassword: userPassword,
      userType: 'user',
    };

    fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        // Assuming the server returns a token upon successful login
        const token = result.token;

        // Save the token in local storage for future authentication
        localStorage.setItem('token', token);

        // Redirect to the appropriate page based on user type
        console.log(result);
        console.log(token);
        if(result.data.userType === "admin"){
          navigate('/Dashboard');
        }
        else{
          navigate('/')
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      const accessToken = JSON.parse(atob(token.split('.')[1]))
      console.log( atob(token.split('.')[1]));
      if(accessToken.iat * 1000 <  Date.now()) {
        localStorage.removeItem('token');
        navigate('/Login');
      } else {
        // let them stay
      }
    } else {
      localStorage.removeItem('token');
      navigate('/Login');
    }
    
  }, []);

  return (
    <div className='d-flex align-items-center justify-content-center background-radial-gradient'
      style={{
        minHeight: '100vh',
        height: '100%',
        backgroundImage: `url(${Bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }} >
      <MDBContainer fluid className='p-4  overflow-hidden' >
        <MDBRow >
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-end text-light'>
            <h6 className="fw-bold ls-tight px-3" >
              LOGIN NOW!
            </h6>
            <p className='px-3' >
              To keep connected with us please login with your  <br />personal information by email addressand password
            </p>
            <h6 className=" fw-bold ls-tight px-3" >
              SHOP, DESIGN CUSTOMIZE AND EARN!
            </h6>
          </MDBCol>
          <MDBCol md='6' className='position-relative'>
            <MDBCard className='my-5' style={{ margin: '150px' }}>
              <MDBCardBody className='p-5 '>
                <MDBRow className='d-flex justify-content-center'>
                  <img src={Logo} style={{ width: '120px' }} className='pb-5' />
                  <h1 className="mb-5 fw-bold ls-tight px-3 text-dark text-center" >
                    LOGIN
                  </h1>
                </MDBRow>
                <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' className='py-2'
                  onChange={(e) => { setUserEmail(e.target.value) }}
                />
                <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' className='py-2'
                  onChange={(e) => { setUserPassword(e.target.value) }}
                />

                <MDBBtn className='w-100 p-3 mb-4 custom-btn' size='md' onClick={handleLogin}>
                  Sign in
                </MDBBtn>

                {/* <a href='#' className='d-flex justify-content-end mb-3'> Forgot Password?</a> */}
                <div className='d-flex justify-content-center mt-2'>
                  Don't have an account? <Link to='/SignUp'> &nbsp; Register here</Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;
