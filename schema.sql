DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,4) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
)

SELECT * FROM products