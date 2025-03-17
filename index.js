const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");




require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5001;



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));