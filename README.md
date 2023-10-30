# KFC REST API

### Total hours spent:
- 1 hour for the initial setup, including setting up MongoDB Atlas and inserting the available items using json file template.
- 1 hour of studying fixer.io and how to properly manage the modules, the API calls and the models.
- 1 hour of implementing and testing the items endpoint with postman
- 30 minutes of implementing and testing the orders endpoints (without socket.io)
- 30 minutes of implementing and testing the real time part of the orders.

Total hours spent: 4

## Documentation
The purpose of this project is to implement the business logic on the
backend side for a fast food application named KFC, in the form of a REST API, 
in which anonymous users can place orders and merchants can monitor the relevant orders
that users have created. The project provide a REST representation for
the endpoints needed. The implementation is following an MVC pattern and
it is divided into the relevant modules including:

- **Model Module**: The Model Module is responsible for designing the data that
are going to be stored and fetched in our MongoDB database using an object oriented approach.
Our main entities are the Item, which describes the form of the items of the 3 categories that
users may choose to buy as described in the project requirements. The models are designed using Mongoose library.
The module is located in the **models** folder.

- **Service Module**: The Service Module is responsible for fetching and manipulating and storing the data that interact
between the server and the database. This module is essentially handling the CRUD operations needed in a database level.
Along with these actions the Service Module is also responsible in fetching any relevant information from external APIs
  (eg. fixer.io). For any external API call axios library is used.
The module is located in the **services** folder.

- **Controller Module**: The Controller Module is responsible for handling the business logic of the REST API application.
Each controller implements any operation needed for a given API endpoint by also interacting with the Service Module for
any essential information from database or external APIs needed.
The module is located in the **controllers** folder.

- **Routes Module**: The Routes Module is an essential module for hierarchically organizing and grouping the API endpoints
based on a business action or entity. Each route refers to a set of endpoints that are relevant to that entity or action defined
by a specific main path. For the simplicity of the project requirements the router for each route in the module contains only one
sub-path (which is the default `/`). The module is located in the **routes** folder.

- **Socket Events Module**: The Socket Events Module is essentially a simple module for handling the real time part of our backend
application. Using socket.io there are some events that server must handle and broadcast messages to the relevant clients for some events also.
This handling is performed in the Socket Events Module which is located in the **socketEvents** folder.

- **Utils**: Utils is a folder which contains any utility function needed for the project requirements.

- **app.js**: In this javascript file performs any relevant setup for the express server.

- **.env**: This file holds the important properties needed for the API. These properties must be configurable and are
essential for the server and database setup and any external API communication.

- **bin**: Inside the bin folder is the main server setup. In is the section where the node.js server is initialized using
express and also where socket.io is initialized.

## Common Conventions

When designing the implementation of the REST API some designing choices had to be taken, some of which are:

- **Database Architecture**: When designing the database some thoughts came across. Specifically there was the choice between
embedding the items in the order collection or using a reference. When embedding we can achieve better reading performance from the
database and when referencing we can achieve better writing to the database. If we consider a real application maybe it would be better
to provide embedding since the placing of the order happens in real time and also in the case when update in item prices could be supported
we would like to keep a snapshot of them in the order (since order has been placed before updating the items price). For the specific requirements
referencing is used.

- **Placing order in real time**: Placing order in real time is important since in a real scenario the merchant should immediately know about any new order
as time is crucial. Hence, socket.io is used for placing the order but the initial fetching of the recent orders is performed using REST call.

- **Fixer IO**: After reading the documentation the convert endpoint is not freely supported. In the freemium (which is used for the application)
the way the application provides the prices for the other currencies is through using the `http://data.fixer.io/api/latest` endpoint which returns the latest rates 
for the `EUR` as base and currencies: `USD,JPY,GBP,CNY,CHF,CAD`. After fetching them the price for each item retrieved is calculated in the currency service.

- **Pagination**: For the simplicity of the application requirements no pagination is performed for the items since they are limited.
For the orders, for performance reasons, pagination is supported since many orders can be placed by many anonymous users.

## Build instructions

For the initial time when opening the project it is essential to execute the ```npm install``` command.
Once the node modules are properly setup ```npm start``` has to be executed to launch the node server.