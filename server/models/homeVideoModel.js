// models/homeVideoModel.js
import mongoose from "mongoose";

const homeVideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoId: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
  price: { type: Number, default: 0 }
});

const HomeVideo = mongoose.model('HomeVideo', homeVideoSchema);
export default HomeVideo;

