import React, { useState } from 'react';
import styles from './CreateEntry.module.css'; // Import the CSS file


const CreateEntry = () => {
  const [data, setData] = useState({ key: 'value' });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/create-entry/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse.message);
      } else {
        console.error('Error creating entry:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <h2 className={styles.createEntryText}>
          <span className={styles.create}>Create </span>
          <span className={styles.entry}>Entry</span>
        </h2>
      </header>
      <form onSubmit={handleSubmit}>
        {/* Add your form fields here */}
        <input
          type="text"
          name="key"
          value={data.key}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEntry;