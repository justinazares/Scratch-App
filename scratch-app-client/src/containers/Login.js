import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';

import LoaderButton from '../components/LoaderButton';

// AWS
// import { Auth } from 'aws-amplify';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: ''
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    // AWS - Login to Amazon Cognito
    // try {
    //   await Auth.signIn(this.state.email, this.state.password);
    //   this.props.userHasAuthenticated(true);
    // } catch (e) {
    //   alert(e.message)
    // }
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              autoFocus
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>

          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Log In"
            loadingText="Logging in..."
          />
        </form>
      </div>
    );
  }
}
