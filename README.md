# Product API

## A simple REST API - Product API for managing products using Express, MongoDB, and Mongoose.

## Features
- Create a product
- Get all products
- Get one product by ID
- Update a product
- Delete a product
- Filter products by category
- Filter products by min and max price
- Sort products by price
- Pagination

## Product Fields
{
  name: String,
  description: String,
  price: Number,
  category: String,
  inStock: Boolean,
  tags: [String],
  createdAt : Date
}

## API Routes
Create Product: POST /api/products
Get all products: GET /api/products
Get One Product: GET /api/products/:id
Update Product: PUT /api/products/:id
Delete Product: DELETE /api/products/:id

## Install
npm install

## Reflection
The most challenging part was building the query dynamically based on the query parameters.

I used Mongoose methods like find, sort, skip, and limit to filter, sort, and paginate products.