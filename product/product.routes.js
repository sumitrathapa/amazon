import express from "express";
import Product from "./product.model.js";
import mongoose from "mongoose";

const router = express.Router();

//? add course
router.post("/product/add", async (req, res) => {
  // extract new product from req.body
  const newProduct = req.body;

  //add new product to db
  await Product.create(newProduct);

  // send response
  return res.status(200).send({ message: "Product is added successfully" });
});

//? get course list
router.get("/product/list", async (req, res) => {
  const productList = await Product.find();

  //send response
  return res.status(200).send({ message: "success", products: productList });
});

//? get course details by id
router.get("/product/details/:id", async (req, res) => {
  //extract product id from req.params
  const productId = req.params.id;

  // check for mongo id validity
  const isValidMongoId = mongoose.isValidObjectId(productId);

  //if not valid mongo id , throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }

  // find product by id
  const requiredProduct = await Product.findOne({ _id: productId });

  //if not product,throw error
  if (!requiredProduct) {
    return res.status(400).send({ message: "Product does not exist." });
  }
  //send response
  return res
    .status(200)
    .send({ message: "success", productDetails: requiredProduct });
});

//? delete a product by id
router.delete("/product/delete/:id", async (req, res) => {
  // extract product id from req.params
  const productId = req.params.id;

  //check for mongo id validity
  const isValidMongoId = mongoose.isValidObjectId(productId);

  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find product by id
  const requiredProduct = await Product.findOne({ _id: productId });

  // if not product,throw error
  if (!requiredProduct) {
    return res.status(400).send({ message: "Product doenot exist" });
  }

  // delete course
  await Product.deleteOne({ _id: productId });
  //send response
  return res.status(200).send({ message: "Product is deletes succesfully." });
});

//? edit product
router.put("/product/edit/:id", async (req, res) => {
  //extract product id from req.params
  const productId = req.params.id;

  // check for mongo id validity
  const isValidMongoId = mongoose.isValidObjectId(productId);
  //if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }

  //find product by id
  const requiredProduct = await Product.findOne({ _id: productId });

  // if not product ,throw error
  if (!requiredProduct) {
    return res.status(400).send({ message: "Course does not exist." });
  }

  // get new values from req.body
  const newValues = req.body;

  // edit product
  await Product.updateOne(
    { _id: productId },
    {
      $set: {
        name: newValues.name,
        price: newValues.price,
      },
    }
  );

  // send response
  return res.status(200).send({ message: "Product is updated successfully" });
});

export default router;
