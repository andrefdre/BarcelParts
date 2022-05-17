const mongoose = require("mongoose");


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
{ collection : 'Products' });

module.exports = mongoose.model("Product", ProductSchema);
