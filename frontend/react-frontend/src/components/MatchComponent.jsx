import React, { Component } from "react";
import TimelineComponent from "./TimelineComponent";
import HeaderComponent from "./HeaderComponent";
import TeamService from "../services/TeamService";
import UserService from "../services/UserService";
import pitch from "./images/pitch.jpg";
import MatchService from "../services/MatchService";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
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

class MatchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      teamOfUser: [],
      preMatchTeamOfUser: [],
      rankings: [],
      match: [],
      timeline: [],
      currentMatch: 0,
      result: [],
      selectedUser: [],
      currentUser: [],
      topPlayers: [],
    };

    this.handleCallback = this.handleCallback.bind(this);
    this.refreshPlayers = this.refreshPlayers.bind(this);
    this.refreshRankings = this.refreshRankings.bind(this);
    this.refreshTopPlayers = this.refreshTopPlayers.bind(this);
    this.timeCheck = this.timeCheck.bind(this);
    this.nextMatch = this.nextMatch.bind(this);
    this.currentMatch = this.currentMatch.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.runMatches = this.runMatches.bind(this);
    this.getSelectedUserTeam = this.getSelectedUserTeam.bind(this);
    this.selectIcon = this.selectIcon.bind(this);
    this.getImage = this.getImage.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
    this.matchResults = this.matchResults.bind(this);
  }

  handleCallback(scenario, player, time) {
    TeamService.updatePlayer(this.state.id, scenario, player, time);
    TeamService.getTeamOfUser(this.state.id).then((res) => {
      console.log("Inside function");
      console.log(res.data);
      this.setState({ teamOfUser: res.data[0] });
    });

    this.refreshRankings();
    this.refreshTopPlayers();
  }

  selectIcon(scenario) {
    if (scenario == "Yellow Card") {
      return "#f6ff00";
    } else if (scenario == "Save") {
      return "#141859";
    } else if (scenario == "Sub Off") {
      return "#ff00ff";
    } else if (scenario == "Sub On") {
      return "#00fff6";
    } else if (scenario == "Assist") {
      return "#ff0000";
    } else if (scenario == "Goal") {
      return "#04ef24";
    } else {
      return "#141859";
    }
  }

  timeCheck(time) {
    console.log("Inside time check");

    let newelement = [];
    let currMatch = this.state.currentMatch;
    let see = this.state.match;
    console.log("currMatch = " + currMatch);
    console.log(see);

    {
      this.state.match.map((match) => {
        if (match.time == time && match.matchno == currMatch) {
          this.handleCallback(match.scenario, match.player, match.time);
          newelement = (
            <div>
              <VerticalTimelineElement
                key={match.matchid}
                iconStyle={{
                  background: this.selectIcon(match.scenario),
                  height: "15px",
                  width: "15px",
                  marginTop: "35px",
                }}
                layout={"1-column-left"}
                position="right"
                style={{ marginLeft: "-55px", width: "100%" }}
                contentStyle={{
                  width: "55%",
                  padding: 0,
                  marginTop: "5px",
                  height: "90%",
                  border: "1px black solid",
                }}
              >
                <div>
                  <p>
                    {match.time}' {match.scenario} {match.player}
                  </p>
                </div>
              </VerticalTimelineElement>
            </div>
          );

          this.setState({ timeline: this.state.timeline.concat([newelement]) });
        }
      });
    }
  }

  refreshPlayers() {
    TeamService.getTeamOfUser(this.state.id).then((res) => {
      console.log("Inside function");
      console.log(res.data);
      this.setState({ teamOfUser: res.data[0] });
    });

    this.refreshRankings();
    this.refreshTopPlayers();
  }

  refreshRankings() {
    UserService.getRanking(this.state.id).then((res) => {
      console.log("Inside ranking function");
      console.log(res.data);
      this.setState({ rankings: res.data });
    });

    for (let i = 0; i < this.state.rankings.length; i++) {
      console.log("Id:" + this.state.rankings[i].userid);
      console.log("FirstName:" + this.state.rankings[i].firstName);
      console.log("************************************************");
      console.log("************************************************");
    }
  }

  refreshTopPlayers() {
    TeamService.getTopPlayers().then((res) => {
      console.log("Top Players DATA:");
      console.log(res.data);
      this.setState({ topPlayers: res.data });
    });
  }

  getSelectedUserTeam(id) {
    console.log("Inside get selected user Team id=" + id);

    let functionID = id;

    console.log("2nd get selected user Team id=" + functionID);

    TeamService.getTeamOfUser(functionID).then((res) => {
      console.log("Inside function");
      console.log(res.data);
      this.setState({ teamOfUser: res.data[0] });
    });
  }

  componentDidMount() {
    TeamService.getTeamOfUser(this.state.id).then((res) => {
      console.log("Inside function");
      console.log(res.data);
      this.setState({ preMatchTeamOfUser: res.data[0] });
    });

    TeamService.getTeamOfUser(this.state.id).then((res) => {
      console.log("Inside function");
      console.log(res.data);
      this.setState({ teamOfUser: res.data[0] });
    });

    UserService.getRanking(this.state.id).then((res) => {
      console.log("Inside ranking function");
      console.log(res.data);
      this.setState({ rankings: res.data });
    });

    TeamService.getTopPlayers().then((res) => {
      console.log("Top Players DATA:");
      console.log(res.data);
      this.setState({ topPlayers: res.data });
    });

    UserService.getUser(this.state.id).then((res) => {
      console.log("Inside getUser function");
      console.log(res.data);
      this.setState({ currentUser: res.data }, function () {
        if (this.state.currentUser.matchday == 1) {
          this.setState({ currentMatch: 1 });
        } else if (this.state.currentUser.matchday == 2) {
          this.setState({ currentMatch: 3 });
        } else if (this.state.currentUser.matchday == 3) {
          this.setState({ currentMatch: 5 });
        }
        console.log("STARTING CURR MATCH = " + this.state.currentMatch);
      });
    });

    UserService.getUser(this.state.id).then((res) => {
      console.log("Inside getUser function");
      console.log(res.data);
      this.setState({ currentUser: res.data }, function () {
        if (this.state.currentUser.matchday == 1) {
          this.setState({ currentMatch: 1 });
        } else if (this.state.currentUser.matchday == 2) {
          this.setState({ currentMatch: 3 });
        } else if (this.state.currentUser.matchday == 3) {
          this.setState({ currentMatch: 5 });
        }
        console.log("STARTING CURR MATCH = " + this.state.currentMatch);
      });
    });

    MatchService.getMatches().then((res) => {
      console.log("Calling service");
      console.log(res.data);
      this.setState({ match: res.data });
    });
  }

  runMatches() {
    let newelement = [];
    // for(let i =1; i < 2; i++)
    // {
    //   if(i == 2)
    //   {
    //     this.setState({currentMatch : 2});
    //     this.setState({match: []});
    //   }
    newelement = (
      <div>
        {this.runTimer()}

        <div className="container">
          <div className="row">
            <VerticalTimeline>{this.state.timeline}</VerticalTimeline>
          </div>
        </div>
      </div>
    );

    // this.setState({result: newelement});
    // }
    return newelement;
  }

  runTimer() {
    console.log("Inside run timer");
    return (
      <div className="timer-Container-Timeline">
        <TimelineComponent
          matchDone={this.nextMatch}
          checkTime={this.timeCheck}
        />

        {this.currentMatch()}
      </div>
    );
  }

  nextMatch() {
    console.log("in next match");

    if (this.state.currentMatch == 1) {
      this.setState({ currentMatch: 2 }, function () {
        this.setState({ timeline: [] });
      });
    } else if (this.state.currentMatch == 3) {
      this.setState({ currentMatch: 4 }, function () {
        this.setState({ timeline: [] });
      });
    } else if (this.state.currentMatch == 5) {
      this.setState({ currentMatch: 6 }, function () {
        this.setState({ timeline: [] });
      });
    }
  }

  currentMatch() {
    if (this.state.currentMatch == 1) {
      return (
        <div>
          <h6 style={{ marginLeft: "40px" }}>Senegal vs Tanzania</h6>
          <p
            id="end"
            style={{ display: "none", marginTop: "-10px", marginLeft: "60px" }}
          >
            FULL TIME!
          </p>
        </div>
      );
    } else if (this.state.currentMatch == 2) {
      return (
        <div>
          <h6 style={{ marginLeft: "40px" }}>Algeria vs Kenya</h6>
          <p
            id="end"
            style={{ display: "none", marginTop: "-10px", marginLeft: "60px" }}
          >
            FULL TIME!
          </p>
        </div>
      );
    } else if (this.state.currentMatch == 3) {
      return (
        <div>
          <h6 style={{ marginLeft: "40px" }}>Senegal vs Algeria</h6>
          <p
            id="end"
            style={{ display: "none", marginTop: "-10px", marginLeft: "60px" }}
          >
            FULL TIME!
          </p>
        </div>
      );
    } else if (this.state.currentMatch == 4) {
      return (
        <div>
          <h6 style={{ marginLeft: "40px" }}>Kenya vs Tanzania</h6>
          <p
            id="end"
            style={{ display: "none", marginTop: "-10px", marginLeft: "60px" }}
          >
            FULL TIME!
          </p>
        </div>
      );
    } else if (this.state.currentMatch == 5) {
      return (
        <div>
          <h6 style={{ marginLeft: "40px" }}>Kenya vs Senegal</h6>
          <p
            id="end"
            style={{ display: "none", marginTop: "-10px", marginLeft: "60px" }}
          >
            FULL TIME!
          </p>
        </div>
      );
    } else if (this.state.currentMatch == 6) {
      return (
        <div>
          <h6 style={{ marginLeft: "40px" }}>Tanazania vs Algeria</h6>
          <p
            id="end"
            style={{ display: "none", marginTop: "-10px", marginLeft: "60px" }}
          >
            FULL TIME!
          </p>
        </div>
      );
    }
  }

  matchResults() {
    if (this.state.currentUser.matchday == 1) {
      return (
        <div>
          <div className="fixture">
            <div className="match">
              <div className="match-detail team">
                <p>Senegal </p>
              </div>
              <div className="match-detail" style={{ marginLeft: "40px" }}>
                {" "}
                <img className="flag" src={senegal}></img>
              </div>
              <div className="match-detail team">
                <p className="match-time"> 2 - 0 </p>
              </div>
              <div className="match-detail">
                {" "}
                <img className="flag" src={tanzania}></img>
              </div>
              <div className="match-detail team">
                <p>Tanzania </p>
              </div>
              <div className="match-detail match-button">
                <button data-toggle="modal" data-target="#senTz">
                  Watch Higlights{" "}
                </button>
              </div>
            </div>
            <hr className="line"></hr>
          </div>

          <div className="fixture">
            <div className="match">
              <div className="match-detail team">
                <p>Algeria </p>
              </div>
              <div className="match-detail" style={{ marginLeft: "50px" }}>
                {" "}
                <img className="flag" src={algeria}></img>
              </div>
              <div className="match-detail team">
                <p className="match-time"> 2 - 0</p>
              </div>
              <div className="match-detail">
                {" "}
                <img className="flag" src={kenya}></img>
              </div>
              <div className="match-detail team">
                <p>Kenya </p>
              </div>
              <div
                className="match-detail match-button"
                style={{ marginLeft: "42px" }}
              >
                <button data-toggle="modal" data-target="#algKe">
                  Watch Higlights{" "}
                </button>
              </div>
            </div>
            <hr className="line"></hr>
          </div>

          {/* <!-- Modal --> */}
          <div id="senTz" class="modal fade" role="dialog">
            <div
              class="modal-dialog"
              style={{ width: "600px", height: "350px" }}
            >
              {/* <!-- Modal content--> */}
              <div
                class="modal-content"
                style={{ width: "560px", height: "316px" }}
              >
                <div class="modal-header">
                  <h4 class="modal-title">Senegal Vs Tanazania</h4>
                </div>

                <div>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/G6SZm6gfpo4"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Modal --> */}
          <div id="algKe" class="modal fade" role="dialog">
            <div
              class="modal-dialog"
              style={{ width: "600px", height: "350px" }}
            >
              {/* <!-- Modal content--> */}
              <div
                class="modal-content"
                style={{ width: "560px", height: "316px" }}
              >
                <div class="modal-header">
                  <h4 class="modal-title">Algeria Vs Kenya</h4>
                </div>

                <div>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/SGJ0IqN3y4E"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.currentUser.matchday == 2) {
      return (
        <div>
          <div className="fixture">
            <div className="match">
              <div className="match-detail team">
                <p>Senegal </p>
              </div>
              <div className="match-detail" style={{ marginLeft: "40px" }}>
                {" "}
                <img className="flag" src={senegal}></img>
              </div>
              <div className="match-detail team">
                <p className="match-time"> 0 - 1 </p>
              </div>
              <div className="match-detail">
                {" "}
                <img className="flag" src={algeria}></img>
              </div>
              <div className="match-detail team">
                <p>Algeria </p>
              </div>
              <div className="match-detail match-button">
                <button data-toggle="modal" data-target="#senTz">
                  Watch Higlights{" "}
                </button>
              </div>
            </div>
            <hr className="line"></hr>
          </div>

          <div className="fixture">
            <div className="match">
              <div className="match-detail team">
                <p>Kenya </p>
              </div>
              <div className="match-detail" style={{ marginLeft: "35px" }}>
                {" "}
                <img className="flag" src={kenya}></img>
              </div>
              <div className="match-detail team">
                <p className="match-time"> 3 - 2</p>
              </div>
              <div className="match-detail">
                {" "}
                <img className="flag" src={tanzania}></img>
              </div>
              <div className="match-detail team">
                <p>Tanzania </p>
              </div>
              <div
                className="match-detail match-button"
                style={{ marginLeft: "42px" }}
              >
                <button data-toggle="modal" data-target="#algKe">
                  Watch Higlights{" "}
                </button>
              </div>
            </div>
            <hr className="line"></hr>
          </div>

          {/* <!-- Modal --> */}
          <div id="senTz" class="modal fade" role="dialog">
            <div
              class="modal-dialog"
              style={{ width: "600px", height: "350px" }}
            >
              {/* <!-- Modal content--> */}
              <div
                class="modal-content"
                style={{ width: "560px", height: "316px" }}
              >
                <div class="modal-header">
                  <h4 class="modal-title">Senegal Vs Algeria</h4>
                </div>

                <div>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/80nwVnvaI8A"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Modal --> */}
          <div id="algKe" class="modal fade" role="dialog">
            <div
              class="modal-dialog"
              style={{ width: "600px", height: "350px" }}
            >
              {/* <!-- Modal content--> */}
              <div
                class="modal-content"
                style={{ width: "560px", height: "316px" }}
              >
                <div class="modal-header">
                  <h4 class="modal-title">Kenya Vs Tanzania</h4>
                </div>

                <div>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/UEhCEd3Y7uM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.currentUser.matchday == 3) {
      return (
        <div>
          <div className="fixture">
            <div className="match">
              <div className="match-detail team">
                <p>Kenya </p>
              </div>
              <div className="match-detail" style={{ marginLeft: "40px" }}>
                {" "}
                <img className="flag" src={kenya}></img>
              </div>
              <div className="match-detail team">
                <p className="match-time"> 0 - 3 </p>
              </div>
              <div className="match-detail">
                {" "}
                <img className="flag" src={senegal}></img>
              </div>
              <div className="match-detail team">
                <p>Senegal </p>
              </div>
              <div className="match-detail match-button">
                <button data-toggle="modal" data-target="#senTz">
                  Watch Higlights{" "}
                </button>
              </div>
            </div>
            <hr className="line"></hr>
          </div>

          <div className="fixture">
            <div className="match">
              <div className="match-detail team">
                <p>Tanzania </p>
              </div>
              <div className="match-detail" style={{ marginLeft: "20px" }}>
                {" "}
                <img className="flag" src={tanzania}></img>
              </div>
              <div className="match-detail team">
                <p className="match-time"> 0 - 3</p>
              </div>
              <div className="match-detail">
                {" "}
                <img className="flag" src={algeria}></img>
              </div>
              <div className="match-detail team">
                <p>Algeria </p>
              </div>
              <div
                className="match-detail match-button"
                style={{ marginLeft: "42px" }}
              >
                <button data-toggle="modal" data-target="#algKe">
                  Watch Higlights{" "}
                </button>
              </div>
            </div>
            <hr className="line"></hr>
          </div>

          {/* <!-- Modal --> */}
          <div id="senTz" class="modal fade" role="dialog">
            <div
              class="modal-dialog"
              style={{ width: "600px", height: "350px" }}
            >
              {/* <!-- Modal content--> */}
              <div
                class="modal-content"
                style={{ width: "560px", height: "316px" }}
              >
                <div class="modal-header">
                  <h4 class="modal-title">Kenya Vs Senegal</h4>
                </div>

                <div>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/N4-hhWT4oMg"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Modal --> */}
          <div id="algKe" class="modal fade" role="dialog">
            <div
              class="modal-dialog"
              style={{ width: "600px", height: "350px" }}
            >
              {/* <!-- Modal content--> */}
              <div
                class="modal-content"
                style={{ width: "560px", height: "316px" }}
              >
                <div class="modal-header">
                  <h4 class="modal-title">Tanzania Vs Algeria</h4>
                </div>

                <div>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/-nCJPb6rQYM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  viewUserTeam(id, getID) {
    this.props.history.push(`/ranking/${id}/${getID}`);
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

  calculatePoints(currentPoints, index) {
    console.log("CALCULATE POINTS");
    console.log(currentPoints);
    console.log(index);
    console.log(this.state.preMatchTeamOfUser);
    let preMatchTeam = this.state.preMatchTeamOfUser[index].points;
    let points = currentPoints - preMatchTeam;

    return points;
  }

  render() {
    return (
      <div>
        <div className="banner"></div>

        <div className="container-xl">
          <div className="row">
            
            <div class="col-xl-2">
              

              {this.runMatches()}
              
            </div>

            <div className="col-xl-7">
              {/* <!-- Button trigger modal --> */}

              <div className="info">
                <h2 className="text-center">My Team</h2>
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

                  <div id="GK">
                    {this.state.teamOfUser.map((user, index) => {
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

                            <div className="player">
                              <p>{user.name}</p>
                              <p
                                style={{
                                  marginLeft: "20px",
                                  marginTop: "-18px",
                                }}
                              >
                                <small>
                                  {this.calculatePoints(user.points, index)}
                                </small>
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return <div></div>;
                    })}
                  </div>

                  <div id="DEF">
                    {this.state.teamOfUser.map((user, index) => {
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
                                <small>
                                  {this.calculatePoints(user.points, index)}
                                </small>
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return <div></div>;
                    })}
                  </div>

                  <div id="MID">
                    {this.state.teamOfUser.map((user, index) => {
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
                                <small>
                                  {this.calculatePoints(user.points, index)}
                                </small>
                              </p>
                            </div>
                          </div>
                        );
                      }

                      return <div></div>;
                    })}
                  </div>

                  <div id="FWD">
                    {this.state.teamOfUser.map((user, index) => {
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
                                <small>
                                  {this.calculatePoints(user.points, index)}
                                </small>
                              </p>
                            </div>
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
                    <h2>Results</h2>
                  </div>

                  {this.matchResults()}
                </div>
              </div>
            </div>

            <div className="col-xl-3">
              <h2 className="text-center">Rankings</h2>

              <div className="row">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Position</th>
                      <th>User ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Points</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.rankings.map((user, index) => (
                      <tr
                        key={user.userid}
                        onClick={() =>
                          this.viewUserTeam(this.state.id, user.userID)
                        }
                      >
                        <td>{index + 1} </td>
                        <td>{user.userID} </td>
                        <td>{user.firstName}</td>
                        <td> {user.lastName}</td>
                        <td> {user.points} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3> Top Players </h3>

              <div className="row">
                <div style={{ overflow: "auto" }}>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchComponent;
