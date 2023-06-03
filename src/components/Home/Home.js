import React from 'react';
import Navbar from '../Navbar/Navbar';
import mindwellLogo from '../../assets/mindwell.png';
import styles from './Home.module.css'; // Import the CSS file

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={mindwellLogo} alt="MindWell Logo" className={styles.logo} /> {/* Apply the logo class */}
        <h1>MindWell</h1>
      </header>
    </div>
  );
}

export default App;