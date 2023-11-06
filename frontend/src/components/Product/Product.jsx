import React, { useState, useEffect } from 'react';
import productApi from '../../services/products';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';

const Product = ({ addSelectedProduct }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    productApi.getAll().then((data) => {
      setProducts(data);
    });
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    addSelectedProduct(product); // Add selected product to the Dashboard
  };

  return (
    <div className="product-container">
      <div className="products">
        <h2>Product List</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card ${selectedProduct === product ? 'selected' : ''}`}
              onClick={() => handleProductSelect(product)}
            >
              <h3>{product.productName}</h3>
              <p>Amount Available: {product.amountAvailable}</p>
              <p>Price: ${product.cost}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
