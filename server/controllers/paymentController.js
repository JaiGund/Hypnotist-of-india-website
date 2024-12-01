import Razorpay from 'razorpay';
import crypto from 'crypto';
import Course from '../models/courseSchema.js';
import dotenv from 'dotenv'

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Step 1: Create Razorpay Order
export const createOrder = async (req, res) => {
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({ message: 'Course ID is required' });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const amount = course.price * 100; // Convert price to paisa
    const options = {
      amount,
      currency: 'INR',
      receipt: `receipt_${courseId}`,
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

// Step 2: Verify Razorpay Payment
export const verifyPayment = async (req, res) => {
  const { paymentId, orderId, signature, courseId } = req.body;

  try {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + '|' + paymentId)
      .digest('hex');

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    const user = req.user;
    user.boughtCourses.push({ course: courseId });
    await user.save();

    res.status(200).json({ message: 'Payment verified and course purchased successfully' });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
