import logo from "./logo.svg";
import "./App.css";
import pic from './try.jpg';
import pi from './timer.jpg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import CreateEMployeeComponent from "./components/CreateEMployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";
import LoginUserComponent from "./components/LoginUserComponent";
import RegisterUserComponent from "./components/RegisterUserComponent";
import HomeComponent from "./components/HomeComponent";

import TimelineComponent from "./components/TimelineComponent";
import MatchComponent from "./components/MatchComponent";
import testComponent from "./components/testComponent";
import RankingComponent from "./components/RankingComponent";

function App() {
  return (
    <div>
      <Router>
        
        <HeaderComponent />
        <div className="container-xl">
        
          <Switch>
            
            <Route path="/" exact component={LoginUserComponent}></Route>
            <Route path="/register" component={RegisterUserComponent}></Route>
            <Route path="/home/:id" component={HomeComponent}></Route>
            <Route path="/match/:id" component={MatchComponent}></Route>
            <Route path="/ranking/:id/:getID" component={RankingComponent}></Route>
            <Route
              path="/home/:id/add-player/:playerid"
              component={HomeComponent}
            ></Route>
            <Route
              path="/home/:id/remove-player/:playerid"
              component={HomeComponent}
            ></Route>
            
          </Switch>
        </div>

        {/* <FooterComponent /> */}
      </Router>
    </div>
  );
}

export default App;
