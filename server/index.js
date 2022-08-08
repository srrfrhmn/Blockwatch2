const express = require("express");
const dotenv = require('dotenv').config();
const { errorHandler } = require("./index_middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 3001;
const cors = require("cors");

connectDB();

const app = express();

// set up cors to allow cross origin resource sharing
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/coins", require("./index_routes/coinRoutes"));
app.use("/api/users", require("./index_routes/userRoutes"));
app.use(errorHandler);


app.listen(port,() => {console.log(`Server Up At Port: ${port}`)});