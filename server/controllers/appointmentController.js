import Appointment from '../models/appointmentSchema.js';

// Book a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { name, email, contact, date, time, sessionType, concerns } = req.body;

    if (!name || !email || !contact || !date || !time || !sessionType) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const newAppointment = new Appointment({
      name,
      email,
      contact,
      date,
      time,
      sessionType,
      concerns,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully!', appointment: newAppointment });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all appointments (optional: for admin use)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const markAsRead = async (req, res) => {
  const { id } = req.params;
  const { read } = req.body; // We receive the updated read status

  try {
    // Find the appointment by ID and update the 'read' status
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { read: read },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment read status updated', appointment });
  } catch (error) {
    console.error('Error marking appointment as read/unread:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
