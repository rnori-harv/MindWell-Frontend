import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">MindWell</Link></li>
      <li><Link to="/create-entry">Create Entry</Link></li>
      <li><Link to="/list-entries">List Entries</Link></li>
      <li><Link to="/emotion-tracker">Emotion Tracker</Link></li>
    </ul>
  </nav>
);

export default Navbar;
