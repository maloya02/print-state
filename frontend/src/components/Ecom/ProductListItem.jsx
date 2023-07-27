import React from 'react';

import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useContext, useState } from 'react';
import { ShopContext } from "./EcomContext";



const ProductListItem = ({ product }) => {

  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[product.id];
  const [isHovered, setIsHovered] = useState(false);
  if (!product) return null;
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>

      <Card sx={{ width: '100%', boxShadow: 'lg' }} key={product.id}
       onMouseEnter={handleMouseEnter}
       onMouseLeave={handleMouseLeave}>
        <CardOverflow >
          <AspectRatio sx={{ minWidth: 200 }}>
            <img
              src={`http://localhost:8000/images/${product.productImage}`}
              alt={product.productName}
              loading="lazy"

              style={{ objectFit: 'contain' }}
            />
              {isHovered && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                    height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  fontSize: '16px',
                  padding: '10px', 
                }}
              >   
                {product.productDescription}
              </div>
            )}
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <MDBRow>
            <MDBCol md='6'>
              <Chip
                color="neutral"
                onClick={function () { }}
                size="sm"
                variant="solid"
                className="mb-3"
              > 
              {product.productDescription}
              </Chip>
              <Link
                to={`/Ecom/ProductDetails/${product.id}`}
                fontWeight="xl"
                color="neutral"
                textColor="text.primary"
                level='h5'
                className='card-text'
              >
                {product.productName}
              </Link>
            </MDBCol>
            <MDBCol md='6' className='mb-2'>
              <Typography level="h3" className="text-end mb-3">   &#8369;{product.price}</Typography>
              <Button className='cart-btn' size="lg" onClick={() => addToCart(product.id)}>
                Add to Cart {cartItemAmount > 0 && <> ({cartItemAmount}) </>}
              </Button>
            </MDBCol>
          </MDBRow>
        </CardContent>
        <CardOverflow>

        </CardOverflow>
      </Card>

    </>
  )
}

export default ProductListItem