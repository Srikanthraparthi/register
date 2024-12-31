import React, { useState } from "react";
import CourseTypes from "./components/CourseTypes";
import Courses from "./components/Courses";
import CourseOfferings from "./components/CourseOfferings";
import StudentRegistrations from "./components/StudentRegistrations";
import "./styles.css";

const App = () => {
  // State for managing Course Types, Courses, and Offerings
  const [courseTypes, setCourseTypes] = useState(["Individual", "Group", "Special"]);
  const [courses, setCourses] = useState(["English", "Hindi", "Urdu"]);
  const [offerings, setOfferings] = useState([
    { name: "Individual - English", price: 100, duration: 20 },
    { name: "Group - Hindi", price: 75, duration: 15 },
    { name: "Special - Urdu", price: 120, duration: 25 },
  ]);

  // State for managing student registrations
  const [registrations, setRegistrations] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>Student Registration System</h1>
      </header>
      <main>
        <CourseTypes
          courseTypes={courseTypes}
          setCourseTypes={setCourseTypes}
        />
        <Courses
          courses={courses}
          setCourses={setCourses}
        />
        <CourseOfferings
          courseTypes={courseTypes}
          courses={courses}
          offerings={offerings}
          setOfferings={setOfferings}
        />
        <StudentRegistrations
          offerings={offerings}
          registrations={registrations}
          setRegistrations={setRegistrations}
        />
      </main>
    </div>
  );
};

export default App;
