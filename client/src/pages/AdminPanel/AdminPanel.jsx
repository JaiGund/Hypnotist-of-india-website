import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("addCourse"); // Manage active tab
  const [appointments, setAppointments] = useState([]);
  const [courses, setCourses] = useState([]); // For viewing/editing courses
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
    learningPoints: [""],
  });

  const [editCourseId, setEditCourseId] = useState(null); // For editing courses

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Mark appointment as read
  const markAsRead = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axios.patch(`http://localhost:5000/api/${id}/read`, { read: newStatus });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id ? { ...appointment, read: newStatus } : appointment
        )
      );
    } catch (error) {
      console.error("Error marking appointment as read:", error);
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

  // Add fields
  const addLinkField = () => {
    setCourseForm({ ...courseForm, links: [...courseForm.links, ""] });
  };
  const addLearningPointField = () => {
    setCourseForm({
      ...courseForm,
      learningPoints: [...courseForm.learningPoints, ""],
    });
  };

  // Add or Edit course submission
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCourseId) {
        // Edit course
        await axios.put(`http://localhost:5000/api/courses/${editCourseId}`, courseForm);
        alert("Course updated successfully!");
      } else {
        // Add course
        await axios.post("http://localhost:5000/api/courses/add", courseForm);
        alert("Course added successfully!");
      }
      fetchCourses();
      resetCourseForm();
    } catch (error) {
      console.error("Error adding/editing course:", error);
      alert("Failed to submit course. Please try again.");
    }
  };

  // Edit course handler
  const handleEditCourse = (course) => {
    setEditCourseId(course._id);
    setCourseForm(course);
    setActiveTab("addCourse");
  };

  // Delete course handler
  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      alert("Course deleted successfully!");
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course.");
    }
  };

  // Reset form
  const resetCourseForm = () => {
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
      learningPoints: [""],
    });
    setEditCourseId(null);
  };

  // Initialize data
  useEffect(() => {
    fetchAppointments();
    fetchCourses();
  }, []);

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={activeTab === "addCourse" ? "active-tab" : ""}
          onClick={() => {
            setActiveTab("addCourse");
            resetCourseForm();
          }}
        >
          {editCourseId ? "Edit Course" : "Add Course"}
        </button>
        <button
          className={activeTab === "viewAppointments" ? "active-tab" : ""}
          onClick={() => setActiveTab("viewAppointments")}
        >
          View Appointments
        </button>
        <button
          className={activeTab === "viewCourses" ? "active-tab" : ""}
          onClick={() => setActiveTab("viewCourses")}
        >
          View Courses
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "addCourse" && (
          <div className="add-course">
            <h2>{editCourseId ? "Edit Course" : "Add a New Course"}</h2>
            <form onSubmit={handleCourseSubmit}>
              {/* Course Form */}
              <input
                type="text"
                name="title"
                placeholder="Course Title"
                value={courseForm.title}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="Course Description"
                value={courseForm.description}
                onChange={handleInputChange}
                required
              ></textarea>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={courseForm.price}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={courseForm.category}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={courseForm.duration}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="level"
                placeholder="Level"
                value={courseForm.level}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="thumbnail"
                placeholder="Thumbnail URL"
                value={courseForm.thumbnail}
                onChange={handleInputChange}
                required
              />

              {/* Links */}
              {courseForm.links.map((link, index) => (
                <input
                  key={index}
                  type="text"
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
                  placeholder={`Learning Point ${index + 1}`}
                  value={point}
                  onChange={(e) => handleInputChange(e, index, "learningPoints")}
                />
              ))}
              <button type="button" onClick={addLearningPointField}>
                Add Another Learning Point
              </button>

              <button type="submit">{editCourseId ? "Update Course" : "Add Course"}</button>
            </form>
          </div>
        )}

        {activeTab === "viewAppointments" && (
          <div className="view-appointments">
            <h2>View Appointments</h2>
            {appointments.map((appointment, index) => (
              <div key={index} className={`appointment ${appointment.read ? "read" : ""}`}>
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

        {activeTab === "viewCourses" && (
          <div className="view-courses">
          <h2>View Courses</h2>
          <div className="course-list">
            {courses.map((course) => (
              <div key={course._id} className="course-card">
                <div
                  className="course-thumbnail"
                  style={{
                    backgroundImage: `url(${course.thumbnail || 'default-thumbnail.jpg'})`,
                  }}
                ></div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p><strong>Price:</strong> ₹{course.price}</p>
                <p><strong>Category:</strong> {course.category}</p>
                <p><strong>Duration:</strong> {course.duration} hours</p>
                <div className="actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEditCourse(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteCourse(course._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        )}
      </div>
    </div>
  );
};

export default AdminPanel;