var mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({
    
    
    name: {
        type:String,
        required:true
    },
    
    price: Number,
    
    description:String,
    category:String
});

mongoose.model('Menu', menuSchema);