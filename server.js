// const express = require("express");
// const app = express();
// const authRoutes = require("./routes/auth");

// app.use(express.json()); // Middleware for JSON parsing
// app.use("/auth", authRoutes); // Mount the auth routes

// app.listen(3000, () => {
//     console.log("Server running on http://localhost:3000");
// });




const express = require("express");
const cors = require("cors"); // Import CORS
const app = express();
const authRoutes = require("./routes/auth");

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware for JSON parsing

app.options('*', cors()); // Enable preflight for all routes
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

app.use("/auth", authRoutes); // Mount the auth routes

app.listen(5001, () => {
    console.log("Server running on http://localhost:5001");
});