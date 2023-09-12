const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const errorHandler = require('./Utils/middleware/errorHandler');
const connectDB = require('./Config/db');

const productCategoryRoute = require('./Routes/productCategoryRoute');
const userRoute = require('./Routes/userRoute');

require('dotenv').config();
const app = express();

// connect mongodb
connectDB();

// middleware and cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// images path
app.use("/resources/images", express.static(path.join(__dirname, "resources/images")));

// routes
app.get("/", (_req, res) => {
    res.send("Hello, welcome from our site !");
})
app.use("/api/v1/product-categories", productCategoryRoute);
app.use("/api/v1/users", userRoute);

// error handler
app.use(errorHandler);

// server running
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port} !`);
});