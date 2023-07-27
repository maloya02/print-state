import React, { useContext, useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { ShopContext } from "../Ecom/EcomContext";

const DashboardContent = () => {
  const { products } = useContext(ShopContext);
  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      setApiProducts(data.data);
    } catch (error) {
      console.log('An error occurred while fetching products:', error);
    }
  };

  const defaultProducts = products.map((product) => ({
    productName: product.productName,
    price: `$${product.price}`,
    productImage: <img src={product.productImage} alt={product.productName} style={{ width: '50px' }} />,
    productDescription: product.productDescription
  }));

  const data = {
    columns: [
      {
        label: 'Product Name',
        field: 'productName',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Product Image',
        field: 'productImage',
        sort: 'disabled',
        width: 100
      },
      {
        label: 'Product Description',
        field: 'productDescription',
        sort: 'disabled',
        width: 200
      }
    ],
    rows: [...defaultProducts, ...apiProducts]
  };

  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
  );
};

export default DashboardContent;
