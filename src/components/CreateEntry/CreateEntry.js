import React, { useState } from 'react';
import styles from './CreateEntry.module.css';
import Modal from 'react-modal';
import {EnhanceAI} from "enhanceai";

const CreateEntry = () => {
  const [data, setData] = useState({ key: 'Press Shift + Enter to submit' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleKeyDown = (event) => {
    if (event.shiftKey && event.key === 'Enter') {
      handleSubmit(event);
    }
  };
  const openModal = (message) => {
    setData({ key: message });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setData({ key: '' });
    setIsModalOpen(false);
  };
  const openProcessingModal = () => {
    setIsProcessingModalOpen(true);
  };
  const closeProcessingModal = () => {
    setIsProcessingModalOpen(false);
  };

  const adjustHeight = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto'; // Reset the height to 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scrollHeight
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    openProcessingModal(); // Open the processing modal
    try {
      const response = await fetch('http://localhost:8000/api/create-entry/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      closeProcessingModal(); // Close the processing modal
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);

        // Open the modal with the message from the server response
        openModal(jsonResponse.message);
      } else {
        console.error('Error creating entry:', response.statusText);
      }
    } catch (error) {
      closeProcessingModal(); // Close the processing modal
      console.error('Error creating entry:', error);
    }
  };
  return (
    <div className ={styles.container}>
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
          onInput={adjustHeight}
          onClick={() => {
            if (data.key === 'Press Shift + Enter to submit') {
              setData({ ...data, key: '' });
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Press Shift + Enter to submit"
          style={{ color: 'grey' }}
        />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Server Response"
      >
        <h2>Server Response</h2>
        <p>{data.key}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
      <Modal
        isOpen={isProcessingModalOpen}
        contentLabel="Processing Entry"
        className={styles.processingModal}
      >
        <h2 style={{ color: 'grey', textAlign: 'center' }}>Processing your entry</h2>
        <div className={styles.spinner}></div>
      </Modal>
    </div>
  );
};

export default CreateEntry;