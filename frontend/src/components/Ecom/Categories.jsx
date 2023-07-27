import React, { useState } from 'react';
import ProductList from './ProductList';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

const Category = () => {

  
  const [products, setProducts] = useState([]);
  const filterResult = (catItem) => {
    const result = products.filter((data) => {
      return data.products === catItem;
    });
    fetchProducts(result);


  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.log('An error occurred while fetching products:', error);
    }
  };

  return (
    <>

      <MDBContainer fluid className="mx-2">
        <MDBRow className="mt-5 mx-2">
          <MDBCol md={3} style={{padding:"0px 100px"}}>
            <MDBTypography tag="h4" className='text-center'>Categories</MDBTypography>
            <MDBBtn className="btn btn-light w-100" onClick={() => filterResult('Men')}>
              Men's Clothing
            </MDBBtn>
            <MDBBtn className="btn btn-light w-100">
              Women's Clothing
            </MDBBtn>
            <MDBBtn className="btn btn-light w-100">
              Kids Clothing
            </MDBBtn>
            <MDBBtn className="btn btn-light w-100">
              Babies Clothing
            </MDBBtn>

            <MDBTypography tag="h4" className='text-center mt-5'>Products</MDBTypography>
            <MDBBtn className="btn btn-light w-100" onClick={() => filterResult('Men')}>
              All
            </MDBBtn>
            <MDBBtn className="btn btn-light w-100">
              Tshirts
            </MDBBtn>
            <MDBBtn className="btn btn-light w-100">
              Hoodies & Jackets
            </MDBBtn>
            <MDBBtn className="btn btn-light w-100">
              Long-Sleeved Shirts
            </MDBBtn>
      
          </MDBCol>
          <MDBCol md={8}>
            <ProductList />
          </MDBCol>
        </MDBRow>
      </MDBContainer>


    </>
  )
}

export default Category