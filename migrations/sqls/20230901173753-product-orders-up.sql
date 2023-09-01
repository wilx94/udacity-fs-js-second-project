/* Replace with your SQL commands */
CREATE TABLE product_orders (
    product_id INTEGER NOT NULL REFERENCES products(id),
    order_id INTEGER NOT NULL REFERENCES orders(id),
    qty INTEGER NOT NULL
)