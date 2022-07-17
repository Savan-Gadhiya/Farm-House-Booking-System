const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Middlewares
app.use(express.json());

// Connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected!"))
  .catch((e) => console.log(e));

mongoose.connection.on("error", (err) => {
  console.log(`DB Connection error: ${err.message}`);
});

// Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Route Middlewares
app.use("/api", authRoute);
app.use("/api", postRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));
