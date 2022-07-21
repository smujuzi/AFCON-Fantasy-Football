import axios from "axios";

const TEAM_API_BASE_URL = "http://localhost:8080/api/v1/";

class TeamService {
  removePlayerFromUserTeam(id, playerid) {
    console.log("Inside team service Remove player method");
    return axios.get(
      "http://localhost:8080/api/v1/home/" + id + "/remove-player/" + playerid
    );
  }

  addPlayerToUserTeam(id, playerid) {
    console.log("Inside team service Add player method");
    return axios.get(
      "http://localhost:8080/api/v1/home/" + id + "/add-player/" + playerid
    );
  }

  getTeamOfUser(id) {
    console.log("Inside getTeamOfUser method");
    console.log(id)
    return axios.get("http://localhost:8080/api/v1/home/" + id);
  }

  updatePlayer(id, scenario, player, time)
  {

  console.log("Inside updatePlayer method");
  return axios.put("http://localhost:8080/api/v1/match/" +id+ "/" +scenario+ "/" +player+ "/" +time);
  }

  getTopScorers() {
    
    return axios.get(TEAM_API_BASE_URL + "topScorers");
  }

  getTopAssists() {
    
    return axios.get(TEAM_API_BASE_URL + "topAssists");
  }

  getTopPlayers() {
    
    return axios.get(TEAM_API_BASE_URL + "topPlayers");
  }





}

export default new TeamService();
