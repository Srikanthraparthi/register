import React, { useState } from "react";

const StudentRegistrations = ({ offerings, registrations, setRegistrations }) => {
  const [selectedOffering, setSelectedOffering] = useState("");
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [place, setPlace] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Register a student with additional fields
  const registerStudent = () => {
    if (selectedOffering && studentName.trim() && email.trim() && contact.trim() && place.trim()) {
      const offeringDetails = offerings.find(
        (offering) => offering.name === selectedOffering
      );

      if (offeringDetails) {
        setRegistrations((prev) => [
          ...prev,
          { studentName, email, contact, place, ...offeringDetails },
        ]);
        resetForm();
      }
    }
  };

  // Update existing student registration
  const updateStudent = () => {
    if (studentName.trim() && email.trim() && contact.trim() && place.trim()) {
      const updatedRegistrations = registrations.map((registration) =>
        registration.studentName === editingStudent.studentName
          ? { ...registration, studentName, email, contact, place }
          : registration
      );
      setRegistrations(updatedRegistrations);
      resetForm();
    }
  };

  // Handle delete operation
  const handleDelete = (studentName) => {
    const updatedRegistrations = registrations.filter(
      (registration) => registration.studentName !== studentName
    );
    setRegistrations(updatedRegistrations);
  };

  // Populate form for editing a student
  const handleEdit = (student) => {
    setIsEditing(true);
    setEditingStudent(student);
    setStudentName(student.studentName);
    setEmail(student.email);
    setContact(student.contact);
    setPlace(student.place);
    setSelectedOffering(student.name);
  };

  // Reset form state after add or update
  const resetForm = () => {
    setStudentName("");
    setEmail("");
    setContact("");
    setPlace("");
    setIsEditing(false);
    setEditingStudent(null);
    setSelectedOffering("");
  };

  return (
    <div>
      <h2>{isEditing ? "Edit Student Registration" : "Student Registrations"}</h2>

      {/* Select Offering */}
      <select
        value={selectedOffering}
        onChange={(e) => setSelectedOffering(e.target.value)}
      >
        <option value="">Select Offering</option>
        {offerings.map((offering, index) => (
          <option key={index} value={offering.name}>
            {offering.name} - ${offering.price} ({offering.duration} hours)
          </option>
        ))}
      </select>

      {/* Student Name */}
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Student Name"
      />

      {/* Email */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      {/* Contact */}
      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Contact"
      />

      {/* Place */}
      <input
        type="text"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="Place"
      />

      <button onClick={isEditing ? updateStudent : registerStudent}>
        {isEditing ? "Update" : "Add"}
      </button>

      {/* Display Registered Students */}
      <div>
        <h3>Registered Students</h3>
        {registrations.length === 0 ? (
          <p>No students registered yet.</p>
        ) : (
          <ul>
            {registrations.map((registration, index) => (
              <li key={index}>
                <strong>Student:</strong> {registration.studentName} <br />
                <strong>Email:</strong> {registration.email} <br />
                <strong>Contact:</strong> {registration.contact} <br />
                <strong>Place:</strong> {registration.place} <br />
                <strong>Course:</strong> {registration.name} <br />
                <strong>Price:</strong> ${registration.price} <br />
                <strong>Duration:</strong> {registration.duration} hours <br />
                <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleEdit(registration)}
                    style={{ backgroundColor: "orange", color: "white" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(registration.studentName)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </button>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentRegistrations;
