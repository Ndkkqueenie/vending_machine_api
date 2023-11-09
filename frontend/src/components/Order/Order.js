import React from 'react';

const Order = ({ purchasedProducts }) => {
  return (
    <div>
      <h2>Order Summary</h2>
      {purchasedProducts && purchasedProducts.length > 0 ? (
        <ul>
          {purchasedProducts.map((product, index) => (
            <li key={index}>
              {product.productName} - Cost: €{product.cost && product.cost.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products in the order.</p>
      )}
    </div>
  );
};

export default Order;
