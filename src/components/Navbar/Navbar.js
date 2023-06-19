import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import the CSS file

const Navbar = ({ isHomePage, setIsHomePage }) => {
  const handleHomeClick = () => {
    setIsHomePage(true);
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        {!isHomePage && (
        <li className={styles.navbar_item}>
          <Link to="/" onClick={handleHomeClick}>Home</Link>
        </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;