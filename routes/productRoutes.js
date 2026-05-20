const express = require("express");

//create a new router object for product routes
const productRouter = express.Router();

const Product = require("../models/Product");

//CREATE POST - 
productRouter.post("/", async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
         res.status(201).json(newProduct);
    } catch (error) {
        if(error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            })
        }
        res.status(500).json({ message: error.message });
    }
});

module.exports = productRouter;