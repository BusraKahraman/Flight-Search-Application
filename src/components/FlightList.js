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
          departureAirportCode={flight.departureAirportCode}
          arrivalCity={flight.arrivalCity}
          arrivalAirportCode={flight.arrivalAirportCode}
          departureTime={new Date(flight.departureTime)}
          arrivalTime={new Date(flight.arrivalTime)}
          departureDate={flight.departureDate}
          arrivalDate={flight.arrivalDate}
          price={flight.price}
        />
      ))}
    </div>
  );
};

export default FlightList;
