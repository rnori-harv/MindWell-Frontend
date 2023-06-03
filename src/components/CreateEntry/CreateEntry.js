import React, { useState } from 'react';

const JournalEntry = () => {
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the entry to the server here
  };

  return (
    <div>
      <h1>Create Journal Entry</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="entry">Entry:</label>
        <textarea
          id="entry"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JournalEntry;
