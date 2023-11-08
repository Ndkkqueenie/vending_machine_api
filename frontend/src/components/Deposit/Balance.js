import React from 'react';
import Notification from '../Notification/Notification';

const Balance = ({ user }) => {
  // Extract the message and newDeposit values from the user object
  const { message, newDeposit } = user || {};
  const balance = user ? user.deposit + (newDeposit ? newDeposit.newDeposit : 0) : 'N/A';

  return (
    <div className="dashboard-column">
      <Notification message={message} />
      <h2>Your Balance</h2>
      <p>
        <strong>Username:</strong> {user ? user.username : 'N/A'}
      </p>
      <p>
        <strong>Balance:</strong> €{balance}
      </p>
    </div>
  );
};

export default Balance;
