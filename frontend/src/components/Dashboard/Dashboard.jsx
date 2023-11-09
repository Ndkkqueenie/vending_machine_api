import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './Dashboard.css';
import { Product, SelectedItems, Deposit, Balance, Order, Notification } from '../index';
import createAmount from '../../services/deposit';
import createPurchase from '../../services/purchase';
import getUser from '../../services/user';

const Dashboard = () => {
  const { username } = useParams(); // Get the username from route parameters
  const history = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({}); // State to store selected product quantities
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState({
    username: username, // Use the username from route parameters
    deposit: 0,
    products: [], // Store the purchased products in the user state
  });

  useEffect(() => {
    getUser(username)
      .then((userData) => {
        setUser({ ...user, deposit: userData.deposit, products: userData.products });
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

    selectedProducts.forEach((product) => {
      const productQuantity = selectedQuantities[product.id] || 1;

      const newPurchase = {
        username: user.username,
        productId: product.id,
        quantity: productQuantity,
      };

      const purchasePromise = createPurchase(newPurchase);
      purchasePromises.push(purchasePromise);
    });

    Promise.all(purchasePromises)
      .then(() => {
        // Create an array of purchased products
        const updatedPurchasedProducts = selectedProducts.map((product) => ({
          productName: product.productName,
          cost: product.cost,
          quantity: selectedQuantities[product.id] || 1,
        }));

        alert("Order Successful: See your orders down below");

        // Calculate the total cost of purchased products
        const totalCost = updatedPurchasedProducts.reduce(
          (total, product) => total + product.cost * product.quantity,
          0
        );
  
        // Update the user's balance based on the total cost
        const newBalance = user.deposit - totalCost;
        alert("Your change is: " + newBalance);

        // Merge the new purchased products with the existing ones in the user state
        const newPurchasedProducts = [...user.products, ...updatedPurchasedProducts];
        setUser({ ...user, deposit: newBalance, products: newPurchasedProducts });

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
        setErrorMessage('You cannot deposit as a Seller, only Buyers');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    history('/');
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'green' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Vending Machine
            </Typography>
            <Button color="inherit" component={Link} to="">
              Seller's Board
            </Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
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
          <div className='deposit-space'>
            <Notification message={errorMessage} />
            <Deposit user={user} onDeposit={handleDeposit} />
          </div>
          <div className='balance-space'>
            <Balance user={user} />
          </div>    
        </div>
        <Order purchasedProducts={user.products} />
      </div>
    </div>
  );
};

export default Dashboard;
