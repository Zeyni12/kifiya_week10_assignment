import React, { useState } from "react";
import "./App.css"; // Import the CSS file

function App() {
  const [formData, setFormData] = useState({
    year: "",
    month: "",
    day: ""
  });

  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log("Response:", result);

    setPredictedPrice(result.price);
  };

  return (
    <div className="app-container">
      <h1 className="title">Brent Oil Price Prediction</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Year */}
          <div className="form-group">
            <label>
              Year:
              <input
                type="number"
                name="year"
                onChange={handleChange}
                placeholder="Enter year"
                required
              />
            </label>
          </div>

          {/* Month */}
          <div className="form-group">
            <label>
              Month:
              <input
                type="number"
                name="month"
                onChange={handleChange}
                placeholder="Enter month"
                required
              />
            </label>
          </div>

          {/* Day */}
          <div className="form-group">
            <label>
              Day:
              <input
                type="number"
                name="day"
                onChange={handleChange}
                placeholder="Enter day"
                required
              />
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit">Predict Brent Oil Price</button>
        </form>

        {predictedPrice !== null && (
          <div className="result-container">
            <h2>Predicted Price: ${predictedPrice}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
