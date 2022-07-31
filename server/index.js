const express = require("express");
const dotenv = require('dotenv').config();
const { errorHandler } = require("./index_middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 3001;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/coins", require("./index_routes/coinRoutes"));
app.use("/api/users", require("./index_routes/userRoutes"));
app.use(errorHandler);


app.listen(port,() => {console.log(`Server Up At Port: ${port}`)});