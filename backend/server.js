const { mongoose } = require('mongoose');
const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Databse connected."))
    .catch((err) => console.log("Database not connected.", err ));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

 app.use("/", require("./routes/routes"));

const port = 8000;
app.listen(port, () => console.log(`Server running on port: ${port}`));