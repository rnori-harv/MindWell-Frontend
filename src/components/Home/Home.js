import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from '../Navbar/Navbar';
import mindwellLogo from '../../assets/mindwell.png';
import styles from './Home.module.css'; // Import the CSS file

function App() {
  return (
    <div className="App">
      <header className={styles.header}>
        <h1>
          <span className={styles.mind}>Mind</span>
          <span className={styles.well}>Well</span>
        </h1>
      </header>
      <section className={styles.journalingSection}>
        <p>Make journaling an exercise. Write what's on your mind, and we'll seamlessly help you understand the emotions and thoughts you're feeling.</p>
        <Link to="/create-entry" className={styles.getStarted}>Get Started</Link> {/* Replace the button with a Link component */}
      </section>
    </div>
  );
}

export default App;