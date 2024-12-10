import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import Experiences from './pages/Experiences'; 
import Navbar from './components/Navbar'; 
import Home from "./pages/Home"

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> 
        <Routes>
          <Route path="/projects" element={<Projects />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/" element={<Home />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
