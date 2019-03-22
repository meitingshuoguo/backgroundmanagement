import React, { Component } from 'react'
import {HashRouter as Router, Route } from 'react-router-dom'
import Home from './../router1/Home'
import About from './../router1/About'
import Topics from '../router1/Topics'
import Main from './index'
export default class Index extends Component {
  child = (params) => {
      
  }
  render() {
    return (
        <Router>
            <Main>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/topics" component={Topics} />
            </Main>
        </Router>
    )
  }


}
