import React, { useContext, useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { ShopContext } from '../Ecom/EcomContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Modal, Button } from 'react-bootstrap';
import EditProductModal from './EditProductModal';
import { MDBIcon } from 'mdbreact';
import AdminDashboard from './AdminDashboard';


const DashboardContent = () => {
  const { products, setProducts } = useContext(ShopContext);
  const [apiProducts, setApiProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [editModalData, setEditModalData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      console.log(data);
      setApiProducts(data.data);
    } catch (error) {
      console.log('An error occurred while fetching products:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const confirmDeleteProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${selectedProductId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Product deleted successfully.');
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== selectedProductId));
      } else {
        console.log('Failed to delete product.');
      }
    } catch (error) {
      console.log('An error occurred while deleting product:', error);
    }

    setShowModal(false);
    fetchProducts();
  };

  const handleEditProduct = async (productId, updatedData) => {
    try {
      const { productName, price, productImage, productDescription, productCategory } = updatedData;
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('productImage', productImage); // Check if this field is required in the backend
      formData.append('productDescription', productDescription);
      formData.append('productCategory', productCategory);
  
      const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
        method: 'PUT',
        body: formData,
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log('Product updated successfully.');
        fetchProducts(); // Fetch the updated list of products after successful update
      } else {
        console.log('Failed to update product.');
        // You can display an error message to the user if needed
      }
    } catch (error) {
      console.log('An error occurred while updating product:', error);
    }
  };
  
  

  const handleEditIconClick = (productId) => {
    const editProductData = apiProducts.find((product) => product.id === productId);
    setEditModalData(editProductData);
    setShowEditModal(true);
  };
  

  const handleSaveProduct = (updatedData) => {
    handleEditProduct(editModalData.id, updatedData);
    setShowEditModal(false);
    setEditModalData(null);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditModalData(null);
  };

  const data = {
    columns: [
      {
        label: 'Product Name',
        field: 'productName',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Product Image',
        field: 'productImage',
        sort: 'disabled',
        width: 100,
      },
      {
        label: 'Product Description',
        field: 'productDescription',
        sort: 'disabled',
        width: 200,
      },
      {
        label: 'Product Category',
        field: 'productCategory',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Edit',
        field: 'edit',
        sort: 'disabled',
        width: 50,
        content: (row) => (
          <MDBIcon
            far
            icon="edit"
            onClick={() => handleEditIconClick(row.id)}
            style={{ cursor: 'pointer' }}
          />
        ),
      },
      {
        label: 'Delete',
        field: 'delete',
        sort: 'disabled',
        width: 50,
        content: (row) => (
          <DeleteOutlineIcon far icon="trash-alt" onClick={() => handleDeleteProduct(row.id)} style={{ cursor: 'pointer' }} />
        ),
      },
    ],
    rows: apiProducts.map((product) => ({
      id: product.id,
      productName: product.productName,
      price: `$${product.price}`,
      productImage: <img src={`http://localhost:8000/images/${product.productImage}`} alt={product.productName} style={{ width: '50px' }} />,
      productDescription: product.productDescription,
      productCategory: product.productCategory,
      edit: <EditProductModal prodId = {product.id}/>,
      delete: <Button  onClick={() => handleDeleteProduct(product.id)}  className="custom-button2"> Delete </Button>,
    })),

  content: (row) => (
      <MDBIcon
        far
        icon="edit"
        onClick={() => handleEditIconClick(row.id)}
        style={{ cursor: 'pointer' }}
      />
    ),
  };

  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
      <AdminDashboard/>
        <MDBDataTable
          responsive
          striped
          bordered
          small
          data={data}
          style={{
            width: '100%',
            overflowX: 'hidden',
          }}
        />
      </div>

      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button className='custom-button' onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button className='custom-button2' onClick={confirmDeleteProduct}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {editModalData && (
        <EditProductModal
          showModal={showEditModal}
          handleSaveProduct={handleSaveProduct}
          handleCancelEdit={handleCancelEdit}
          productToEdit={editModalData}
        />
      )}
    </div>
  );
};

export default DashboardContent;