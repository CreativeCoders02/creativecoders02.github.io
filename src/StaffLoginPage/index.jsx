import React, { useState, useEffect } from "react";
import "./styles.css";
const StaffLoginPage = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container pageContainer">
      <h2>Staff Login</h2>
      <form>
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="image-container">
        <img
          className={fadeIn ? "fade-in" : ""}
          src="/lady2.jpg"
          alt="Fading"
        />
      </div>
    </div>
  );
};

export default StaffLoginPage;
