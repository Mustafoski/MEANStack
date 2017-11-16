var express = require('express');
var router = express.Router();


var ctrlMenu = require('../controllers/menu.controller.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlOrders= require('../controllers/orders.controllers.js');
var ctrlAdmin = require('../controllers/admin.users.controller.js');

// Item Routes
router
    .route('/menu')
    .get(ctrlMenu.menuGetAll);




// Orders Routes

router
    .route('/orders')
    .post(ctrlOrders.order)
    .get(ctrlOrders.orderAdmin);

router
    .route('/orders/apriori')
    .get(ctrlOrders.orderStatistics);


// Authentication
router
  .route('/users/register')
  .post(ctrlUsers.register);


  router
    .route('/users/login')
    .post(ctrlUsers.login);


// Authenticantion Admin
router
  .route('/users/adminRegister')
  .post(ctrlAdmin.adminRegister);


  router
    .route('/users/adminLogin')
    .post(ctrlAdmin.adminLogin);



module.exports = router;
