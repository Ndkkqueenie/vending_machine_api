import React, { useState } from 'react';
import './Dashboard.css'; // Import the CSS file for styling
import { Product, SelectedItems } from '../index';


const Dashboard = () => {
  const [selectedProducts, setSelectedProducts] = useState([]); // Maintain the selected products state

  return (
    <div className="dashboard-container">
      <div className="product-list">
        <Product addSelectedProduct={addSelectedProduct} />
      </div>
      <div className="selected-items">
        <SelectedItems selectedProducts={selectedProducts} />
      </div>
    </div>
  );

  function addSelectedProduct(product) {
    setSelectedProducts([...selectedProducts, product]);
  }
};

export default Dashboard;
