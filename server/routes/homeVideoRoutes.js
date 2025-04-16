// routes/homeVideoRoutes.js
import express from 'express';
import HomeVideo from '../models/homeVideoModel.js'; // also .js required
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
    const { title, videoId } = req.body;
    const newVideo = new HomeVideo({ title, videoId });
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

export default router;

