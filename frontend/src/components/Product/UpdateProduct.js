import React, { useState } from 'react';
import productApi from '../../services/products';

const UpdateProduct = ({ selectedProduct, onUpdateProduct }) => {
  const [updateProduct, setUpdateProduct] = useState({
    productName: selectedProduct.productName,
    amountAvailable: selectedProduct.amountAvailable,
    cost: selectedProduct.cost,
  });

  const handleUpdateProduct = () => {
    productApi.update(selectedProduct.id, updateProduct).then((data) => {
      onUpdateProduct(data); // Notify the parent component that the product was updated
    });
  };

  return (
    <div>
      <h2>Update Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={updateProduct.productName}
        onChange={(e) => setUpdateProduct({ ...updateProduct, productName: e.target.value })}
      />
      <input
        type="number"
        placeholder="Amount Available"
        value={updateProduct.amountAvailable}
        onChange={(e) => setUpdateProduct({ ...updateProduct, amountAvailable: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={updateProduct.cost}
        onChange={(e) => setUpdateProduct({ ...updateProduct, cost: e.target.value })}
      />
      <button onClick={handleUpdateProduct}>Update</button>
    </div>
  );
};

export default UpdateProduct;
