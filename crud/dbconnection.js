const dbConfig=require("./dbconfig.js");
const mongoose=require("mongoose");
mongoose.connect(dbConfig.dbURL);
console.log("database conntection created");
module.exports=mongoose;