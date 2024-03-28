const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
// const rateLimiter = require("express-rate-limit");

//swagger
// const swaggerUI = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./swagger.yaml"); 

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRoute = require("./routes/authRoutes");
const adminRoute = require("./routes/adminRoutes")
const searchRoute = require("./routes/searchRoutes")
const paymentRoute = require("./routes/paymentRoutes")
const dbConnect = require("./db/database");
const { sequelize, User, Airport } = require("./model/index");

app.get("/", (req, res) => {
  res.send(
    '<h1>Inentory Mangament System API</h1><a href="/api-docs">Documentation</a>'
  );
});
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api", authRoute);
app.use("/api/admin", adminRoute)
app.use("/api/search", searchRoute)
app.use("/api/pay/", paymentRoute)

sequelize
  .sync() // Use { force: true } for development, be cautious in production
  .then(() => {
    console.log("Database synchronized successfully!");
    // Start your express app here
  })
  .catch((error) => {
    console.error("Unable to synchronize database: ", error);
  });

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await dbConnect.authenticate();
    console.log("Connection has been established successfully.");
    //await dbConnect(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
