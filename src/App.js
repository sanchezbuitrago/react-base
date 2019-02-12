import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import firebaseApp from "./firebaseApp";

import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import NotFound from "./NotFound"

class App extends Component {
  state = { loading: true, authenticated: false, user: null };

  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
      }
    });
  }

  render() {
    const { authenticated, loading } = this.state;

    if (loading) {
      return <p>Loading..</p>;
    }

    return (
      <Router>
        <div>
          <Switch>
            <PrivateRoute
              exact
              path="/home"
              component={Home}
              authenticated={authenticated}
            />
            <PrivateRoute
              exact
              path="/"
              component={Home}
              authenticated={authenticated}
            />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
