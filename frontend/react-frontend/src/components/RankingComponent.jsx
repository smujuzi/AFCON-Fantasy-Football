import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
import TeamService from "../services/TeamService";
import TimerComponent from "./TimerComponent";
import HeaderComponent from "./HeaderComponent";
import pitch from "./images/pitch.jpg";
import algeria from "./images/flags/algeria.png";
import kenya from "./images/flags/kenya.png";
import senegal from "./images/flags/senegal.png";
import tanzania from "./images/flags/tanzania.png";
import egypt from "./images/flags/egypt.png";
import zimbabwe from "./images/flags/zimbabwe.png";
import drcongo from "./images/flags/drcongo.png";
import uganda from "./images/flags/uganda.png";
import UserService from "../services/UserService";

import algeriaKit from "./images/kit/algeriaKit.png";
import kenyaKit from "./images/kit/kenyaKit.png";
import senegalKit from "./images/kit/senegalKit.png";
import tanzaniaKit from "./images/kit/tanzaniaKit.png";

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      getID: this.props.match.params.getID,
      teamOfUser: [],
      topScorers: [],
      topAssists: [],
      topPlayers: [],
      user: "",
      
    };

    this.goBack = this.goBack.bind(this);
    this.getImage = this.getImage.bind(this);

    
    
  }

  componentDidMount() {
    TeamService.getTeamOfUser(this.state.getID).then((res) => {
      console.log("Inside function");
      console.log(res.data);
      this.setState({ teamOfUser: res.data[0] });
    });

    UserService.getUser(this.state.getID).then((res) => {
      console.log("Inside getUser function");
      console.log(res.data);
      this.setState({ user: res.data });
    });

    TeamService.getTopPlayers().then((res) => {
      console.log("Top Players DATA:");
      console.log(res.data);
      this.setState({ topPlayers: res.data });
    });
    

    TeamService.getTopScorers().then((res) => {
      this.setState({ topScorers: res.data });
    });

    TeamService.getTopAssists().then((res) => {
      this.setState({ topAssists: res.data });
    });
  }

  goBack()
  {
    this.props.history.goBack();
  }

  getImage(team)
  {
    console.log("Inside getImage");
    console.log(team);
    
    if(team == "ALG")
    {
      
      return <div><img className="kit" src={algeriaKit}></img></div>
    }
    else if(team == "SEN")
    {
      return <div><img className="kit" src={senegalKit}></img></div>
    }

    else if(team == "TZ")
    {
      return <div><img className="kit" src={tanzaniaKit}></img></div>
    }

    else if(team == "KE")
    {
      return <div><img className="kit" src={kenyaKit}></img></div>
    }

    else{
      return <div></div>;
    }
  }
  
  render() {
    return (
      <div className="container-xl">
        <div className="banner"></div>
        {/* <h1>HOME PAGE</h1> */}

        {/* <!-- Page content--> */}
        <div className="container-xl">
          <div className="row">
            <div class="col-xl-2  space"></div>

            {/* <!-- Blog entries--> */}
            <div className="col-xl-7">
              {/* <!-- Featured blog post--> */}
              <div className="info">
                <div className="topPitchView" style={{width: "100%"}}>
                  
                  <div className="topPitchView-items" style={{width: "100%"}}>
                  <button style={{float: "left", marginTop: "5px"}} onClick={() => this.goBack()}>Go Back</button>
                    {" "}
                    <h2 style={{float: "left"}}>{this.state.user.firstName}'s Team | Points: {this.state.user.points}</h2>
                    
                  </div>

                  <div className="topPitchView-items">
                    <button
                      id="viewMatch"
                      style={{ display: "none" }}
                      onClick={() => this.viewMatch(this.state.id)}
                      type="button"
                    >
                      View Match
                    </button>
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="container">
                  <div>
                    <img
                      className="card-img-top"
                      src={pitch}
                      alt="..."
                      style={{ width: "100%" }}
                    />
                  </div>
                  {/* <p id="end" style={{ position: "absolute", marginTop: "-10px", marginLeft: "60px" }}>

                        FULL TIME!
                      </p> */}

                  <div id="GK">
                    {this.state.teamOfUser.map((user) => {
                      if (user.position == "GK") {
                        return (
                          <div className="single" key={user.playerid}>
                            <div
                              
                              onClick={() =>
                                this.removePlayer(this.state.id, user.playerid)
                              }
                            >
                              {this.getImage(user.team)}
                            </div>
                            {/* <button onClick={() =>this.removePlayer(this.state.id, user.playerid)}
                                    className="btn btn-danger Button" >
                              remove
                            </button> */}
                            {/* <i class="fa-solid fa-circle-minus" style={{height: "100px", width: "100px"}}></i> */}
                            <div className="player">
                              <p>{user.name}</p>
                              <p
                                style={{
                                  marginLeft: "20px",
                                  marginTop: "-18px",
                                }}
                              >
                                <small>{user.points}</small>
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return <div></div>;
                    })}
                  </div>

                  <div id="DEF">
                    {this.state.teamOfUser.map((user) => {
                      if (user.position == "DEF") {
                        return (
                          <div className="single" key={user.playerid}>
                            <div
                              
                              onClick={() =>
                                this.removePlayer(this.state.id, user.playerid)
                              }
                            >
                              {this.getImage(user.team)}
                            </div>
                            <div className="player">
                              <p>{user.name}</p>
                              <p
                                style={{
                                  marginLeft: "20px",
                                  marginTop: "-18px",
                                }}
                              >
                                <small>{user.points}</small>
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return <div></div>;
                    })}
                  </div>

                  <div id="MID">
                    {this.state.teamOfUser.map((user) => {
                      if (user.position == "MID") {
                        return (
                          <div className="single" key={user.playerid}>
                            <div
                              
                              onClick={() =>
                                this.removePlayer(this.state.id, user.playerid)
                              }
                            >
                              {this.getImage(user.team)}
                            </div>
                            <div className="player">
                              <p>{user.name}</p>
                              <p
                                style={{
                                  marginLeft: "20px",
                                  marginTop: "-18px",
                                }}
                              >
                                <small>{user.points}</small>
                              </p>
                            </div>
                          </div>
                        );
                      }

                      return <div></div>;
                    })}
                  </div>

                  <div id="FWD">
                    {this.state.teamOfUser.map((user) => {
                      if (user.position == "FWD") {
                        return (
                          <div className="single" key={user.playerid}>
                            <div
                              
                              onClick={() =>
                                this.removePlayer(this.state.id, user.playerid)
                              }
                            >
                              {this.getImage(user.team)}
                            </div>
                            <div className="player">
                              <p>{user.name}</p>
                              <p
                                style={{
                                  marginLeft: "20px",
                                  marginTop: "-18px",
                                }}
                              >
                                <small>{user.points}</small>
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return <div></div>;
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Side widgets--> */}
            <div className="col-xl-3">
              {/* <!-- Search widget--> */}
              {/* <div className="card mb-4"> */}


              <h3 style={{ marginTop: "10px" }}> Top Players</h3>
              <div className="row">
                <div style={{ overflow: "auto", height: "200px" }}>
                  <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Points</th>
                        
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.topPlayers.map((player) => (
                        <tr key={player.playerid}>
                          <td>
                            <div className="adjustWidth">{player.name}</div>
                          </td>

                          <td> {player.points}</td>
                          

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <h3 style={{ marginTop: "10px" }}> Top Scorers</h3>
              <div className="row">
                <div style={{ overflow: "auto", height: "200px" }}>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Player Name</th>
                        <th>Goals</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.topScorers.map((player) => (
                        <tr key={player.playerid}>
                          <td>
                            <div className="adjustWidth">{player.name}</div>
                          </td>

                          {/* <td> {player.name}</td> */}
                          <td> {player.goal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <h3> Top Assists</h3>
              <div className="row">
                <div style={{ overflow: "auto", height: "200px" }}>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Player Name</th>
                        <th>Assists</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.topAssists.map((player) => (
                        <tr key={player.playerid}>
                          <td>
                            <div className="adjustWidth">{player.name}</div>
                          </td>

                          <td> {player.assists}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
