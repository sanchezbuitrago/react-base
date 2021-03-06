import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";
import firebaseApp from "../firebaseApp";

import Home from "../Home";
import LogIn from "../LogIn";
import NotFound from "../NotFound"

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
    const { match } = this.props;

    if (loading) {
      return <p>Loading..</p>;
    }

    return (
      <Router>
        <div>
          <Switch>
            <PrivateRoute
                exact
                path={`${match.url}/`}
                component={Home}
                authenticated={true}
            />
            <PrivateRoute
              exact
              path={`${match.url}/home`}
              component={Home}
              authenticated={true}
            />
            <Route exact path={`${match.url}/login`} component={LogIn} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;



