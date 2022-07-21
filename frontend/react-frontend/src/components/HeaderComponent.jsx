import React, { useEffect, useRef, useState } from "react";
import dateFormat from "dateformat";
import { useParams } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import { useHistory } from "react-router-dom";



const current = Math.floor(new Date().getTime());
const endTime = Math.floor(new Date().setTime(current + 2 * 60 * 1000));
var end = dateFormat(endTime, " h:MM:ss TT");


function HeaderComponent() {
  
  
  const id = useParams();
  // console.log("this is the id: " +id);
  // console.log(JSON.stringify(id));
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    // const countdownDate = new Date("August 05 2021 00:00:00").getTime();

    interval = setInterval(() => {
      const now = Math.floor(new Date().getTime());
      //var result = dateFormat("2019-04-30T08:59:00.000Z", "mmmm dS, yyyy")

      // var result = dateFormat(now, " h:MM:ss TT");
      // console.log("Current:");
      // console.log(now);
      // console.log(result);
      // console.log("End:");
      // console.log(endTime);
      // console.log(end);

      //const distance = countdownDate - now;
      const distance = endTime - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (100 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop our timer
        clearInterval(interval.current);
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  const history = useHistory();
  const Logout = () => {
    
    console.log("inside logout");
    
    history.push('/');
  };

  // componentDidMount
  useEffect(() => {
    startTimer();
    return () => {};
  });

  


  return (
    <div>
      <header>
        <nav
              className="navbar  navbar-dark bg-dark"
              style={{ width: "100%" }}
            >
              <div style={{ float: "left" }}>
                <a className="navbar-brand" style={{ color: "white" }}>
                  AfCON Fantasy Football
                </a>
              </div>

              <div style={{ float: "right" }}>
                <a className="navbar-brand" style={{ color: "white" }}>
                  Home
                </a>
                <a style={{ color: "white" }} onClick={() => Logout()}>
                  {" "}
                  Logout
                </a>
              </div>
            </nav>

      </header>
    </div>
  );
}
export default HeaderComponent;
