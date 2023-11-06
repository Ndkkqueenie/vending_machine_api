import React, { useState } from 'react';
import productApi from '../../services/products';

const CreateProduct = ({ onProductCreated }) => {
  const [newProduct, setNewProduct] = useState({ productName: '', amountAvailable: 0, cost: 0 });

  const handleCreateProduct = () => {
    productApi.create(newProduct).then((data) => {
      setNewProduct({ productName: '', amountAvailable: 0, cost: 0 });
      onProductCreated(data); // Notify the parent component that a new product was created
    });
  };

  return (
    <div>
      <h2>Create Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.productName}
        onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
      />
      <input
        type="number"
        placeholder="Amount Available"
        value={newProduct.amountAvailable}
        onChange={(e) => setNewProduct({ ...newProduct, amountAvailable: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.cost}
        onChange={(e) => setNewProduct({ ...newProduct, cost: e.target.value })}
      />
      <button onClick={handleCreateProduct}>Create</button>
    </div>
  );
};

export default CreateProduct;
