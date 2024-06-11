import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Navbar from './components/Navbar/Navbar';
import DictionaryGUI from './components/Dictionary/DictionaryGUI';
import HomePage from './components/HomePage/HomePage';
import InfoPage from './components/AnimeInfoPage/InfoPage'; // Import the InfoPage component

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <Switch>
        <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/dictionary">
            <DictionaryGUI />
          </Route>
          <Route exact path="/">
            <InfoPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
