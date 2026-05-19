const mongoose = require("mongoose");

//define Product Schema
const productSchema = new mongoose.Schema( {
  name: { type: String, required: true},
  description: {type : String, required: true},
  price:{ type: Number, required:true, min : 1},
  category: { type: String, required: true},
  inStock :{type: Boolean, default: true},
  tags: { type: [String]},
  createdAt: {type: Date, default: Date.now}
});

//Create Product model from productSchema
const Product = mongoose.model("Product",productSchema);

module.exports = Product;
