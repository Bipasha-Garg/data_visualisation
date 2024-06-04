import React, { useState } from "react";
import "./App.css";
import Papa from "papaparse";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setSubmitted(false); // Reset submitted status when file changes
  };

  const submitHandler = () => {
      console.log("Submit button clicked");
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("File uploaded successfully:", data);
          setSubmitted(true); // Set submitted status to true after successful upload
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });

      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          console.log(results.data);
        },
      });
    } else {
      console.error("No file selected");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-amber-400">
      <div className="flex-col text-center">
        <h1 className="mb-4 text-5xl font-serif">Upload CSV file</h1>
        <div className="p-2">
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={fileChangeHandler}
            className="p-2 bg-amber-400 text-black rounded"
          />
        </div>
        <button
          onClick={submitHandler}
          className="mt-2 p-2 bg-amber-400 text-black rounded"
        >
          Submit
        </button>
        {submitted && (
          <p className="mt-2 text-green-500">
            CSV file submitted successfully!
          </p>
        )}
      </div>
    </main>
  );
}

export default App;
