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


// READ ALL - GET /api/products
// Get all products with filtering, sorting, and pagination
// /api/products
// /api/products?category=Electronics
// /api/products?minPrice=100&maxPrice=500
// /api/products?category=Electronics&sortBy=price_asc
// /api/products?page=2&limit=5
// /api/products?category=Electronics&minPrice=100&maxPrice=500&sortBy=price_desc&page=1&limit=5

productRouter.get("/", async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sortBy } = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Build query dynamically
        const query = {};

        if (category) {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};

            if (minPrice) {
                query.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                query.price.$lte = Number(maxPrice);
            }
        }

        // Build sort dynamically
        let sortOption = {};

        if (sortBy === "price_asc") {
            sortOption.price = 1;
        } else if (sortBy === "price_desc") {
            sortOption.price = -1;
        }

        const products = await Product.find(query)
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
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

//delete - DELETE - /api/products/:id
productRouter.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = productRouter;