import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  role: { type: String, default: "user" }, // Add role with default as 'user'
  boughtCourses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      purchaseDate: { type: Date, default: Date.now },
      expiryDate: { type: Date },
    },
  ],
  boughtVideos: [
    {
      video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HomeVideo",
        required: true,
      },
      purchaseDate: { type: Date, default: Date.now },
    },
  ],
});

// Calculate expiry date for bought courses
userSchema.pre("save", function (next) {
  this.boughtCourses.forEach((boughtCourse) => {
    if (!boughtCourse.expiryDate) {
      boughtCourse.expiryDate = new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      );
    }
  });
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
