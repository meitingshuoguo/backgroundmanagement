import React, { Component } from 'react'
import {HashRouter, Route, Link, Switch } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Topics from './Topics'
export default class Index extends Component {
  render() {
    return (
      <div>
        <HashRouter>
                <div>
                    <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                    </ul>

                    <hr />

                    <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/topics" component={Topics} />
                    </Switch>
                </div>
        </HashRouter>
      </div>
    )
  }
}
