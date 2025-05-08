import Razorpay from 'razorpay';
import crypto from 'crypto';
import Course from '../models/courseSchema.js';
import HomeVideo from '../models/homeVideoModel.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  const { courseId, videoId } = req.body;

  try {
    let item;
    let receiptPrefix;

    if (courseId) {
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: 'Invalid Course ID' });
      }
      item = await Course.findById(courseId);
      receiptPrefix = `course_${courseId}`;
    } else if (videoId) {
      if (!mongoose.Types.ObjectId.isValid(videoId)) {
        return res.status(400).json({ message: 'Invalid Video ID' });
      }
      item = await HomeVideo.findById(videoId);
      receiptPrefix = `video_${videoId}`;
    } else {
      return res.status(400).json({ message: 'Course ID or Video ID is required' });
    }

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const amount = item.price * 100;

    const options = {
      amount,
      currency: 'INR',
      receipt: receiptPrefix,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({
      razorpayKey: process.env.RAZORPAY_KEY_ID,
      amount,
      currency: 'INR',
      orderId: order.id,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const verifyPayment = async (req, res) => {
  const { paymentId, orderId, signature, courseId, videoId } = req.body;

  try {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + '|' + paymentId)
      .digest('hex');

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    const user = req.user;

    if (courseId) {
      user.boughtCourses.push({ course: courseId });
    } else if (videoId) {
      user.boughtVideos.push({ video: videoId });
    } else {
      return res.status(400).json({ message: 'No item specified for purchase' });
    }

    await user.save();

    res.status(200).json({ message: 'Payment verified and item purchased successfully' });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

