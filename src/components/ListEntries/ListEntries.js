import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EntriesList = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await axios.get('/api/entries');
      setEntries(response.data);
    };

    fetchEntries();
  }, []);

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
  };

  return (
    <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
      {entries.map((entry) => (
        <div key={entry._id} onClick={() => handleEntryClick(entry)}>
          {entry.title}
        </div>
      ))}
      {selectedEntry && (
        <div>
          <h2>{selectedEntry.title}</h2>
          <p>{selectedEntry.content}</p>
        </div>
      )}
    </div>
  );
};

export default EntriesList;
