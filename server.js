const express = require("express");
const connectDb = require("./src/config/database");
const cookieParser = require("cookie-parser");


const app = express();

app.use(express.json());
app.use(cookieParser());

const routes = require("./src/routes/index");

app.use('/api',routes);

connectDb()
  .then(() => {
    console.log("database connection is established");
    app.listen(8888, () => {
      console.log("Server is running on port 8888");
    });
  })
  .catch(() => {
    console.log("Error");
    // throw new Error('data Base is not connected')
  });
