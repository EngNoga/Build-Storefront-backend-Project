# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index  `[GET]  '/products/' `
- Show   `[GET]  '/products/:id' `
- Create [token required]  `[POST]  '/products/' `
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)
I added :
- Delete Products  `[delete]  '/products/:id' `

#### Users
- Index [token required] `[GET]  '/users/' `
- Show [token required]  `[GET]  '/users/:id' `
- Create N[token required] `[POST]  '/users/' `
I added :
- Delete users[token required] `[delete]  '/users/:id' `
- Authenticate User  `[POST]  '/users/authenticate' `

#### Orders
- Current Order by user (args: user id)[token required]   `[Get] '/orders/current/:user_id'`
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
I added :
- Index  `[GET]  '/orders/' `
- Show   `[GET]  '/orders/:id' `
- Create [token required]  `[POST]  '/orders/' `
- Delete orders[token required] `[delete]  '/orders/:id' `

I add:
### Products_Orders (for the many to many relation)
- Index  `[GET]  '/product_orders/' `
- Show   `[GET]  '/product_orders/:id' `
- add product with order id   `[POST]  '/product_orders/:id/products' `
- Delete orders `[delete]  '/product_orders/:id' `
- 
## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password
i add (as additional information and user the username in authentication)
- user_name
- email

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


### DataBase Schema
-- create products table
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    price integer,
    category VARCHAR(100)
)

-- create users table
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR(100),
    email VARCHAR(200)
)

-- create orders table
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    status VARCHAR(10)
)

-- create products_orders table
CREATE TABLE products_orders(
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    order_id BIGINT REFERENCES orders(id),
    quantity integer
)

