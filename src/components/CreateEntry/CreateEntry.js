import React, { useState } from 'react';
import styles from './CreateEntry.module.css';
import Modal from 'react-modal';


const CreateEntry = () => {
  const [data, setData] = useState({ key: 'Press Shift + Enter to submit' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);

  
  const formatEmotionData = (data) => {
    const emotions = data.split('\n');
    const formattedData = emotions.map((emotion, index) => {
      if (emotion.trim()) {
        const isLastLine = index === emotions.length - 2;
        const isIncomplete = (emotion.match(/"/g) || []).length !== 2;
        
        if (isLastLine && isIncomplete) {
          return null;
        }
  
        const isEmotion = emotion.startsWith("1.") || emotion.startsWith("2.") || emotion.startsWith("3.");
        const className = isEmotion ? styles.emotion : styles.instance;
        return (
          <div key={index} className={className}>
            {emotion}
            <br />
          </div>
        );
      }
      return null;
    });
    return formattedData;
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });

    const percentage = (event.target.length / event.target.maxLength) * 100;
  
    // Update the background gradient
    event.target.style.backgroundImage = `linear-gradient(to right, white, white ${percentage}%, transparent ${percentage}%)`;
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
      const response = await fetch('https://mindwell-backend-91990103b961.herokuapp.com/api/create-entry/', {
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
        <h2 style={{ color: 'grey', textAlign: 'center' }}>Entry Breakdown</h2>
        <div className="emotionDataContainer">
          <h3> Here were some of the most prevalent emotions we saw in your journal entry.</h3>
          {formatEmotionData(data.key)}
        </div>
        <div className={styles.closeButtonContainer}> 
          <button className={styles.closeButton} onClick={closeModal}>
            Close
          </button>
        </div>
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