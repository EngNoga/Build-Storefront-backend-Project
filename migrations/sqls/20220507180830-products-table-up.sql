-- create products table
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    price integer,
    category VARCHAR(100)
)