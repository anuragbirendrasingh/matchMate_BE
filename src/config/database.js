const mongoose = require("mongoose");

const connectDb = async () =>{
   return  mongoose.connect("mongodb+srv://anurag_namsteNode:namsteNode%40123@cluster0.yfar9zk.mongodb.net/matchmate")};


module.exports = connectDb ;

// connectDb();
//mongoose.connect will return a promise so we handled it using the async function and .then .catch method