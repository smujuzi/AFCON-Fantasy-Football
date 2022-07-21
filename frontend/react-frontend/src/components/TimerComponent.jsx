import React, { useEffect, useRef, useState } from "react";
import pic from "./try.jpg";
import pi from "./timer.jpg";
import dateFormat from "dateformat";
import banner1 from "./images/banner1.png";
import banner2 from "./images/banner2.jpg";
import banner3 from "./images/banner3.jpg";
import banner4 from "./images/banner4.png";
import banner5 from "./images/banner5.jpg";
import banner6 from "./images/banner6.jpg";

// const current = Math.floor(new Date().getTime());
// const endTime = Math.floor(new Date().setTime(current + 5 * 60 * 1000));

function TimerComponent(props) {
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    // const countdownDate = new Date("August 31 2021 13:39:00").getTime();
    const current = Math.floor(new Date().getTime());
    const endTime = Math.floor(new Date().setTime(current + 0.2 * 60 * 1000));
    //const endTime = new Date("August 31 2021 13:39:00").getTime();

    interval.current = setInterval(() => {
      const now = Math.floor(new Date().getTime());

      const distance = endTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop our timer
        clearInterval(interval.current);
        props.parentCallback();
      } else {
        // update timer
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  // componentDidMount
  useEffect(() => {
    console.log("Inital Render!");
    startTimer();

    return () => {};
  }, []);

  return (
    <div>
      <div className="item">
        <span className="mdi mdi-calendar-clock timer-icon">
          Gameweek dealine
        </span>
      </div>

      <div className="item screen">
        <p className="number">{timerMinutes}</p>
        <p className="text">
          <small>Minutes</small>
        </p>
      </div>
      <span className="item screen">:</span>

      <div className="item screen">
        <p className="number">{timerSeconds}</p>
        <p className="text">
          <small>Seconds</small>
        </p>
      </div>
    </div>
  );
}

export default TimerComponent;
