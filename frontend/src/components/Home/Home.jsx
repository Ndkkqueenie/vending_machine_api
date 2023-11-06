import React from 'react';
import './Home.css'; // You will need to create a CSS file for styling.
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Home = () => {
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'green' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vending Machine
          </Typography>
          <Button color="inherit" component={Link} to="/dashboard">
            Shop
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <div className="home-container">
        <div className="home-content">
          <h1>Welcome to Our Vending Machine</h1>
          <p>Explore our products and make a purchase.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
