import React, { useState } from "react";

const CourseTypes = ({ courseTypes, setCourseTypes }) => {
  const [newCourseType, setNewCourseType] = useState("");

  const addCourseType = () => {
    if (newCourseType.trim() !== "") {
      setCourseTypes([...courseTypes, newCourseType]);
      setNewCourseType("");
    }
  };

  const updateCourseType = (index, updatedName) => {
    const updatedTypes = [...courseTypes];
    updatedTypes[index] = updatedName;
    setCourseTypes(updatedTypes);
  };

  const deleteCourseType = (index) => {
    const updatedTypes = courseTypes.filter((_, i) => i !== index);
    setCourseTypes(updatedTypes);
  };

  return (
    <div>
      <h2>Course Types</h2>
      <input
        type="text"
        value={newCourseType}
        onChange={(e) => setNewCourseType(e.target.value)}
        placeholder="Add Course Type"
      />
      <button onClick={addCourseType}>Add</button>
      <ul>
        {courseTypes.map((type, index) => (
          <li key={index}>
            <input
              type="text"
              value={type}
              onChange={(e) => updateCourseType(index, e.target.value)}
            />
            <button onClick={() => deleteCourseType(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseTypes;
