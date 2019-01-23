import React, { Component } from 'react';
import Child from './Child';
import './index.less'

class Life extends Component {
    constructor(props){
        super(props)
        this.state = {
            count:10 ,
            name : ''
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        var count = this.state.count
        this.setState({
            count: count+1
        })
    }

    render() {
        return (
            <div className="content">
                <p>react life </p>
                <button onClick={this.handleClick}>click</button>
                <p>{this.state.count}</p>
                <Child name={this.state.count}></Child>
            </div>
        );
    }
}

export default Life;