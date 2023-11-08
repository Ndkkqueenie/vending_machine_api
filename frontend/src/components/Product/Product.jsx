import React, { useState, useEffect } from 'react';
import productApi from '../../services/products';

const Product = ({ addSelectedProduct }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productApi.getAll().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="product-container">
      <div className="products">
        <h2>Product List</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.productName}</h3>
              <p>Amount Available: {product.amountAvailable}</p>
              <p>Price: ${product.cost}</p>
              <button onClick={() => addSelectedProduct(product)}>Select</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
