import React, { useState } from 'react';

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
      <h1>Create Entry</h1>
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