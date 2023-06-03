import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import CreateEntry from './components/CreateEntry/CreateEntry';
import ListEntries from './components/ListEntries/ListEntries';
import EmotionTracker from './components/EmotionTracker/EmotionTracker';

function App() {
  return (
    <Router>
      <Navbar />
<Routes>
  <Route exact path="/" element={<Home />} />
  <Route path="/create-entry" element={<CreateEntry />} />
  <Route path="/list-entries" element={<ListEntries />} />
  <Route path="/emotion-tracker" element={<EmotionTracker />} />
</Routes>
    </Router>
  );
}

export default App;