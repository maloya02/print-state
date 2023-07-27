import React, { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MDBInput, MDBContainer } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';

export default function EditProductModal(prodId) {
  console.log(prodId.prodId);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: '',
    productImage: null,
    description: '',
    productCategory: '',
  });
  const fileInputRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (name === 'productImage') {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        productImage: e.target.files[0],
      }));
    } else if (type === 'text') {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleSaveProduct = async () => {
    const id = prodId.prodId
    const product = { ...newProduct };
    const formData = new FormData();
    formData.append('productName', product.productName);
    formData.append('price', product.price);
    formData.append('productImage', product.productImage);
    formData.append('productDescription', product.description);
    formData.append('productCategory', product.productCategory);
    console.log(product);


    try {
      const url = `http://localhost:8000/api/products/addProducts/${id}`;

      const method = 'PUT'; // Use PUT method for editing

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (response.ok) {
        console.log('Product updated successfully.');
        
        setNewProduct({
          productName: '',
          price: '',
          productImage: null,
          description: '',
          productCategory: '',
        },console.log(response.ok));

        // Reset the file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Close the dialog
        handleClose();

        // Refresh the page
        window.location.reload();
      } else {
        console.log('Failed to update product.');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen} className="custom-button">
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <h2>Edit Product</h2>
        </DialogTitle>
        <DialogContent>
          <MDBContainer fluid className="d-flex justify-content-center pt-2">
            <form>
              <MDBInput
                label='Product Name'
                id='productName'
                name='productName'
                type='text'
                value={newProduct.productName}
                onChange={handleInputChange}
                required
              />
              <br />
              <MDBInput
                label='Price'
                id='price'
                name='price'
                type='text'
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
              <br />
              <div className="mb-3">
                <label htmlFor="productImage" className="form-label">Product Image</label>
                <MDBInput
                  type="file"
                  className="form-control"
                  id="productImage"
                  name="productImage"
                  onChange={handleInputChange}
                  required
                  ref={fileInputRef}
                />
              </div>
              <br />
              <MDBInput
                label='Description'
                id='productDescription'
                name='description'
                type='textarea'
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
              <br />
              <MDBInput
                label='Product Category'
                id='productCategory'
                name='productCategory'
                type='text'
                value={newProduct.productCategory}
                onChange={handleInputChange}
                required
              />
              <br />
            </form>
          </MDBContainer>
        </DialogContent>
        <DialogActions className='pe-4'>
          <Button className="custom-button shadow-3" onClick={handleSaveProduct}>Save</Button>
          <Button className="custom-button2" onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
