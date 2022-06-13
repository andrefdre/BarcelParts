const mongoose = require("mongoose");

//Creates the schema structure for products
const OrderSchema = new mongoose.Schema({
    User_FirstName: {type:String,required:true},
    User_LastName: {type:String,required:true},
    User_Id: {type:String,required:true},
    Email: {type:String, required:true},
    Carrinho: [{
        Product_id: {type:String , required:true},
        Product_reference: {type:String,required:true},
        Product_amount: {type:String , required:true}
     }],
     TotalPrice: {type:String , required:true},
     Status: {type:String, default:""},
     Payment_Method: {type:String, required:true}
},
{ collection : 'Orders' }); //Tells from what collection of mongodb to get the information

module.exports = mongoose.model("Order", OrderSchema);
