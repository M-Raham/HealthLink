import React from "react";
import { Routes, Route } from "react-router-dom";

// Landing pages
import Home from "./pages/landing/Home";
import About from "./pages/landing/About";
import Services from "./pages/landing/Services";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
    </Routes>
  );
};

export default AppRoutes;
