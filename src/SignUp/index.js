import React, { Component } from "react";
import SignUpView from "./SignUpView";
import { withRouter } from "react-router";
import firebaseApp from "../firebaseApp";

class SignUpContainer extends Component {
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const user = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/home");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <SignUpView onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(SignUpContainer);
