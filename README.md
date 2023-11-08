# About
This project was made to simulate on how vending machine works. The backend is the API for the vending machine[see endpoint docs here](https://github.com/Ndkkqueenie/vending_machine_api/tree/main/backend#readme), allowing users with a “seller” role to add, update or remove products, while users with a “buyer” role can deposit coins into the machine and make purchases.. Frontend is made with React (JavaScript) and backend is made using Nodejs, Express and MongoDB.
# See Live demo [here](https://autumn-tree-5881.fly.dev/). username: **TesterBuy** password: **TesterYou**
## Login data: username - TesterBuy, password - TesterYou
## Register? Not yet implemented on the frontend but you can do that at the backend via Postman 
    
### Run backend project
1. Change directory to backend and install required packages:
    ```bash
    cd backend
    npm install
    ```
3) There is config folder with configuration. Be sure to change them according to your running environment.

5) Now you can run you application. To run it in dev mode:
    ```bash
    npm run dev
    ```
6) To run the backend test:
    ```bash
    npm run test
    ```
7) If everything goes well the backend is running port at 3005, you can visit your application through [http://localhost:3005](http://localhost:3005)

   
### Run Frontend App
1) Change directory to frontend application:
    ```bash
    cd frontend
    ```
2. Install dependencies
    ```bash
    npm install
    ```
4) Run your application:
    ```bash
    npm start
    ``` 