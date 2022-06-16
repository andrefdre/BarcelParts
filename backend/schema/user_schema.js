const mongoose = require("mongoose");

//Creates the schema structure for products
const UserSchema = new mongoose.Schema({
    UserName: {type:String,required:true},
    Password: {type:String,required:true},
    User_FirstName: {type:String,required:true},
    User_LastName: {type:String,required:true},
    Email: {type:String, required:true},
    Address: {type:String, default:""},
    Carrinho: [{
       Product_id: {type:String},
       Product_amount: {type:String}
    }],
    Owner: {type:Boolean, default:false}
},
{ collection : 'Accounts'}); //Tells from what collection of mongodb to get the information

module.exports = mongoose.model("User", UserSchema);
