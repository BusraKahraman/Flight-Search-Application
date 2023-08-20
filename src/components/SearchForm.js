import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import AirportCodes from '../AirportCodes';
import '../dist/SearchForm.css';

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
    if (!departureAirport || !arrivalAirport) {
      alert('Please enter both departure and arrival airports.');
      return;
    }

    let filteredFlights = flights.filter((flight) => {
      return (
        flight.departureCity.toLowerCase() === departureAirport.toLowerCase() &&
        flight.arrivalCity.toLowerCase() === arrivalAirport.toLowerCase()
      );
    });

    if (!oneWay) {
      filteredFlights = filteredFlights.filter((flight) => {
        const flightDepartureDate = new Date(flight.departureDate);
        const flightArrivalDate = new Date(flight.arrivalDate);
        return (
          flightDepartureDate >= departureDate &&
          flightArrivalDate <= arrivalDate
        );
      });
    }

    const departureTime =
      departureDate instanceof Date ? departureDate.getTime() : null;
    const arrivalTime =
      arrivalDate instanceof Date ? arrivalDate.getTime() : null;

    if (!oneWay && arrivalTime < departureTime) {
      alert('Invalid arrival date');
      return;
    }
    handleSearch(filteredFlights);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='submit-container mw5 mw7-ns center pa3 ph5-ns'>
        <div className='departure mt0'>
          <label htmlFor='departure' className='db fw6 lh-copy f6'>
            From
          </label>
          <input
            type='text'
            value={departureAirport}
            onChange={handleDepartureAirportChange}
            placeholder='From'
            id='departure'
            list='departure-cities'
            className='pa2 input-reset ba bg-white hover-bg-black hover-white w-100'
          />
          <datalist id='departure-cities'>
            {departureCities.map((cityCode, index) => (
              <option
                key={`departure-${index}`}
                value={AirportCodes[cityCode]}
              />
            ))}
          </datalist>
        </div>
        <div className='arrival mt3'>
          <label htmlFor='arrival' className='db fw6 lh-copy f6'>
            To
          </label>
          <input
            type='text'
            value={arrivalAirport}
            onChange={handleArrivalAirportChange}
            placeholder='To'
            id='arrival'
            list='arrival-cities'
            className='pa2 input-reset ba bg-white hover-bg-black hover-white w-100'
          />
          <datalist id='arrival-cities'>
            {arrivalCities.map((cityCode, index) => (
              <option key={`arrival-${index}`} value={AirportCodes[cityCode]} />
            ))}
          </datalist>
        </div>
        <div className='depDate  mt3'>
          <DatePicker
            showIcon
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
          />
        </div>
        {!oneWay && (
          <div className='arrDate  mt3'>
            <DatePicker
              showIcon
              selected={arrivalDate}
              onChange={(date) => setArrivalDate(date)}
            />
          </div>
        )}
        <div className='one-way mt3'>
          <label htmlFor='search-checkbox'>One Way</label>
          <input
            type='checkbox'
            checked={oneWay}
            onChange={handleOneWayChange}
            name='one-way'
            id='checkbox'
          ></input>
        </div>
        <div className='button mt3'>
          <button
            type='submit'
            className='f4 grow no-underline br-pill ba b--white bw2 ph5 pv3 mb2 bg-transparent dib white'
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
