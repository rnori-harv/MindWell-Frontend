import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from '../Navbar/Navbar';
import mindwellLogo from '../../assets/mindwell.png';
import styles from './Home.module.css'; // Import the CSS file
import axios from 'axios';


import { useState } from 'react';

import { useNavigate } from 'react-router-dom';


// Inside your component's JSX



const Home = ({ isHomePage, setIsHomePage }) => {
  const [apiKey, setApiKey] = useState('');
  const navigate = useNavigate();

  const switchToCreateEntry = () => {
    setIsHomePage(false);
    console.log(isHomePage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if the API key was submitted
    if (apiKey) {
      try {
        const response = await axios.post('https://mindwell-backend-91990103b961.herokuapp.com/api/api_key/submit/', { apiKey });
        if (response.data.status === 'success') {
        // Navigate to the "Create Entry" page
          switchToCreateEntry();  
          navigate('/create-entry');
        } else {
          setApiKey('');
          alert('Please enter a valid API key.');
        }
      } catch (error) {
        console.error('Error submitting API key:', error);
      }
    } else {
      // Show an error message or handle the case when the API key is not submitted
      alert('Please enter your API key before proceeding.');
    }
  };
  return (
    <div className="App">
      <header className={styles.header}>
        <h2>
          <span className={styles.mind}>Mind</span>
          <span className={styles.well}>Well</span>
        </h2>
      </header>
      <section className={styles.journalingSection}>
        <p className={styles.centeredText}>Make journaling an exercise. Write what's on your mind, and we'll seamlessly help you understand the emotions and thoughts you're feeling.</p>
        <p className={styles.centeredText}>First load your OpenAI api key, then click Get Started. </p>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="apiKey">OPENAI API Key:   </label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.getStarted}
              onClick={handleSubmit}>
              Get Started
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Home;