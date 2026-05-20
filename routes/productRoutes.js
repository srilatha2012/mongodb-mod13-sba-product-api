const express = require("express");

//create a new router object for product routes
const productRouter = express.Router();

const Product = require("../models/Product");

//CREATE POST - /api/product
productRouter.post("/", async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            })
        }
        res.status(500).json({ message: error.message });
    }
});

// READ ONE -GET - /api/product/:id
productRouter.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({
                message: "Product not found"
            })
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

//update -PUT -/api/product/:id
productRouter.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            //show updated data and check validation rules
            { new: true, runValidators: true }
        );
        res.send(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

});

//delete - DELETE
productRouter.delete("/:id", async (req, res)=>{
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
         res.json(deletedProduct);
    }catch(error){
       res.status(500).json({ message: error.message });
    }
})
module.exports = productRouter;