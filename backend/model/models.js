const mongoose = require("mongoose");

const data = new mongoose.Schema({
    ima: { type: String},
    titre: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    Quantity: { type: Number, required: true } // Corrected from Qantety to Quantity
});

const Db = mongoose.model("fatihi", data);
module.exports = Db;