const express = require("express");
const connectDb = require("./src/config/database");

const app = express();

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
