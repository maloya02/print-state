import React, { useContext } from 'react';
import { EcomProduct } from '../../components/Ecom/Products';
import { ShopContext } from "../../components/Ecom/EcomContext";
import { MDBCol,MDBContainer,MDBRow } from 'mdb-react-ui-kit';

const EcomDisplay = () => {
  const { products } = useContext(ShopContext); // Use 'products' from context
  return (
    <div>
      <MDBContainer fluid>
       <MDBRow>
        {
          products.map((product) => {
            return (
              <MDBCol key={"product-item-" + product.id} sm={12} md={6} lg={4} xl={3} className='mb-4'>
                <EcomProduct data={product} key={product.id}/> 
              </MDBCol>
            )
          })
        }
        </MDBRow>
      </MDBContainer>
               
          
     
   
       
    </div>
  )
}

export default EcomDisplay;
