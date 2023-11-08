import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Dashboard.css';
import { Product, SelectedItems, Deposit, Balance } from '../index';
import createAmount from '../../services/deposit';
import createPurchase from '../../services/purchase';
import getUser from '../../services/user';

const Dashboard = () => {
  const { username } = useParams(); // Get the username from route parameters

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({}); // State to store selected product quantities
  const [user, setUser] = useState({
    username: username, // Use the username from route parameters
    deposit: 0,
  });

  useEffect(() => {
    getUser(username)
      .then((userData) => {
        setUser({ ...user, deposit: userData.deposit });
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle "User Not Found" error
          console.error('User Not Found:', error);
        } else {
          // Handle other errors
          console.error('Error fetching user data:', error);
        }
      });
  }, [username]);

  function addSelectedProduct(product) {
    setSelectedProducts([...selectedProducts, product]);
  }

  const handleBuyAll = () => {
    const purchasePromises = [];

    // Iterate through selectedProducts and create purchase requests
    selectedProducts.forEach((product) => {
      const productQuantity = selectedQuantities[product.id] || 1; // Use the selected quantity or default to 1

      const newPurchase = {
        username: user.username,
        productId: product.id,
        quantity: productQuantity,
      };

      const purchasePromise = createPurchase(newPurchase);
      purchasePromises.push(purchasePromise);
    });

    // Wait for all purchase promises to resolve
    Promise.all(purchasePromises)
      .then((purchaseDataArray) => {
        // Handle successful purchases and update the user's balance
        purchaseDataArray.forEach((purchaseData, index) => {
          console.log('Purchase successful:', purchaseData);

          // Update the user's balance based on the change returned from the purchase
          const change = purchaseData.change;
          setUser({ ...user, deposit: change });
        });

        // Clear the selectedProducts array and quantities to remove all purchased items
        setSelectedProducts([]);
        setSelectedQuantities({});
      })
      .catch((error) => {
        console.error('Error making purchases:', error);
      });
  };

  const handleDeposit = (coins) => {
    const data = {
      username: user.username,
      coin: coins,
    };
  
    createAmount(data)
      .then((newDepositData) => {
        const newDeposit = newDepositData.newDeposit;
        
        setUser({ ...user, deposit: newDeposit });
      })
      .catch((error) => {
        console.error('Error depositing coins:', error);
      });
  };

  return (
    <div className="dashboard-container">
      <div className="product-section">
        <div className="product-list">
          <Product addSelectedProduct={addSelectedProduct} />
        </div>
        <div className="selected-items">
          <SelectedItems
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            setSelectedQuantities={setSelectedQuantities} // Pass the state setter for quantities
          />
          <button onClick={handleBuyAll}>Buy All</button>
        </div>
      </div>
      <div className="balance-section">
        <Deposit user={user} onDeposit={handleDeposit} />
        <Balance user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
