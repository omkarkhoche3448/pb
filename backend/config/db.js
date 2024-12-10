const mongoose=require ("mongoose")
const dotenv =require("dotenv")

dotenv.config();

const dbConnection = async () => {
  const url = process.env.DATABASE_URL;

  try {
    await mongoose.connect(url);
    console.log("DB Connected successfully");
  } catch (e) {
    console.error("Error connecting to the database:", e);
  }
};

module.exports = dbConnection;