import mongoose from "mongoose";
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Conneceted to MongoDb");
  } catch {
    console.log("Error occured in connection to MongoDb ");
  }
};

export default connectToMongoDB;
