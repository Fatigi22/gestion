const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router/router');
const app = express();
// Middleware
app.use(cors());
app.use(express.json()); // Should be before defining routes
app.use("/api", router);
// Connect to MongoDBtest

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection to the database established successfully.");
    })
    .catch((error) => {
        console.log("Database connection error:", error);
    });

// Start server
app.listen(3440, () => {
    console.log("Server is running on port 3440");
});