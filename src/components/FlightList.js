import React from 'react';
import FlightCard from './FlightCard';

const FlightList = ({ flights }) => {
  return (
    <div className='list'>
      {flights.map((flight) => (
        <FlightCard
          key={flight.id}
          airline={flight.airline}
          departureCity={flight.departureCity}
          arrivalCity={flight.arrivalCity}
          departureTime={new Date(flight.departureTime)}
          arrivalTime={new Date(flight.arrivalTime)}
          price={flight.price}
        />
      ))}
    </div>
  );
};

export default FlightList;
