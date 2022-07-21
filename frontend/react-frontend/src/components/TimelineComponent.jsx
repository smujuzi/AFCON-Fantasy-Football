import React, { useEffect, useRef, useState } from "react";
import TeamService from "../services/TeamService";


// const current = Math.floor(new Date().getTime());
// const endTime = Math.floor(new Date().setTime(current + 2 * 60 * 1000));


function TimelineComponent(props) {

  const [timerMinutes, setTimerMinutes] = useState("00");
  const matchTimeSeconds = (100 / 9) * 60; //Represents interval per minute in match time
  

  let interval = useRef();

  const startTimer = () => {
    const current = Math.floor(new Date().getTime());
    const endTime = Math.floor(new Date().setTime(current + 2 * 60 * 1000));

    interval.current = setInterval(() => {
      const now = Math.floor(new Date().getTime());

      const distance = now - current;
      const timeLeft = endTime - now;

      let minutes = Math.floor(
        ((distance % (1000 * 60 * 60)) / (1000 * 60)) * 91
      );

      if(minutes > 90)
      {
        minutes = minutes - 90;
        props.matchDone();
      }
      

      if (timeLeft < 1) {
        //stop our timer
        
        clearInterval(interval.current);
        
        
        // document.getElementById("end").style.color = "red";
        // document.getElementById("end").style.display = "block";
      } else {
        // update timer
        setTimerMinutes(minutes);
        
      }

      props.checkTime(minutes);

    }, matchTimeSeconds);

 


  };

  // componentDidMount
  useEffect(() => {
    startTimer();

    return () => {};
  }, []);

  return (
    
      
      <div>
        <div className="timer-Timeline">

          <div className="timer-Timeline-Score">
            <span className="mdi mdi-calendar-clock timer-icon-Timeline">{timerMinutes}'</span>
          </div>

        </div>
      
      </div>


      

    
  );
}

export default TimelineComponent;
