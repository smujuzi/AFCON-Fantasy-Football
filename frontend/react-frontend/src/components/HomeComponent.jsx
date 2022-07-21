import React, { Component } from "react";

import TeamService from "../services/TeamService";
import UserService from "../services/UserService";
import TimerComponent from "./TimerComponent";
import pitch from "./images/pitch.jpg";
import algeria from "./images/flags/algeria.png";
import kenya from "./images/flags/kenya.png";
import senegal from "./images/flags/senegal.png";
import tanzania from "./images/flags/tanzania.png";
import egypt from "./images/flags/egypt.png";
import zimbabwe from "./images/flags/zimbabwe.png";
import drcongo from "./images/flags/drcongo.png";
import uganda from "./images/flags/uganda.png";

import algeriaKit from "./images/kit/algeriaKit.png";
import kenyaKit from "./images/kit/kenyaKit.png";
import senegalKit from "./images/kit/senegalKit.png";
import tanzaniaKit from "./images/kit/tanzaniaKit.png";

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      teamOfUser: [],
      unselectedPlayers: [],
      firstName: "",
      lastName: "",
      emailId: "",
      message: "",
      toggleValue: 0,
      displayTeam: [],
      timerDone: 0,
      topScorers: [],
      topAssists: [],
      topPlayers: [],
      countGK: 0,
      countDEF: 0,
      countMID: 0,
      countFWD: 0,
    };

    this.baseState = this.state;

    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.setCountPositons = this.setCountPositons.bind(this);
    this.checkAddPosition = this.checkAddPosition.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  handleCallback() {
    console.log("Inside handleCallback");

    var button = document.getElementsByClassName("addButton");
    for (var i = 0; i < button.length; i++) {
      button[i].style.display = "none";
    }
    this.setState({ timerDone: 1 });

    document.getElementById("viewMatch").style.display = "block";
  }

  reset = () => {
    this.setState({ toggleValue: 0 });
    console.log("ToggleValue: ");
    console.log(this.state.toggleValue);
    return <h2>REFRESH BUTTON CLICKED!")</h2>;
  };

  componentDidMount() {
    TeamService.getTeamOfUser(this.state.id).then((res) => {
      console.log("Inside function");
      console.log(res.data);
      this.setState({ teamOfUser: res.data[0] });
      this.setState({ unselectedPlayers: res.data[1] });
      this.setCountPositons(res.data[0]);
    });
    this.setState({ toggleValue: 0 });

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

  viewMatch(id) {
    //Update matchday
    UserService.updateMatchday();
    this.props.history.push(`/match/${id}`);
  }

  setCountPositons(data) {
    let loopData = data;
    let scountGK = 0;
    let scountDEF = 0;
    let scountMID = 0;
    let scountFWD = 0;

    console.log("Inside set count team of state");
    console.log(loopData);
    console.log("Inside set count team of state");

    for (let i = 0; i < loopData.length; i++) {
      console.log("loop " + i);
      console.log(loopData[i].position);

      if (loopData[i].position == "GK") {
        scountGK = scountGK + 1;
      }
      if (loopData[i].position == "DEF") {
        scountDEF = scountDEF + 1;
      }
      if (loopData[i].position == "MID") {
        scountMID = scountMID + 1;
      }
      if (loopData[i].position == "FWD") {
        scountFWD = scountFWD + 1;
      }
    }

    this.setState({ countGK: scountGK });
    this.setState({ countDEF: scountDEF });
    this.setState({ countMID: scountMID });
    this.setState({ countFWD: scountFWD });
    console.log("SetPositions");
    console.log("countGK: " + this.state.countGK);
    console.log("countDEF: " + this.state.countDEF);
    console.log("countMID: " + this.state.countMID);
    console.log("countFWD: " + this.state.countFWD);
  }

  checkAddPosition(position //0 = add 1 = remove
) {
    console.log("checkAddPosition");
    console.log("countGK: " + this.state.countGK);
    console.log("countDEF: " + this.state.countDEF);
    console.log("countMID: " + this.state.countMID);
    console.log("countFWD: " + this.state.countFWD);

    if (position == "GK" && this.state.countGK == 1) {
      console.log("You have reached the maximum GoalKeepers");
      return 0;
    } else if (position == "DEF" && this.state.countDEF == 4) {
      console.log("You have reached the maximum Defenders");
      return 0;
    } else if (position == "MID" && this.state.countMID == 4) {
      console.log("You have reached the maximum Midfielders");
      return 0;
    } else if (position == "FWD" && this.state.countFWD == 2) {
      console.log("You have reached the maximum Forwards");
      return 0;
    }
    return 1;
  }

  addPlayer(id, playerid, position) {
    console.log("Home component add player method");
    

    if (this.checkAddPosition(position) == 0) {
      alert(position + " Filled");
    } else if (this.state.teamOfUser.length >= 11) {
      console.log("Position Filled");

      document.getElementsByClassName("max")[0].style.display = "block";
    } else {
      TeamService.addPlayerToUserTeam(id, playerid).then((res) => {
        this.setState({ teamOfUser: res.data[0] }, function () {
          this.setCountPositons(this.state.teamOfUser);
        });

        this.setState({ unselectedPlayers: res.data[1] });
      });
      

      this.props.history.push(`/home/${id}/add-player/${playerid}`);
    }
  }

  removePlayer(id, playerid) {
   
    if (this.state.timerDone == 0) {
      console.log("Home component remove player method");
      TeamService.removePlayerFromUserTeam(id, playerid).then((res) => {
        this.setState({ teamOfUser: res.data[0] }, function () {
          this.setCountPositons(this.state.teamOfUser);
        });

        this.setState({ unselectedPlayers: res.data[1] });
      });

      if (this.state.teamOfUser.length <= 11) {
        document.getElementsByClassName("max")[0].style.display = "none";
      }
      this.props.history.push(`/home/${id}/remove-player/${playerid}`);
    }

  
  }

  getPlayer() {
    console.log("Inside get player");
    var teamData = this.state.teamOfUser;
    console.log(this.state.teamOfUser);

    for (var i = 0; i < teamData.length; i++) {
      this.state.team.push(
        <div key={teamData[i].playerid}>
          PlayerID: {teamData[i].playerid}, Name: {teamData[i].name}
        </div>
      );
    }

    var team = [];
    var teamData = this.state.teamOfUser;

    for (var i = 0; i < teamData.length; i++) {
      team.push(
        <div key={teamData[i].playerid}>
          PlayerID: {teamData[i].playerid}, Name: {teamData[i].name}
        </div>
      );
    }

    this.state.displayTeam = team;
  }

  getImage(team) {
    console.log("Inside getImage");
    console.log(team);

    if (team == "ALG") {
      return (
        <div>
          <img className="kit" src={algeriaKit}></img>
        </div>
      );
    } else if (team == "SEN") {
      return (
        <div>
          <img className="kit" src={senegalKit}></img>
        </div>
      );
    } else if (team == "TZ") {
      return (
        <div>
          <img className="kit" src={tanzaniaKit}></img>
        </div>
      );
    } else if (team == "KE") {
      return (
        <div>
          <img className="kit" src={kenyaKit}></img>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div className="container-xl">
        <div className="banner"></div>

        {/* <!-- Page content--> */}
        <div className="container-xl">
          <div className="row">
            <div class="col-xl-2  space">

            <h3 style={{ marginTop: "10px" ,marginLeft: "30px" }}> Top Players</h3>
              <div className="row" style={{marginLeft: "30px"}}>
                <div style={{ overflow: "auto", height: "200px" }}>
                  <table className="table table-striped table-bordered" >
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

              <h3 style={{ marginTop: "10px",marginLeft: "30px" }}> Top Scorers</h3>
              <div className="row" style={{marginLeft: "30px"}}>
                <div style={{ overflow: "auto", height: "200px" }}>
                  <table className="table table-striped table-bordered" >
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

                          
                          <td> {player.goal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <h3 style={{ marginTop: "10px",marginLeft: "30px" }}> Top Assists</h3>
              <div className="row" style={{marginLeft: "30px"}}>
                <div style={{ overflow: "auto", height: "200px" }}>
                  <table className="table table-striped table-bordered" >
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

           
            <div className="col-xl-7">
              
              <div className="info">
                <div className="topPitchView">
                  <div className="topPitchView-items">
                    <h2>Pick team</h2>
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

                <div className="clock">
                  <TimerComponent parentCallback={this.handleCallback} />
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
                  

                  <div className="max">
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      {" "}
                      MAXIMUM PLAYERS SELECTED{" "}
                    </p>
                  </div>
                  <div id="GK">
                    {this.state.teamOfUser.map((user) => {
                      if (user.position == "GK") {
                        return (
                          <div className="single" key={user.playerid}>
                            <div
                              className="marker"
                              onClick={() =>
                                this.removePlayer(this.state.id, user.playerid)
                              }
                            >
                              {this.getImage(user.team)}
                            </div>
                            
                            <p className="player">{user.name}</p>
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
                              className="marker"
                              onClick={() =>
                                this.removePlayer(this.state.id, user.playerid)
                              }
                            >
                              {this.getImage(user.team)}
                            </div>
                            <p className="player">{user.name}</p>
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
                              className="marker"
                              onClick={() =>
                                this.removePlayer(this.state.id, user.playerid)
                              }
                            >
                              {this.getImage(user.team)}
                            </div>
                            <p className="player">{user.name}</p>
                          </div>
                        );
                      }

                      return <div> </div>;
                    })}
                  </div>

                  <div id="FWD">
                    {this.state.teamOfUser.map((user) => {
                      if (user.position == "FWD") {
                        return (
                          <div className="single" key={user.playerid}>
                            <div
                              className="marker"
                              onClick={() =>
                                this.removePlayer(this.state.id, user.playerid)
                              }
                            >
                              {this.getImage(user.team)}
                            </div>
                            <p className="player">{user.name}</p>
                          </div>
                        );
                      }
                      return <div></div>;
                    })}
                  </div>
                </div>

                <div className="card-body">
                  <div className="small text-muted">January 1, 2021</div>
                  <div
                    className="fixture-title"
                    style={{ marginLeft: "360px" }}
                  >
                    <h2>Fixtures</h2>
                  </div>

                  <div className="fixture">
                    <div className="match">
                      <div className="match-detail team">
                        <p>Senegal </p>
                      </div>
                      <div
                        className="match-detail"
                        style={{ marginLeft: "40px" }}
                      >
                        {" "}
                        <img className="flag" src={senegal}></img>
                      </div>
                      <div className="match-detail team e">
                        <p className="match-time"> 16:00 </p>
                      </div>
                      <div className="match-detail">
                        {" "}
                        <img className="flag" src={tanzania}></img>
                      </div>
                      <div className="match-detail team">
                        <p>Tanzania </p>
                      </div>
                    </div>
                    <hr className="line"></hr>
                  </div>

                  <div className="fixture">
                    <div className="match">
                      <div className="match-detail team">
                        <p>Algeria </p>
                      </div>
                      <div
                        className="match-detail"
                        style={{ marginLeft: "50px" }}
                      >
                        {" "}
                        <img className="flag" src={algeria}></img>
                      </div>
                      <div className="match-detail team e">
                        <p className="match-time"> 16:30 </p>
                      </div>
                      <div className="match-detail">
                        {" "}
                        <img className="flag" src={kenya}></img>
                      </div>
                      <div className="match-detail team">
                        <p>Kenya </p>
                      </div>
                    </div>
                    <hr className="line"></hr>
                  </div>

                  <div className="fixture">
                    <div className="match">
                      <div className="match-detail team">
                        <p>Egypt </p>
                      </div>
                      <div
                        className="match-detail"
                        style={{ marginLeft: "60px" }}
                      >
                        {" "}
                        <img className="flag" src={egypt}></img>
                      </div>
                      <div className="match-detail team e">
                        <p className="match-time"> 17:30 </p>
                      </div>
                      <div
                        className="match-detail"
                        style={{ marginLeft: "22px" }}
                      >
                        {" "}
                        <img className="flag" src={zimbabwe}></img>
                      </div>
                      <div className="match-detail team">
                        <p>Zimbabwe </p>
                      </div>
                    </div>
                    <hr className="line"></hr>
                  </div>

                  <div className="fixture">
                    <div className="match">
                      <div className="match-detail team">
                        <p>DR Congo </p>
                      </div>
                      <div className="match-detail">
                        {" "}
                        <img className="flag" src={drcongo}></img>
                      </div>
                      <div className="match-detail team e">
                        <p className="match-time"> 20:00 </p>
                      </div>
                      <div
                        className="match-detail"
                        style={{ marginLeft: "12px" }}
                      >
                        {" "}
                        <img className="flag" src={uganda}></img>
                      </div>
                      <div className="match-detail team">
                        <p>Uganda </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="col-xl-3">
              
              <h2> Players</h2>
              <div className="row">
                <div style={{ overflow: "auto", height: "600px" }}>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Player Name</th>
                        <th>Position</th>
                        <th>Team</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.unselectedPlayers.map((player) => (
                        <tr key={player.playerid}>
                          <td>
                            <button
                              style={{ float: "left", marginLeft: "2px" }}
                              onClick={() =>
                                this.addPlayer(
                                  this.state.id,
                                  player.playerid,
                                  player.position
                                )
                              }
                              className="btn btn-info addButton adjustWidth"
                            >
                              + Add
                            </button>
                            <div className="adjustWidth">{player.name}</div>
                          </td>

                          {/* <td> {player.name}</td> */}
                          <td> {player.position}</td>
                          <td> {player.team}</td>
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
