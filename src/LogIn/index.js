import React, { Component } from "react";
import LogInView from "./LogInView";
import { withRouter } from "react-router";
import firebaseApp from "../firebaseApp";

class LogInContainer extends Component {
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const user = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/home");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <LogInView onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(LogInContainer);
