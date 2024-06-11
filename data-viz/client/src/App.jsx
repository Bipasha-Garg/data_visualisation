import React, { useState, useEffect } from "react";
import "./App.css";
import Papa from "papaparse";
import RedirectPage from "./components/RedirectPage";

function App() {
  const redirectToRedirectPage = () => {
    window.location.href = "/RedirectPage.html";
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setSubmitted(false); // Reset submitted status when file changes
    submitHandler(event.target.files[0]);
    window.location.href = "/RedirectPage.html";
  };

  const submitHandler = (selectedfile) => {
    console.log(selectedfile);
    if (selectedfile) {

      const formData = new FormData();
      formData.append("file", selectedfile);

      fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("File uploaded successfully:", data);
          setSubmitted(true); // Trigger the display of RedirectPage
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

  // const handleSubmitClick = () => {
  //   setSubmitted(true);
  // };

  return (
    <main>
      {submitted ? (
        <RedirectPage />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-black text-amber-400">
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
              onClick={redirectToRedirectPage}
              className="mt-2 p-2 bg-amber-400 text-black rounded"
            >
              Submit
            </button>
          </div>
          <button
            onClick={redirectToRedirectPage}
            className="absolute top-4 right-4 bg-amber-400 text-black rounded p-2"
          >
            View Visualisations
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
