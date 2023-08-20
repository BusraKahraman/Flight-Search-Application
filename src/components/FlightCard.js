import React from 'react';
import '../dist/FlightCard.css';

const FlightCard = ({
  airline,
  departureCity,
  arrivalCity,
  departureTime,
  arrivalTime,
  departureAirportCode,
  arrivalAirportCode,
  departureDate,
  arrivalDate,
  price,
}) => {
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
      <div className='center mw5 mw6-ns br3 hidden ba b--black-10 mv4'>
        <h3 className='f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3'>
          {airline}
        </h3>
        <div className='card-content mw5 mw7-ns center bg-light-gray pa3 ph5-ns'>
          <p>
            <span>From: </span>
            {departureCity} ({departureAirportCode})
          </p>
          <p>
            <span>To: </span>
            {arrivalCity} ({arrivalAirportCode})
          </p>
          <p>
            <span>Departure Time: </span>
            {formatTime(departureDateTime)}
          </p>
          <p>
            <span>Arrival Time: </span>
            {formatTime(arrivalDateTime)}
          </p>
          <p>
            <span>Flight Length: </span>
            {calculateFlightLength()}
          </p>
          <p>
            <span>Price: $</span>
            {price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
