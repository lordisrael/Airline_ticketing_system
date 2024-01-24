const express = require("express");
require("dotenv").config();

const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRoute = require("./routes/authRoutes");
const dbConnect = require("./db/database");

app.get("/", (req, res) => {
  res.send(
    '<h1>Inentory Mangament System API</h1><a href="/api-docs">Documentation</a>'
  );
});

app.use(express.json());
app.use("/api", authRoute);

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
