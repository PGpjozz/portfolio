import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProjectDetails from "./pages/ProjectDetails";
import Services from "./pages/Services";

function App() {
  return (
    <Router>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
