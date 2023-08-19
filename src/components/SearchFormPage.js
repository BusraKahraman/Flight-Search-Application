import React from 'react';
import SearchForm from './SearchForm';
import flightData from '../flightData.json';

const SearchFormPage = ({ setCurrentView }) => {
  const handleSearch = (filteredFlights) => {
    setCurrentView('flights');
  };

  return (
    <div className='container'>
      <div className='box'>
        <SearchForm flights={flightData} handleSearch={handleSearch} />
      </div>
    </div>
  );
};

export default SearchFormPage;
