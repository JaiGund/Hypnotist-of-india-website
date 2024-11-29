import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  boughtCourses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Reference to Course schema
        required: true,
      },
      purchaseDate: { type: Date, default: Date.now }, // Server time for purchase date
      expiryDate: { type: Date }, // Expiry date calculated from server time
    },
  ],
});

// Pre-save hook to calculate expiryDate using server's time
userSchema.pre('save', function (next) {
  this.boughtCourses.forEach((boughtCourse) => {
    if (!boughtCourse.expiryDate) {
      const serverTime = new Date(Date.now()); // Get server's current time
      boughtCourse.expiryDate = new Date(
        serverTime.getTime() + 365 * 24 * 60 * 60 * 1000 // Adds 1 year
      );
    }
  });
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
