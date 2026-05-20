//Import dependencies
const express = require("express");
require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

//Import the database connection function
const connectDB = require("./db/connection");
const productRouter = require("./routes/productRoutes")

//create express application
const app = express();

//Load port number from .env file
const PORT = process.env.PORT || 3000;

//Connect to MongoDB
connectDB();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use("/api/product", productRouter);

//PORT
app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT ${PORT}`);
});