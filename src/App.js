import React, { Component, Fragment } from "react";

import ToDoList from "./components/ToDoList";
import MapList from "./components/MapList";
import About from "./pages/About";

import requireAuth from "./components/auth/requireAuth";

import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./actions";

import './css/styles.css';

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    console.log(this.props.auth)
    return (
      <BrowserRouter>
        <Fragment>
          <nav>
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">Carpool</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="/about">About</a></li>
                {this.props.auth ? (
                  <li>Welcome back {this.props.auth.displayName}
                    <button
                      onClick={this.props.signOut}
                      id="sign-out-button"
                      className="btn-small"
                    >
                      Log out
          </button>

                  </li>) : (
                    <li>

                      <button
                        onClick={this.props.signIn}
                        className="btn-small"
                      >
                        Sign In
          </button>
                    </li>)}

              </ul>
            </div>
          </nav>

          {/* <Route path="/app" component={requireAuth(ToDoList)} /> */}
          <Route exact path="/" component={MapList} />
          <Route path="/about" component={About} />
        </Fragment>


      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, actions)(App);
