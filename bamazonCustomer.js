var mysql = require("mysql");
var inquirer = require("inquirer");
//var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "READYtoLEARNSQL10",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    showItems();
});

function showItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " " + res[i].product_name + " " + res[i].department_name + " " + res[i].price + " " + res[i].stock_quantity);
        }
        console.log("----------------------------------------------------------------");
    });
};




