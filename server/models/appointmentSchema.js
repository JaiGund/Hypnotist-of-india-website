import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  sessionType: { type: String, enum: ['meditation', 'hypnosis', 'counseling'], required: true },
  concerns: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
export default Appointment;
