import React, { useState } from 'react';

const Deposit = ({ user, onDeposit }) => {
  const [coin, setCoin] = useState(); // Changed state variable name to "coin" from "coins"
  const [error, setError] = useState('');

  const handleDeposit = () => {
    if (coin) {
      const coinValue = parseInt(coin, 10); // Parse the coin value to an integer
      if (!isNaN(coinValue)) {
        onDeposit(coinValue); // Pass the parsed integer coin value
        setCoin(''); // Clear the input field
        setError('');
      } else {
        setError('Please enter a valid number for the coin.');
      }
    } else {
      setError('Please enter a valid coin value.');
    }
  };  

  return (
    <div className="dashboard-column">
      <h2>Deposit Coins</h2>
      <div className="deposit-form">
        <input
          type="number"
          placeholder="Enter coin (5, 10, 20, 50, 100)"
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Deposit;
