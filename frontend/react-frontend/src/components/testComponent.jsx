import React, { Component } from "react";
import MatchService from "../services/MatchService";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

class testComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: [],
      
    };

    
  }

  componentDidMount() {
    MatchService.getMatches().then((res) => {
      console.log("Calling service");
      console.log(res.data);
      this.setState({ match: res.data });
      
    });
  }



  render() {
    return (
      <div className="container">
        <div className="row">
          {/* <h1>Timeline</h1> */}

          <VerticalTimeline>
            
            {this.state.match.map((match) => (

              <VerticalTimelineElement
                key={match.matchid}
                date={match.time}
                iconStyle={{ background: "blue" }}
                position="right"
              >
                <h3 className="vertical-timeline-element-title">
                  {match.scenario}
                </h3>
                <h5 className="vertical-timeline-element-subtitle">
                {match.player}
                </h5>
                {/* <p id="description">{match.player}</p> */}

              </VerticalTimelineElement>

            ))}
            

          </VerticalTimeline>
        </div>
      </div>
    );
  }
}

export default testComponent;
