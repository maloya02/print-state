import { useContext, useState } from 'react';
import { ShopContext } from "./EcomContext";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

export const EcomProduct = (props) => {
  const { id, productName, price, productImage, productDescription, productCategory } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[id];
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className='products'>
      <Card
        sx={{ width: 380, maxWidth: '100%', boxShadow: 'lg' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardOverflow>
          <AspectRatio sx={{ minWidth: 300 }}>
            <img
              src={`http://localhost:8000/images/${productImage}`}
              loading="lazy"
              alt=""
              style={{ objectFit: 'contain' }}cd
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
                {productDescription}
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
                {productCategory}
              </Chip>
              <Link
                href="#product"
                fontWeight="xl"
                color="neutral"
                textColor="text.primary"
                level='h5'
                className='card-text' 
              >
                {productName}
              </Link>
            </MDBCol>
            <MDBCol md='6' className='mb-2'>
              <Typography level="h3" className="text-end mb-3">
                &#8369;{price}
              </Typography>
              <Button className='cart-btn' size="lg" onClick={() => addToCart(id)}>
                Add to Cart {cartItemAmount > 0 && <> ({cartItemAmount}) </>}
              </Button>
            </MDBCol>
          </MDBRow>
        </CardContent>
        <CardOverflow></CardOverflow>
      </Card>
    </div>
  );
};
