const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const allRoute = require("./routes/index.routes.js");

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
const { sendResponse } = require("./utils/sendResponse");

// Routes Middlewares
app.use("/api", allRoute);
app.get("/testing", (req, res) => {
  sendResponse(res, 200, true, "working...", {name: "smitesh"});
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));
