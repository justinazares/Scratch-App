import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './App.css';
import Routes from './Routes';

// AWS
import { Auth } from 'aws-amplify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAutheticating: true
    };
  }

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
      }
    } catch (e) {
      if (e !== 'No Current User') {
        alert(e);
      }
    }

    this.setState({ isAutheticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = event => {
    this.userHasAuthenticated(false);
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAutheticating && (
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Scratch</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                {this.state.isAuthenticated ? (
                  <NavItem onClick={this.handleLogout}>Log Out</NavItem>
                ) : (
                  <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Sign Up</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Log In</NavItem>
                    </LinkContainer>
                  </Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

export default App;
