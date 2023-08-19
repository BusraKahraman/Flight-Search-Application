import React from 'react';

const FlightCard = ({
  airline,
  departureCity,
  arrivalCity,
  departureTime,
  arrivalTime,
  departureDate,
  arrivalDate,
  price,
}) => {
  console.log('departureDate:', departureDate);
  console.log('arrivalDate:', arrivalDate);
  console.log('departureTime:', departureTime);
  console.log('arrivalTime:', arrivalTime);

  const departureDateTime = new Date(departureTime);
  const arrivalDateTime = new Date(arrivalTime);

  const calculateFlightLength = () => {
    const diffInMilliseconds = arrivalDateTime - departureDateTime;

    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    return `${hours}h ${minutes}m`;
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='container'>
      <h3>{airline}</h3>
      <p>From: {departureCity}</p>
      <p>To: {arrivalCity}</p>
      <p>Departure: {formatTime(departureDateTime)}</p>
      <p>Arrival: {formatTime(arrivalDateTime)}</p>
      <p>Flight Length: {calculateFlightLength()}</p>
      <p>Price: ${price}</p>
    </div>
  );
};

export default FlightCard;
