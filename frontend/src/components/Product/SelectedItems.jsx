import React from 'react';

const SelectedItems = ({ selectedProducts, setSelectedProducts }) => {
  const handleClearSelection = () => {
    setSelectedProducts([]);
  };

  return (
    <div>
      <h2>Selected Items</h2>
      {selectedProducts.length > 0 ? (
        <ul>
          {selectedProducts.map((product) => (
            <li key={product.id}>{product.productName}</li>
          ))}
        </ul>
      ) : (
        <p>No items selected.</p>
      )}
      <button onClick={handleClearSelection}>Clear Selection</button>
    </div>
  );
};

export default SelectedItems;