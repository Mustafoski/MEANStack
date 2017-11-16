var mongoose = require('mongoose');
var Menu = mongoose.model('Menu');




module.exports.menuGetAll = function(req, res) {
  console.log('Requested by: ' + req.user);
  console.log('GET the menu');
  console.log(req.query);

 

  Menu
    .find()
    .exec(function(err, menu) {
      console.log(err);
      console.log(menu);
      if (err) {
        console.log("Error finding menu");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found menu", menu.length);
        res
          .json(menu);
      }
    });

};