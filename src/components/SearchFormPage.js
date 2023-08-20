import React from 'react';
import SearchForm from './SearchForm';
import flightData from '../flightData.json';

const SearchFormPage = ({ setCurrentView, setFilteredFlights }) => {
  const handleSearch = (filteredFlights) => {
    setFilteredFlights(filteredFlights);
    setCurrentView('flights');
  };

  return (
    <div>
      <SearchForm flights={flightData} handleSearch={handleSearch} />
    </div>
  );
};

export default SearchFormPage;
