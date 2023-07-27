import React from 'react';
import { Link } from 'react-router-dom';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBContainer,
    MDBTypography
} from 'mdb-react-ui-kit';

const CategoryEcom = () => {
    return (
        <MDBContainer>
            <MDBTypography tag='h1' className='text-center mt-5' style={{ color: '#000000' }}>
                CATEGORY
            </MDBTypography>
            <MDBRow className='g-4'>
                <MDBCol md='3'>
                    <Link to="/EcomDisplay">
                        <MDBCard>
                            <MDBCardImage
                                src='https://mdbootstrap.com/img/new/standard/city/041.webp'
                                alt='...'
                                position='top'
                            />
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                    This content is a little bit longer.
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </Link>
                </MDBCol>
                <MDBCol md='3'>
                    <Link to="/EcomDisplay">
                        <MDBCard>
                            <MDBCardImage
                                src='https://mdbootstrap.com/img/new/standard/city/042.webp'
                                alt='...'
                                position='top'
                            />
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                    This content is a little bit longer.
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </Link>
                </MDBCol>
                <MDBCol md='3'>
                    <Link to="/EcomDisplay">
                        <MDBCard>
                            <MDBCardImage
                                src='https://mdbootstrap.com/img/new/standard/city/043.webp'
                                alt='...'
                                position='top'
                            />
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                    This content is a little bit longer.
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </Link>
                </MDBCol>
                <MDBCol md='3'>
                    <Link to="/EcomDisplay">
                        <MDBCard>
                            <MDBCardImage
                                src='https://mdbootstrap.com/img/new/standard/city/044.webp'
                                alt='...'
                                position='top'
                            />
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    This is a longer card with supporting text below as a natural lead-in to additional content.
                                    This content is a little bit longer.
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </Link>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default CategoryEcom