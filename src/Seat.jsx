import { useState, useEffect } from "react";

function Sets() {
  const [coach, setCoach] = useState(new Array(80).fill("A"));
  const [numSeats, setNumSeats] = useState("");
  const [message, setMessage] = useState("");
  coach[0] = 'B'; // Example booking
  coach[7] = 'B';
  coach[8] = 'B';
  coach[10] = 'B';

  coach[12] = 'B';
  coach[30] = 'B';
  coach[31] = 'B';
  coach[32] = 'B';
  coach[33] = 'B';
  useEffect(() => {
    const availableSeats = coach.filter((seat) => seat === "A").length;
    if (numSeats > availableSeats) {
      setMessage(`Sorry, only ${availableSeats} seats are available.`);
    } else if (numSeats > 7) {
      setMessage("Sorry, you can only reserve up to 7 seats at a time.");
    } else {
      setMessage("");
    }
  }, [coach, numSeats]);

  function reserveSeats() {
    let seatsBooked = [];
    let startIndex = -1;
    let endIndex = -1;

    // Find a row of available seats if possible
    for (let i = 0; i < coach.length; i++) {
      if (coach[i] === "A") {
        if (startIndex === -1) {
          startIndex = i;
        }
        if (i - startIndex + 1 === numSeats) {
          endIndex = i;
          break;
        }
      } else {
        startIndex = -1;
      }
    }

    // If a row is not available, find nearby seats
    if (endIndex === -1) {
      for (let i = 0; i < coach.length; i++) {
        if (coach[i] === "A") {
          seatsBooked.push(i);
          if (seatsBooked.length === numSeats) {
            break;
          }
        }
      }
      endIndex = seatsBooked[seatsBooked.length - 1];
    } else {
      for (let i = startIndex; i <= endIndex; i++) {
        seatsBooked.push(i);
      }
    }

    // Book the seats
    const newCoach = [...coach];
    for (let i = 0; i < seatsBooked.length; i++) {
      newCoach[seatsBooked[i]] = "B";
    }
    setCoach(newCoach);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (numSeats && !message) {
      reserveSeats();
    }
  }

  function handleNumSeatsChange(e) {
    const value = parseInt(e.target.value);
    setNumSeats(value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Number of seats:
          <input type="number" value={numSeats} onChange={handleNumSeatsChange} />
        </label>
        <button type="submit">Book Seats</button>
      </form>
      <p>{message}</p>
      <p>Coach layout:</p>
      <ul>
        {coach.map((seat, index) => (
          <li key={index}>
            Seat {index + 1}: {seat === "A" ? <span style={{color:"blue"}}>Available</span> : <span style={{color:"red"}}>Booked</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sets;
