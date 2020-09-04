import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddActivity from "./components/add-activity.component";
import Activity from "./components/activity.component";
import ActivityList from "./components/activities-list.component";

class App extends Component{
  render(){
    return(
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/activities" className="navbar-brand">
              Agenda
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/activities"} className="nav-link">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  [ + ]
                </Link>
              </li>
            </div>
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/activities"]} component={ActivityList}/>
              <Route exact path="/add" component={AddActivity}/>
              <Route path="/activities/:id" component={Activity}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
