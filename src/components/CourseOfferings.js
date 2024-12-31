import React, { useState } from "react";
import "./styles.css"; // Assuming the CSS file is included

const CourseOfferings = ({ courseTypes, courses, offerings, setOfferings }) => {
  // States to manage form inputs
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [editingOffering, setEditingOffering] = useState(null); // For editing an offering

  // Create or Update Offering
  const handleSubmit = () => {
    if (selectedCourse && selectedType && price && duration) {
      const newOffering = {
        name: `${selectedType} - ${selectedCourse}`,
        price: parseFloat(price),
        duration: parseFloat(duration),
      };

      if (editingOffering) {
        // Update existing offering
        const updatedOfferings = offerings.map((offering) =>
          offering.name === editingOffering.name ? newOffering : offering
        );
        setOfferings(updatedOfferings);
      } else {
        // Create new offering
        setOfferings([...offerings, newOffering]);
      }

      // Reset the form
      setSelectedCourse("");
      setSelectedType("");
      setPrice("");
      setDuration("");
      setEditingOffering(null); // Reset editing state
    }
  };

  // Handle Delete Offering
  const handleDelete = (offeringName) => {
    const filteredOfferings = offerings.filter(
      (offering) => offering.name !== offeringName
    );
    setOfferings(filteredOfferings);
  };

  // Handle Edit Offering
  const handleEdit = (offering) => {
    setSelectedCourse(offering.name.split(" - ")[1]);
    setSelectedType(offering.name.split(" - ")[0]);
    setPrice(offering.price);
    setDuration(offering.duration);
    setEditingOffering(offering);
  };

  return (
    <div>
      <h2>Course Offerings</h2>

      {/* Create or Edit Offering Form */}
      <div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Select Course Type</option>
          {courseTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration (hours)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {editingOffering ? "Update Offering" : "Add Offering"}
        </button>
      </div>

      {/* List of Offerings */}
      <ul>
        {offerings.map((offering, index) => (
          <li key={index}>
            <div>
              <strong>{offering.name}</strong>
              <br />
              Price: ${offering.price} | Duration: {offering.duration} hours
            </div>

            {/* Buttons (Edit and Delete) side by side */}
            <div className="button-container">
              <button onClick={() => handleEdit(offering)}>Edit</button>
              <button onClick={() => handleDelete(offering.name)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseOfferings;
