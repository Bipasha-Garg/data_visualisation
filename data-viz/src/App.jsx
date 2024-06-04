import React from "react";
import "./App.css";
import Papa from "papaparse";

function App() {
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skinEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
      }

    });
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
            onChange={changeHandler}
            className="p-2 bg-amber-400 text-black rounded"
          />

        </div>
      </div>
    </main>
  );
}

export default App;
