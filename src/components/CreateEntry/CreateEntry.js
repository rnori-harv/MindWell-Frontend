import React, { useState } from 'react';
import styles from './CreateEntry.module.css'; // Import the CSS file
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'


const CreateEntry = () => {
  const [data, setData] = useState({ key: 'Press Shift + Enter to submit' });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleKeyDown = (event) => {
    if (event.shiftKey && event.key === 'Enter') {
      handleSubmit(event);
    }
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
        console.log(jsonResponse);
        setData({key: jsonResponse.message  })
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
      <textarea
        className={styles.inputField}
        type="text"
        name="key"
        value={data.key}
        onChange={handleChange}
        onClick={() => {
          if (data.key === 'Press Shift + Enter to submit') {
            setData({ ...data, key: '' });
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder="Press Shift + Enter to submit"
        style={{ color: 'grey' }}
      />
    </div>
  );
};

export default CreateEntry;