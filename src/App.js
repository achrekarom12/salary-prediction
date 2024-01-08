import React, { useState } from "react";
import "./App.css";

function App() {
  const [yearsExperience, setYearsExperience] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ years_experience: parseFloat(yearsExperience) }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setPrediction(result.prediction);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline m-8">
        Salary Prediction using Linear Regression
      </h1>

      <div>
        <label htmlFor="yearsExperience">Years of Experience:</label>
        <input
          type="number"
          id="yearsExperience"
          value={yearsExperience}
          onChange={(e) => setYearsExperience(e.target.value)}
          className="border-2 border-gray-500 rounded-md ml-2"
        />
        <button
          onClick={handlePredict}
          className="border bg-blue-400 rounded-md p-1 m-4"
        >
          Predict
        </button>
      </div>

      {prediction !== null && (
        <div>
          <h2 className="font-semibold mt-2">Predicted Salary: $ {prediction}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
