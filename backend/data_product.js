// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
    {
        id: Number,
        Cod_Fornecedor: String,
        Fornecedor: String,
        Marca: String,
        Ref: String,
        Design: String,
        Cod_Familia: String,
        Familia: String,
        Cod_SubFamilia: String,
        SubFamilia: String,
        Preço: String,
        Stock: String
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data_Product", DataSchema);