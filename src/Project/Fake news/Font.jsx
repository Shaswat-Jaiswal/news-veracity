import { useState } from "react";
import "./Font.css";
import { Hamburger } from "./Hams/Hamsburger.jsx";
import { MdArticle } from "react-icons/md";
import { LuLoader } from "react-icons/lu";
import { Navbar }  from "./Navbar/Navbar.jsx";
import api from "./api/axios";


export const Font = ({ setPage, isDark, setIsDark }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  
const handleAnalyze = async () => {
  if (!input.trim()) {
    alert("Please enter news text");
    return;
  }

  setLoading(true);
  setResult("");

  try {
    const { data } = await api.post("/news/analyze", {
      text: input,
    });

    setResult(data.result);
  } catch (error) {
  setResult(error.response?.data?.message || "Server error");
} finally {
    setLoading(false);
  }
};

  
  const wordCount = input.trim() === "" ? 0 : input.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="container-1">
      <div className="top-bar">
      <div className="ham-box">
          <Hamburger setPage={setPage} isDark={isDark} setIsDark={setIsDark} />
          </div>

          <div className="navbar-box">
        <Navbar  />
        </div>
        </div>
        
      
      <div className="main-container">
        <div className="heading-box">
          <MdArticle size={35} className="heading-icon" />
          <h2>Analyze News </h2>
        </div>

        <div className="big-input-box">
          <textarea
            placeholder="Enter headline or your news text.."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="fixed-textarea"
          ></textarea>

          {/* Clear button left-aligned inside big-input-box */}
          <div className="clear-row">
            <button
              className="clear-btn"
              onClick={() => {
                setInput("");
                setResult("");
              }}
            >
              Clear
            </button>
          </div>
        </div>

        <p className="char-count">
          Characters: {input.length} • Words: {wordCount} • Read time: {readTime} min
        </p>

        {/* Analyze button */}
        <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
          {loading ? (
            <span className="loader-box">
              <LuLoader className="spin" size={22} /> Analyzing...
            </span>
          ) : (
            "Analyze News"
          )}
        </button>

        {/* Result */}
        {result && (
          <div className="result-box">
            <h3>Result:</h3>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};
