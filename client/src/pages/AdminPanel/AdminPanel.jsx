import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("addCourse"); // Manage active tab
  const [appointments, setAppointments] = useState([]);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    duration: "",
    level: "",
    studentsEnrolled: 0,
    thumbnail: "",
    links: [""],
    learningPoints: [""], // Learning points as an array
  });

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments"
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Mark as read
  const markAsRead = async (id, currentStatus) => {
    try {
      // Toggle the read status
      const newStatus = !currentStatus;

      // Send the updated status to the backend
      await axios.patch(`http://localhost:5000/api/${id}/read`, { read: newStatus });

      // Update the local state with the new status
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id ? { ...appointment, read: newStatus } : appointment
        )
      );
    } catch (error) {
      console.error('Error marking appointment as read:', error);
    }
  };

  // Handle course input changes
  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;

    if (field === "links") {
      const updatedLinks = [...courseForm.links];
      updatedLinks[index] = value;
      setCourseForm({ ...courseForm, links: updatedLinks });
    } else if (field === "learningPoints") {
      const updatedLearningPoints = [...courseForm.learningPoints];
      updatedLearningPoints[index] = value;
      setCourseForm({ ...courseForm, learningPoints: updatedLearningPoints });
    } else {
      setCourseForm({ ...courseForm, [name]: value });
    }
  };

  // Add additional fields
  const addLinkField = () => {
    setCourseForm({ ...courseForm, links: [...courseForm.links, ""] });
  };

  const addLearningPointField = () => {
    setCourseForm({
      ...courseForm,
      learningPoints: [...courseForm.learningPoints, ""],
    });
  };

  // Submit course form
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/courses/add", courseForm);
      alert("Course added successfully!");
      setCourseForm({
        title: "",
        description: "",
        price: "",
        category: "",
        duration: "",
        level: "",
        studentsEnrolled: 0,
        thumbnail: "",
        links: [""],
        learningPoints: [""], // Reset learning points array
      });
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course. Please try again.");
    }
  };

  // Initialize appointments data
  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={activeTab === "addCourse" ? "active-tab" : ""}
          onClick={() => setActiveTab("addCourse")}
        >
          Add Course
        </button>
        <button
          className={activeTab === "viewAppointments" ? "active-tab" : ""}
          onClick={() => setActiveTab("viewAppointments")}
        >
          View Appointments
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Add Course Tab */}
        {activeTab === "addCourse" && (
          <div className="add-course">
            <h2>Add a New Course</h2>
            <form onSubmit={handleCourseSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Course Title"
                value={courseForm.title}
                onChange={(e) => handleInputChange(e)}
                required
              />
              <textarea
                name="description"
                placeholder="Course Description"
                value={courseForm.description}
                onChange={(e) => handleInputChange(e)}
                required
              ></textarea>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={courseForm.price}
                onChange={(e) => handleInputChange(e)}
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={courseForm.category}
                onChange={(e) => handleInputChange(e)}
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={courseForm.duration}
                onChange={(e) => handleInputChange(e)}
                required
              />
              <input
                type="text"
                name="level"
                placeholder="Level (Beginner, Intermediate, Advanced)"
                value={courseForm.level}
                onChange={(e) => handleInputChange(e)}
                required
              />
              <input
                type="number"
                name="studentsEnrolled"
                placeholder="Students Enrolled"
                value={courseForm.studentsEnrolled}
                onChange={(e) => handleInputChange(e)}
              />
              <input
                type="text"
                name="thumbnail"
                placeholder="Thumbnail URL"
                value={courseForm.thumbnail}
                onChange={(e) => handleInputChange(e)}
                required
              />

              {/* Video Links */}
              {courseForm.links.map((link, index) => (
                <input
                  key={index}
                  type="text"
                  name="links"
                  placeholder={`Video Link ${index + 1}`}
                  value={link}
                  onChange={(e) => handleInputChange(e, index, "links")}
                />
              ))}
              <button type="button" onClick={addLinkField}>
                Add Another Link
              </button>

              {/* Learning Points */}
              {courseForm.learningPoints.map((point, index) => (
                <input
                  key={index}
                  type="text"
                  name="learningPoints"
                  placeholder={`Learning Point ${index + 1}`}
                  value={point}
                  onChange={(e) =>
                    handleInputChange(e, index, "learningPoints")
                  }
                />
              ))}
              <button type="button" onClick={addLearningPointField}>
                Add Another Learning Point
              </button>

              <button type="submit">Add Course</button>
            </form>
          </div>
        )}

        {/* View Appointments Tab */}
        {activeTab === "viewAppointments" && (
          <div className="view-appointments">
            <h2>View Appointments</h2>
            {appointments.map((appointment, index) => (
              <div
                key={index}
                className={`appointment ${appointment.read ? "read" : ""}`}
              >
                <h3>{appointment.name}</h3>
                <p>Email: {appointment.email}</p>
                <p>Contact: {appointment.contact}</p>
                <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p>Time: {appointment.time}</p>
                <p>Session Type: {appointment.sessionType}</p>
                <p>Concerns: {appointment.concerns}</p>
                <label>
                  <input
                    type="checkbox"
                    checked={appointment.read}
                    onChange={() => markAsRead(appointment._id, appointment.read)}
                  />
                  Mark as Read/Unread
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
