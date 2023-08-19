import './App.css';
import React, { useState } from 'react';
import SearchFormPage from './components/SearchFormPage.js';
import FlightListPage from './components/FlightListPage';
import flightData from './flightData.json';

function App() {
  const [currentView, setCurrentView] = useState('search');

  return (
    <div className='App'>
      {currentView === 'search' && (
        <SearchFormPage setCurrentView={setCurrentView} flights={flightData} />
      )}
      {currentView === 'flights' && (
        <FlightListPage setCurrentView={setCurrentView} flights={flightData} />
      )}
    </div>
  );
}

export default App;
