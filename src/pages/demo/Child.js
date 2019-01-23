import React, { Component } from 'react'

export default class Child extends Component {
    constructor(props){
        super(props)
        this.state={
            name:''
        }
    }

    componentWillReceiveProps(newProps){
        console.log(newProps);
    }
    componentDidMount(){
        console.log("object");
    }

    render() {
        return (
        <div>
            <p>{this.props.name}</p>
        </div>
        )
    }
}
