Project Description
This project was made to simulate on how vending machine works. We have two application frontend and backend. Frontend is made with React & Redux saga. Meanwhile backend is made using Nodejs typescript framework Nestjs. See Live demo here.

Run application with docker
To run application with docker we have docker-compose.yml file in root of this project. This configuration is only for development purpose. Before running application be sure to checkout docker-compose.yml and review volumes attached in services.

In Mongodb service named db_mongo_service we have attached /data/db of host machine make sure its is accessible to docker otherwise feel free to attach your own custom directory.

In backend config I've added default configuration from docker-compose.yml for development so you don't need to change anything but if you made any changes on docker-compose.yml be sure to update backend configuration too.

Make sure docker and docker-compose is configured in your machine.
Run following command
docker-compose build
docker-compose up -d
Prerequisite without docker
To run it without using docker you need to have following installed:

Backend
You need to install npx command globally for seeders.
npm install -g npx
You have to have mongodb up and running for database follow this link if you haven't.
Run backend project
Change directory to backend and install required packages:
cd backend
yarn i
Install dependencies
yarn i
In backend there is config folder there are configuration related to application database and others. Be sure to change them according to your running environment.

Seed data for vending machine and its product:

npx nestjs-command seed:vend
npx nestjs-command seed:product
Now you can run you application. To run it in dev mode:

yarn start:dev
To run your backend test in development mode:

yarn test:watch
If everything goes well and you have set your backend default running port as 7777, you can visit your application through http://localhost:7777

To view swagger documentation visit http://localhost:7777/api

Run Frontend App
Change directory to frontend application:
cd frontend
Install dependencies
yarn i
Set up environment. Copy .env.example to create new .env file and add backend base url to env key. For Example:
cp .env.example .env
In .env file add:
    REACT_APP_API_BASE_URI=http://localhost:7777
Run your application:
yarn start
If everything goes well, you can visit your application through http://localhost:3000