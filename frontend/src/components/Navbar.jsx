// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <Link to="/projects" className="hover:text-yellow-500">Projects</Link>
        </li>
        <li>
          <Link to="/achievements" className="hover:text-yellow-500">Achievements</Link>
        </li>
        <li>
          <Link to="/experiences" className="hover:text-yellow-500">Experiences</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
