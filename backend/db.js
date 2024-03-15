import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config({path: 'backend/.env'});
export const connectMongo = async () => {

let DB_URI = "";

if (process.env.NODE_ENV === "DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI;
if (process.env.NODE_ENV === "PRODUCTION") DB_URI = process.env.DB_ONLINE_URI;


mongoose.connect(DB_URI).then((con) => {
    console.log(
      `MongoDB Database connected with HOST: ${con?.connection?.host}`
    );
  });

}