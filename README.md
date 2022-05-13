# Storefront Backend Project

## Getting Started

This is the Storefront backend API Project,by using the Node.js and TypeScript for coding and PostgresSql for DB and Jasmine for unit testing 

## Installation
- to install all dependencies packages  `npm install` 

## Packages 
dependencies and devdependencies and global packages
- express  `npm i express` `npm i @types/express`
- body-parser `npm i body-parser`
- typescript `npm i typescript`
- pg  `npm i pg`
- dotenv `npm i dotenv`
- migrations `npm i -g db-migrate` `yarn add db-migrate  db-migrate-pg`
- bcrypt `yarn add bcrypt`
- JWT `yarn add jsonwebtoken`
- jasmine `npm i --save-dev jasmine-ts` `npm i --save-dev jasmine-spec-reporter`
- tsnode `npm i --save-dev ts-node`
- watch `npm i --save-dev tsc-watch`

# Technologies

## PostgresSQL for DB

- connect to the default postgres database with postgres user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER storefront_user WITH PASSWORD 'udacity231290';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE storefront_dev;`
    - `CREATE DATABASE storefront_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c storefront_dev`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO storefront_user;`
    - Grant for test database
        - `\c storefront_test`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront_user;`

## SetUp Environment variables

- create the `.env` file to set the variables as 

POSTGRES_HOST= 127.0.0.1
POSTGRES_DB=storefront_dev
POSTGRES_USER= storefront_user
POSTGRES_PASSWORD=udacity231290
POSTGRES_TEST_DB=storefront_test
ENV=dev
BCRYPT_PASSWORD = Store
SALT_ROUNDS=10
TOKEN_SECRET = FullStack

- configure database with pool
- configure database.json for set the ENV 
  
## Database Migrations

- create the migrations table files
  `db-migrate create products-table --sql-file`
  `db-migrate create users-table --sql-file`
  `db-migrate create orders-table --sql-file`
  `db-migrate create products-orders-table --sql-file`
- write the database sql scripts for up and down tables
- to run the migrations
         `npm run up`
        
## Create Models
   Create the models for each database table.

 ### Products Model
   - Create method 
         to insert new products
   - Index method 
         to return all products 
   - Show method 
         to return one product by product_id 
   - delete method 
         to delete one product by product_id


 ### Users Model
  **Note** use `bcrypt` for password security
   - Create method 
         to insert new Users
   - Index method 
         to return all Users 
   - Show method 
         to return one Users by user_id 
   - delete method 
         to delete one Users by user_id
   - Authenticate method 
         to authenticate user with username and password

### Orders Model
 Note: contain user_id reference from users table
   - Create method 
         to insert new Orders
   - Index method 
         to return all Orders 
   - Show method 
         to return one Order by order_id 
   - showByOrderId method 
         to return  orders by user_id
   - delete method 
         to delete one order by order_id

### Products_orders Model
   - addProduct method 
         to insert new product with the order (relation many-to-many)


### Express Handlers
the endpoints lists in `REQUIREMENTS.md`

### JWTs
- create the jwtValidations utility for endpoint route security
  

### testing
  - to run test 
          `npm run test`

**Note**
  - Please read the comments in products Models
                   to explain the Models in products models (Likewise the rest of models)

**Note**
   I used
   `set ENV=test to convert the database into test database`


### Thank you, I hope I covered all that is wanted
### Good Luck.