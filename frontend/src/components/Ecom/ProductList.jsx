import React, { useEffect, useState } from 'react';
import ProductListItem from './ProductListItem';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [])

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
    <MDBRow>
      {
        products.map(product => {
          return (
       
             <MDBCol key={"product-item-" + product.id} sm={6} md={6} lg={4} xl={3} className='mb-4'>
              <ProductListItem
                product={product}
              />
            </MDBCol>

           
          )
        })
      }


    </MDBRow>
  )
}

export default ProductList