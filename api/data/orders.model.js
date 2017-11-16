var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    
  name: {
        type:String,
        required:true
    },

 street: {
     type:String,
    required:true
 },
  
    city: {
     type:String,
    required:true
 },
  
     state: {
     type:String,
    required:true
 },
  
     zip: {
     type:String,
    required:true
 },
  
     country: {
     type:String,
    required:true
 },
  
     giftwrap: {
     type:Boolean,
    required:false
 },
  
     products: {
     type:[],
    required:true
 },

  
});

mongoose.model('Order', orderSchema);