import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({
    path : './env'
});

connectDB();








// console.log(process.env.MONGODB_URI);
/*(async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("Connected Succesfully");
    app.on("error", (error) => {
      console.log("ERRR: ", error);
      throw error;
    });
  } catch (error) {
    console.error("Error : ", error);
    throw err;
  }
})();
*/
