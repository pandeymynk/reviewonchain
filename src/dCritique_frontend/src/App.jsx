import React, { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReviewDashboard } from "./Components/ReviewDashboard";
import { AnimatedBackground } from "./Components/AnimatedBackground";
import "./index.css";

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app">
      <AnimatedBackground />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ReviewDashboard theme={theme} setTheme={setTheme} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;