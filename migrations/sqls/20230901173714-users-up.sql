/* Replace with your SQL commands */
CREATE TABLE users  (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(16) NOT NULL,
    last_name VARCHAR(16) NOT NULL,
    password TEXT NOT NULL
)