import React, { useState, useRef } from 'react';
import { MDBInput, MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'react-bootstrap';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';

const AdminDashboard = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [newProduct, setNewProduct] = useState({
    id: '',
    productName: '',
    price: '',
    productImage: null,
    description: '',
    productCategory: '',
  });
  const [isEditMode, setIsEditMode] = useState(false); // State to indicate if the form is in "Edit" mode
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');

  // Function to set the form values when clicking the "Edit" button
  const handleEditProduct = (product) => {
    setNewProduct(product);
    setIsEditMode(true);
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
    console.log(newProduct);
  };

  const handleAddProduct = async () => {
    const product = { ...newProduct, id: uuidv4() };

    if (!product.productName || !product.price || !product.productImage || !product.description || !product.productCategory) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isNaN(parseFloat(product.price))) {
      setError('Please enter a valid price.');
      return;
    }

    setError('');

    try {
      const formData = new FormData();
      formData.append('productName', product.productName);
      formData.append('price', product.price);
      formData.append('productImage', product.productImage);
      formData.append('productDescription', product.description);
      formData.append('productCategory', product.productCategory);

      const url = isEditMode
        ? `http://localhost:8000/api/products/${product.id}` // Use PUT endpoint for editing
        : 'http://localhost:8000/api/products/addProducts'; // Use POST endpoint for adding new product

      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (response.ok) {
        console.log(isEditMode ? 'Product updated successfully.' : 'Product added to the database successfully.');
        // Optionally, you can fetch the updated list of products from the database here.
        // fetchProducts(); // Uncomment this line if you have a fetchProducts function to update the product list from the database.

        // Reset the image input by setting productImage to null
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          productImage: null,
        }));

        // Reset the file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Refresh the page
        window.location.reload();
      } else {
        console.log(isEditMode ? 'Failed to update product.' : 'Failed to add product to the database.');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }

    setNewProduct({
      id: '',
      productName: '',
      price: '',
      productImage: null,
      description: '',
      productCategory: '',
    });
    
  };

  return (
    <>
    
      <Button onClick={handleClickOpen} className="custom-button float-end">
        Add Product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
        <MDBContainer className="d-flex justify-content-center">
      <div>
        <h2>{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
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
          <input
            type="file"
            className="form-control"
            id="productImage"
            name="productImage"
            ref={fileInputRef} // Assign the ref to the input element
            onChange={handleInputChange}
            required={!isEditMode} // Make the field required only in "Add" mode
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
       
      </div>
    </MDBContainer>
    </DialogContent>
        <DialogActions className='me-2'>
          <Button className="custom-button" onClick={handleAddProduct}>Add Product</Button>
          <Button  className="custom-button2" onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
    
  );
};

export default AdminDashboard;