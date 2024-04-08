// src/App.js
import React from 'react';
import './App.css';
import Header from './Header';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
