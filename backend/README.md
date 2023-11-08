# vending_machine_api
An API for a vending machine, allowing users with a “seller” role to add, update or remove products, while users with a “buyer” role can deposit coins into the machine and make purchases.
# Vending Machine API Documentation

This documentation provides details on the endpoints and functionality of the Vending Machine API.

## Base URL

All endpoints in this API are relative to the base URL: https://wild-frost-1903.fly.dev/


## Authentication

This API requires authentication to access certain endpoints. The authentication mechanism uses JSON Web Tokens (JWT). To get an authentication token, you need to register and log in as a user. Once logged in, you will receive a token that you should include in the `Authorization` header as follows:

Authorization: Bearer <your_token>


## `/api/deposit` Endpoint

### POST `/api/deposit`

- Description: Deposit coins into your account.
- Authentication: Required (Only authenticated users are allowed to deposit).
- Request Body:
  - `username` (string): Your username.
  - `coin` (integer): The coin value (e.g., 5, 10, 20, 50, 100 cent coins).
- Response (200 OK):
  - `message` (string): Confirmation message.
  - `newDeposit` (integer): Updated deposit balance.

- Response (400 Bad Request):
  - `error` (string): Invalid coin value.

- Response (401 Unauthorized):
  - `error` (string): Authentication required.

- Response (403 Forbidden):
  - `error` (string): Only buyers are allowed to deposit coins.

- Response (404 Not Found):
  - `error` (string): User not found.

## `/api/buy` Endpoint

### POST `/api/buy`

- Description: Buy a product from the vending machine.
- Authentication: Required (Only authenticated buyers are allowed to make purchases).
- Request Body:
  - `username` (string): Your username.
  - `productId` (string): The ID of the product you want to buy.
  - `quantity` (integer): The quantity of the product you want to buy.
- Response (200 OK):
  - `totalAmountSpent` (integer): Total amount spent.
  - `productsPurchased` (object):
    - `id` (string): ID of the purchased product.
    - `productName` (string): Name of the purchased product.
    - `cost` (integer): Cost of the product.
    - `quantity` (integer): Quantity purchased.
  - `change` (integer): Updated deposit balance.

- Response (400 Bad Request):
  - `error` (string): Insufficient balance to make the purchase.

- Response (401 Unauthorized):
  - `error` (string): Authentication required.

- Response (403 Forbidden):
  - `error` (string): Only buyers are allowed to make purchases.

- Response (404 Not Found):
  - `error` (string): User not found.

- Response (404 Not Found):
  - `error` (string): Product not found.

### User management CRUD:

POST /user - User registration (no authentication required).
GET /users - List all users.
GET /user/{userId} - Retrieve user details.
PUT /user/{userId} - Update user information.
DELETE /user/{userId} - Delete a user.

### Product management:

GET /products - List all products (accessible to loggedin users).
POST /products - Create a new product (seller role required).
GET /product/{productId} - Retrieve product details.
PUT /product/{productId} - Update product information (seller role required).
DELETE /product/{productId} - Delete a product (seller role required).
