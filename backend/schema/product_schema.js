const mongoose = require("mongoose");

//Creates the schema structure for products
const ProductSchema = new mongoose.Schema({
    Cod_Fornecedor: String,
    Fornecedor: String,
    Marca:String,
    Ref: String,
    Design: String, 
    Ref_Tecdoc: String,
    CodFamilia: String,
    NomeFamilia: String,
    CodSubFamilia: String,
    SubFamilia: String,
    PFU: String,
    CASCO: String,
    PrecoCusto: String,
    NumArmazem: String
},
{ collection : 'Products' }); //Tells from what collection of mongodb to get the information

module.exports = mongoose.model("Product", ProductSchema);
