// routes/homeVideoRoutes.js
import express from 'express';
import HomeVideo from '../models/homeVideoModel.js'; // also .js required
import User from "../models/userSchema.js"; 
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

// GET all home videos
router.get('/', async (req, res) => {
  try {
    const videos = await HomeVideo.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new video
router.post('/add', async (req, res) => {
  try {
    const { title, videoId, isPaid, price } = req.body;

    const newVideo = new HomeVideo({
      title,
      videoId,
      isPaid: isPaid || false,
      price: isPaid ? price : 0,
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(400).json({ message: 'Error saving video' });
  }
});


// DELETE a video
router.delete('/:id', async (req, res) => {
  try {
    await HomeVideo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting video' });
  }
});

// GET single home video by YouTube videoId
router.get('/:videoId', async (req, res) => {
  try {
    const video = await HomeVideo.findOne({ videoId: req.params.videoId });
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:videoId/isPurchased', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const { videoId } = req.params;

    const video = await HomeVideo.findOne({ videoId }); // videoId = YouTube ID
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const user = await User.findById(userId);

    const hasPurchased = user.boughtVideos.some(
      (v) => v.video.toString() === video._id.toString()
    );

    res.json({ hasPurchased });
  } catch (err) {
    console.error('Error in isPurchased route:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});



export default router;

