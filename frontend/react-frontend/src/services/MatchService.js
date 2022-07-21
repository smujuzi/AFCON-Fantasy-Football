import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v1/";

class MatchService {
  

  getMatches() {
    console.log("Inside matches method");
    return axios.get("http://localhost:8080/api/v1/matches/");
  }

}

export default new MatchService();
