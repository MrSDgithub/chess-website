import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Schedule from './pages/Schedule';
import Leaderboard from './pages/Leaderboard';
import LiveMatches from './pages/LiveMatches';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-800">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/live-matches" element={<LiveMatches />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;