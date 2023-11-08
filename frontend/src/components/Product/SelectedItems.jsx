import React, { useState } from 'react';

const SelectedItems = ({ selectedProducts, setSelectedProducts }) => {
  const [productQuantities, setProductQuantities] = useState({});

  const handleClearSelection = () => {
    setSelectedProducts([]);
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((product) => product.id !== productId)
    );

    // Remove the product quantity from the state
    setProductQuantities((prevProductQuantities) => {
      const updatedQuantities = { ...prevProductQuantities };
      delete updatedQuantities[productId];
      return updatedQuantities;
    });
  };

  const totalCost = selectedProducts.reduce(
    (total, product) =>
      total + product.cost * (productQuantities[product.id] || 1),
    0
  );

  return (
    <div>
      <h2>Selected Items</h2>
      {selectedProducts.length > 0 ? (
        <div>
          <ul>
            {selectedProducts.map((product) => (
              <li key={product.id}>
                {product.productName} - Cost: €{product.cost.toFixed(2)}
                <input
                  type="number"
                  min="1"
                  value={productQuantities[product.id] || 1}
                  onChange={(e) => {
                    const quantity = parseInt(e.target.value, 10);
                    if (!isNaN(quantity)) {
                      setProductQuantities({ ...productQuantities, [product.id]: quantity });
                    }
                  }}
                />
                <button onClick={() => handleRemoveProduct(product.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <p>Total Cost: €{totalCost.toFixed(2)}</p>
        </div>
      ) : (
        <p>No items selected.</p>
      )}
      <button onClick={handleClearSelection}>Clear Selection</button>
    </div>
  );
};

export default SelectedItems;
