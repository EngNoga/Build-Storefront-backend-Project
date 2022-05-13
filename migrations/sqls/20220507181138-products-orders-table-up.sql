-- create producrs_orders table
CREATE TABLE products_orders(
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    order_id BIGINT REFERENCES orders(id),
    quantity integer
)