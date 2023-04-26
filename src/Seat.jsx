import { useState, useEffect } from "react";
import "./Sets.css";

function Sets() {
  const [coach, setCoach] = useState(new Array(80).fill("A"));
  const [numSeats, setNumSeats] = useState(0);

  useEffect(() => {
    // Initialize the coach with all seats available
    let initialCoach = new Array(80).fill("A");

    // Set the seats that are already booked to 'B'
    initialCoach[0] = "B"; // Example booking
    initialCoach[1] = "B";
    initialCoach[2] = "B";
    initialCoach[10] = "B";
    initialCoach[4] = "B";

    setCoach(initialCoach);
  }, []);

  const reserveSeats = (event) => {
    event.preventDefault();
    let seatsBooked = [];
    let startIndex = -1;
    let endIndex = -1;

    // Check if enough seats are available
    let availableSeats = coach.filter((seat) => seat === "A").length;
    if (numSeats > availableSeats) {
      alert(`Sorry, only ${availableSeats} seats are available.`);
      return;
    }

    // Check if the number of seats is less than or equal to 7
    if (numSeats > 7) {
      alert("Sorry, you can only reserve up to 7 seats at a time.");
      return;
    }

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
    let updatedCoach = [...coach];
    for (let i = 0; i < seatsBooked.length; i++) {
      updatedCoach[seatsBooked[i]] = "B";
    }
    setCoach(updatedCoach);

    // Print the result
    alert(
      `Seats booked: ${seatsBooked.map((index) => index + 1).join(", ")}`
    );
  };

  const handleNumSeatsChange = (event) => {
    setNumSeats(Number(event.target.value));
  };

  return (
    <div className="coach-container">
      <form onSubmit={reserveSeats}>
        <label htmlFor="num-seats">Number of seats:</label>
        <input
          type="number"
          id="num-seats"
          name="num-seats"
          min="1"
          value={numSeats}
          onChange={handleNumSeatsChange}
          required
        />
        <button type="submit">Reserve</button>
      </form>
      <div className="coach-box">
        {coach.map((seat, index) => (
          <div
            key={index}
            className={`seat ${seat === "A" ? "available" : "booked"}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default Sets;