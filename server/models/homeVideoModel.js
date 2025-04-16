// models/homeVideoModel.js
import mongoose from "mongoose";

const homeVideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
});

const HomeVideo = mongoose.model('HomeVideo', homeVideoSchema);
export default HomeVideo;

