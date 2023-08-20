import React, { useState } from 'react';
import FlightList from './FlightList';
import SearchForm from './SearchForm';
import '../dist/FlightListPage.css';

const FlightListPage = ({ flights, setCurrentView }) => {
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [filterOption, setFilterOption] = useState('departureTime');

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterOption(selectedFilter);

    let sortedFlights = [...filteredFlights];

    if (selectedFilter === 'arrivalTime') {
      sortedFlights.sort(
        (a, b) => new Date(a.arrivalTime) - new Date(b.arrivalTime)
      );
    } else if (selectedFilter === 'departureTime') {
      sortedFlights.sort(
        (a, b) => new Date(a.departureTime) - new Date(b.departureTime)
      );
    } else if (selectedFilter === 'flightLength') {
      sortedFlights.sort((a, b) => {
        const aDuration = new Date(a.arrivalTime) - new Date(a.departureTime);
        const bDuration = new Date(b.arrivalTime) - new Date(b.departureTime);
        return aDuration - bDuration;
      });
    } else if (selectedFilter === 'price') {
      sortedFlights.sort((a, b) => a.price - b.price);
    }

    setFilteredFlights(sortedFlights);
  };

  const handleSearch = (filteredFlights) => {
    setFilteredFlights(filteredFlights);
    setCurrentView('flights');
  };

  return (
    <div className='flight-container'>
      <div className='flight-content'>
        <SearchForm flights={flights} handleSearch={handleSearch} />
      </div>
      <div className='filter-dropdown mt3'>
        <label htmlFor='filter'>Sort By: </label>
        <select id='filter' value={filterOption} onChange={handleFilterChange}>
          <option value='departureTime'>
            <span>Departure Time</span>
          </option>
          <option value='arrivalTime'>
            <span>Arrival Time</span>
          </option>
          <option value='flightLength'>
            <span>Flight Length</span>
          </option>
          <option value='price'>
            <span>Price</span>
          </option>
        </select>
      </div>
      <div className='flight-list-box'>
        <FlightList flights={filteredFlights} />
      </div>
    </div>
  );
};

export default FlightListPage;
