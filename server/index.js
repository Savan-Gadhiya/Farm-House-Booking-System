const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Connect to DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected!"))
  .catch((e) => console.log(e));

mongoose.connection.on("error", (err) => {
  console.log(`DB Connection Error: ${err.message}`);
});

// cors
if (process.env.NODE_ENV == "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Routes Middlewares
app.use("/api", authRoute);
app.use("/api", postRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));
