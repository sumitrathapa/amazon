import mongoose from "mongoose";

//set rule
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

// create table
const Product = mongoose.model("Product", productSchema);
export default Product;
