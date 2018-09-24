
import React, { Component } from "react";
import { connect } from "react-redux";
// import { signIn } from "../actions";
// import PropTypes from "prop-types";

class About extends Component {


  render() {
    return (
      <div className="container">
      <div className="row">

        <div className="col s12">
          <h2>About</h2>
          <p>
            Bacon ipsum dolor amet tail landjaeger corned beef chuck hamburger,
            salami strip steak. Pancetta kielbasa ham hock andouille. Tail cupim
            burgdoggen salami bacon jerky shankle strip steak turkey. Drumstick
            shoulder pork loin, filet mignon cupim alcatra tongue jowl. Cupim
            tenderloin rump t-bone. Picanha turducken short loin jowl, landjaeger
            shoulder t-bone buffalo spare ribs salami pastrami tri-tip ground round
            alcatra.
      </p>
        </div>
      </div>
      </div>
    );
  }
}



export default (About);
