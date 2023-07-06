import React, { useState } from "react";
import "./App.css";

function App() {
  const [type, setType] = useState("Quote");
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setResult(""); // Clear previous result
    setError(""); // Clear previous error

    try {
      const response = await fetch(`https://shyari.onrender.com/generate?type=${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword }),
      });

      const data = await response.json();

      if (response.ok) {
        if (type === "Shayari" || type === "Story") {
          setResult(data.join("\n"));
        } else {
          setResult(data);
        }
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="container">
      <h1 className="title">OpenAI Chat App</h1>
      <div className="form-group">
        <label htmlFor="keywordInput" className="label">
          Keyword:
        </label>
        <input
          type="text"
          id="keywordInput"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="input"
          placeholder="Enter a keyword"
        />
      </div>
      <div className="form-group">
        <label htmlFor="typeSelect" className="label">
          Type:
        </label>
        <select
          id="typeSelect"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="select"
        >
          <option value="Quote">Quote</option>
          <option value="Shayari">Shayari</option>
          <option value="Story">Story</option>
          <option value="Joke">Joke</option>
        </select>
      </div>
      <button onClick={handleGenerate} className="button">
        Generate
      </button>
      {result && (
        <div className="result-container">
          <h3 className="result-title">Generated Content:</h3>
          <div className="result-content">
            {type === "Shayari" || type === "Story" ? (
              <pre>{result}</pre>
            ) : (
              <p>{result}</p>
            )}
          </div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
