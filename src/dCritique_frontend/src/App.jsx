import React, { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UploadFile } from "./Components/UploadFile";
import { Loader } from "./Components/Loader";

function App() {
  const [showForm, setShowForm] = useState(false);
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/loader" element={<Loader />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
