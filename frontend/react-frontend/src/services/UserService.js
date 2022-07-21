import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v1/";

class UserService {
  registerUser(user) {
    console.log("Inside register method");
    return axios.post("http://localhost:8080/api/v1/register", user);
  }

  loginUser(emailAddress, password) {
    console.log("Inside login method");
    return axios.get(
      "http://localhost:8080/api/v1/login/" + emailAddress + "/" + password
    );
  }

 getRanking(id) {
    console.log("Inside ranking method");
    return axios.get(
      "http://localhost:8080/api/v1//match/" + id
    );
  } 

  getUser(id) {
    console.log("Inside getUser method");
    return axios.get(
      "http://localhost:8080/api/v1//user/" + id
    );
  }

  updateMatchday() {
    console.log("Inside matchday method");
    return axios.get(
      "http://localhost:8080/api/v1/updateMatchday"
    );
  }

  
}

export default new UserService();
