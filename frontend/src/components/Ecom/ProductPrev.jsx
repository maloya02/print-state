import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { PRODUCTS } from '../../product';
import { Container } from 'react-bootstrap';

const ProductPrev = () => {
  const [imageListWidth, setImageListWidth] = useState(0);

  useEffect(() => {
    const updateImageListWidth = () => {
      // Calculate the width of the ImageList based on the available space (e.g., container width)
      // Here, I'm setting it to 100% of the container width for demonstration purposes.
      const containerWidth = document.getElementById('product-prev-container').offsetWidth;
      setImageListWidth(containerWidth);
    };

    updateImageListWidth();
    window.addEventListener('resize', updateImageListWidth);
    return () => window.removeEventListener('resize', updateImageListWidth);
  }, []);

  return (
    <Container>
      <Box
        id="product-prev-container"
        >
        <ImageList variant="masonry" cols={getColumns(imageListWidth)} gap={8} sx={{ width: '100%' }}>
          {PRODUCTS.map((item) => (
            <ImageListItem key={item.id} sx={{ height: `${getImageItemHeight(imageListWidth, item)}px`, padding: '50px' }}>
              <img
                src={item.productImage}
                alt={item.productName}
                loading="lazy"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
              <ImageListItemBar position="below" title={item.productName} subtitle={item.productCategory} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
};

// Function to calculate the number of columns based on the available width
const getColumns = (width) => {
  if (width >= 1280) return 3; // For large screens, display 3 columns
  if (width >= 800) return 2; // For medium screens, display 2 columns
  return 1; // For small screens and below, display 1 column
};

// Function to calculate the height of each ImageListItem based on the aspect ratio
const getImageItemHeight = (width, item) => {
  return width * (item.height / item.width);
};

export default ProductPrev;
