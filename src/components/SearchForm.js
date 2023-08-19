import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

const SearchForm = ({ flights, handleSearch }) => {
  // State variables

  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [oneWay, setOneWay] = useState(false);

  const departureCities = [
    ...new Set(flights.map((flight) => flight.departureCity)),
  ];
  const arrivalCities = [
    ...new Set(flights.map((flight) => flight.arrivalCity)),
  ];

  // Input changes and form submission

  const handleDepartureAirportChange = (event) => {
    const inputValue = event.target.value;
    setDepartureAirport(inputValue);
  };

  const handleArrivalAirportChange = (event) => {
    const inputValue = event.target.value;
    setArrivalAirport(inputValue);
  };

  const handleOneWayChange = (event) => {
    const isChecked = event.target.checked;
    setOneWay(isChecked);

    if (isChecked) {
      setArrivalDate(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!departureAirport || (!arrivalAirport && !oneWay)) {
      alert('Please enter both departure and arrival airports.');
      return;
    }

    const filteredFlights = flights.filter((flight) => {
      if (oneWay) {
        return (
          flight.departureAirportCode.toLowerCase() ===
          departureAirport.toLowerCase()
        );
      } else {
        return (
          flight.departureAirportCode.toLowerCase() ===
            departureAirport.toLowerCase() &&
          flight.arrivalAirportCode.toLowerCase() ===
            arrivalAirport.toLowerCase()
        );
      }
    });

    handleSearch(filteredFlights);

    const departureTime =
      departureDate instanceof Date ? departureDate.getTime() : null;
    const arrivalTime =
      arrivalDate instanceof Date ? arrivalDate.getTime() : null;

    if (!oneWay && arrivalTime < departureTime) {
      alert('Invalid arrival date');
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='container'>
        <div className='one-way'>
          <label htmlFor='checkbox'>One Way</label>

          <input
            type='checkbox'
            checked={oneWay}
            onChange={handleOneWayChange}
            name='one-way'
            id='checkbox'
          ></input>
        </div>
        <div className='departure'>
          <label htmlFor='departure'>From</label>
          <input
            type='text'
            value={departureAirport}
            onChange={handleDepartureAirportChange}
            placeholder='From'
            id='departure'
            list='departure-cities'
          />
          <datalist id='departure-cities'>
            {departureCities.map((city, index) => (
              <option key={`departure-${index}`} value={city} />
            ))}
          </datalist>
        </div>
        <div className='arrival'>
          {oneWay ? null : (
            <>
              <label htmlFor='arrival'>To</label>
              <input
                type='text'
                value={arrivalAirport}
                onChange={handleArrivalAirportChange}
                placeholder='To'
                id='arrival'
                list='arrival-cities'
              />
              <datalist id='arrival-cities'>
                {arrivalCities.map((city, index) => (
                  <option key={`arrival-${index}`} value={city} />
                ))}
              </datalist>
            </>
          )}
        </div>
        <div className='depDate'>
          <DatePicker
            showIcon
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
          />
        </div>
        <div className='arrDate'>
          {!oneWay && (
            <>
              <DatePicker
                showIcon
                selected={arrivalDate}
                onChange={(date) => setArrivalDate(date)}
              />
            </>
          )}
        </div>
        <div className='button'>
          <button type='submit'>Search</button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
