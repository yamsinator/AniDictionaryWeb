// src/App.js
import React from 'react';
import './App.css';
import Header from './Header';
import Navbar from './components/Navbar/Navbar';
//import HomePage from './components/HomePage/HomePage';
//import DictionaryGUI from './components/Dictionary/DictionaryGUI.js';
import HomePage from './components/HomePage/HomePage.js';
import DictionaryGUI from './components/Dictionary/DictionaryGUI.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <DictionaryGUI />
    </div>
  );
}

export default App;
