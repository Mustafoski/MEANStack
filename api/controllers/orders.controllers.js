var mongoose = require('mongoose');
var Order = mongoose.model('Order');

var unique_values = require("../../apriori/find_unique.js").unique_values;
var unique_values2 = require("../../apriori/find_unique.js").unique_values2;
var create_ci = require("../../apriori/create_ci.js").create_ci;
var create_fi = require("../../apriori/create_fi.js").create_fi;
var print_items = require("../../apriori/print_items.js").print_items;


module.exports.order = function(req,res){

    console.log('Requested by: ' + req.user);
    console.log('Post the menu');
    console.log(req.query);
    //console.log(req.body.products);

    Order
    .create({
      name : req.body.name,
      street : req.body.street,
      city : req.body.city,
      state : req.body.state,
      zip : req.body.zip,
      country : req.body.country,
      giftwrap : req.body.giftwrap || null,
      products : req.body.products

    }, function(err, order) {
      if (err) {
        console.log("Error creating order: "+err);
        res
          .status(400)
          .json(err);
      } else {
        console.log("order created!", order);
        res
          .status(201)
          .json(order);
      }
    });

};


module.exports.orderAdmin = function (req ,res) {

    console.log("Requested get orders" + req.user);
    console.log("Get the orders");
    //console.log(req.query);

    Order
    .find()
    .exec(function(err, orders) {
      console.log(err);
      console.log(orders);
      if (err) {
        console.log("Error finding orders");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found orders", orders.length);
        res
          .json(orders);
      }
    });
};

module.exports.orderStatistics = function (req, res) {
    var results = {};
    results.item_frequency = [];

    Order
    .find()
    .exec(function(err, orders) {
        //console.log(err);
        //console.log(orders);
        if (err) {
            console.log("Error finding orders");
            res
              .status(500)
              .json(err);
        }
        else {
            var transactions = [];
            results.total_profit = 0;
            for (var i = 0; i < orders.length; i ++) {
                var currentOrder = [];
                orders[i].products.forEach(function(product) {
                    results.total_profit += product.price * product.count;
                    if (itemExists(results.item_frequency, product.name) === false) {
                        var elementAndFrequency = {};
                        elementAndFrequency[product.name] = product.count;
                        results.item_frequency.push(elementAndFrequency);
                    }
                    else {
                        //we have to find the product and update its count
                        results.item_frequency = updateCount(results.item_frequency, product.name, product.count);
                        //results.item_frequency
                    }

                    //console.log(results);
                    currentOrder.push(product.name);
                });
                transactions.push(currentOrder);
            }

            //do the apriori thing
            results.apriori = calculateApriori(transactions);
            results.orders_count = orders.length;
            //console.log(results);
            res.json(results);
        }
    });
};

function itemExists(itemsArray, itemName) {
    var bool = false;
    itemsArray.forEach(function(item) {
        if (item[itemName] != undefined) {
            //console.log('true');
            bool = true;
        }
    });

    return bool;
}

function updateCount(itemsArray, itemName, itemFrequency) {
    //var allItems = itemsArray;
    for (var i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i][itemName] != undefined) {
            itemsArray[i][itemName] = itemsArray[i][itemName] + itemFrequency;
        }
    }

    return itemsArray;
}

function calculateApriori(transactions) {
    var support_count = 2;
    var ci, fi, backup;
    var subset_size = 1;
    var unique = unique_values(transactions);
    do{
        ci = create_ci(subset_size,unique, transactions);
        fi = create_fi(ci, support_count);
        if(fi.length>0){
            unique = unique_values2(fi);
            backup = fi;
        }
        print_items(ci,fi,subset_size);
        subset_size++;
    }while((ci.length>1) && (fi.length>1));

    //console.log("THE FREQUENT ITEMS:");
    //console.log(backup);

    return backup;
}
