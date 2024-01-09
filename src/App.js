import React, { useState } from "react";
import "./App.css";

function App() {
  const [yearsExperience, setYearsExperience] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await fetch("https://salary-prediction9-g5gyxv74oa-uc.a.run.app/predict", {
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
      // round of the salary to 2 decimal places
      result.prediction = Math.round(result.prediction * 100) / 100;
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
