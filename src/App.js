import './App.css';
import React, { useState } from 'react';
import SearchFormPage from './components/SearchFormPage.js';
import FlightListPage from './components/FlightListPage';
import flightData from './flightData.json';

function App() {
  const [currentView, setCurrentView] = useState('search');
  const [filteredFlights, setFilteredFlights] = useState([]);

  return (
    <div className='App'>
      {currentView === 'search' && (
        <SearchFormPage
          setCurrentView={setCurrentView}
          flights={flightData}
          setFilteredFlights={setFilteredFlights}
        />
      )}
      {currentView === 'flights' && (
        <FlightListPage
          setCurrentView={setCurrentView}
          flights={filteredFlights}
        />
      )}
    </div>
  );
}

export default App;
