import React, { Component } from 'react';
import 'antd/dist/antd.css'
import {Button} from 'antd'
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
                <Button onClick={this.handleClick}>click</Button>
                <p>{this.state.count}</p>
                <Child name={this.state.count}></Child>
            </div>
        );
    }
}

export default Life;