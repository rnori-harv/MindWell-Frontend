import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.navbar_item}>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;