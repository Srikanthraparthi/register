import React, { useState } from "react";

const Courses = ({ courses, setCourses }) => {
  const [newCourse, setNewCourse] = useState("");

  const addCourse = () => {
    if (newCourse.trim() !== "") {
      setCourses([...courses, newCourse]);
      setNewCourse("");
    }
  };

  const updateCourse = (index, updatedName) => {
    const updatedCourses = [...courses];
    updatedCourses[index] = updatedName;
    setCourses(updatedCourses);
  };

  const deleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  return (
    <div>
      <h2>Courses</h2>
      <input
        type="text"
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
        placeholder="Add Course"
      />
      <button onClick={addCourse}>Add</button>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            <input
              type="text"
              value={course}
              onChange={(e) => updateCourse(index, e.target.value)}
            />
            <button onClick={() => deleteCourse(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
