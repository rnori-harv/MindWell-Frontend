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
        <li className={styles.navbar_item}>
          <Link to="/create-entry">Create Entry</Link>
        </li>
        <li className={styles.navbar_item}>
          <Link to="/list-entries">List Entries</Link>
        </li>
      </ul>
      <ul className={styles.navbar_items_right}>
        <li className={styles.navbar_item}>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className={styles.navbar_item}>
          <Link to="/login">Log In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;