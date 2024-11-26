import mongoose from "mongoose";

export const connectToDb = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/hypnotism")
    .then(()=>console.log("Connected to DB"));
};
