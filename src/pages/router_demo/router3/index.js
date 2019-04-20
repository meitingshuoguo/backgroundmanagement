import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Index extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/about"> About </Link>
          </li>
          <li>
            <Link to="/topics"> Topics </Link>
          </li>
        </ul>
        <hr /> {this.props.children}
      </div>
    );
  }
}
