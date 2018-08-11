var mysql = require("mysql");
var inquirer = require("inquirer");
//var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    showItems();
});

function showItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log(
            "BAMAZON! Everything you need and nothing you don't."
        );
        console.log("_________________________________________________________________________________________________________________________ ");

        console.log("OUR PRODUCTS");

        console.log("_________________________________________________________________________________________________________________________ ");

        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("----------------------------------------------------------------------------------------------------------------------------------");
        askQuestions();

    });
};

function askQuestions() {

    let questions = [
        {
            message: "What is the item id of the product you would like to buy?",
            name: "item",
            type: "input",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            message: "How many units of the product would you like?",
            name: "quantity",
            type: "input",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]

    inquirer.prompt(questions).then(answer => {
        let query = "SELECT * FROM products WHERE item_id =" + answer.item;
        //console.log(answer);
        connection.query(query, function (err, res) {
            let newQuantity = res[0].stock_quantity - answer.quantity;
           
            if (answer.quantity <= res[0].stock_quantity) {
                for (let i = 0; i < res.length; i++) {
                    let totalPrice = res[i].price * answer.quantity;
                    console.log("Thank you for your order of " + res[i].product_name + ".");
                    console.log("Your total is $ " + totalPrice.toFixed(2) + ".");
                }
                connection.query("UPDATE products SET stock_quantity =? WHERE item_id =?", [newQuantity, answer.item], function (err, res) {
                    if (err) throw err;
                });
            } else {
                console.log("Insufficient quantity on hand.");
            };
            inquirer.prompt([{
                message: "Are you finished shopping?",
                name: "done",
                type: "confirm"
            }]).then(function(answer) {
                if (answer.done === true) {
                    console.log("Thank you for your business.")
                    connection.end();
                }else {
                    showItems();
                };
            });
        });
    });
};




