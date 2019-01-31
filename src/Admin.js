import React, {Component} from 'react'
import {Row,Col} from 'antd'
import Header from './components/Header';
import Footer from './components/Footer';
import Navleft from './components/NavLeft';
import Home from './pages/home'
import './style/common.less'


export default class Admin extends Component{
    render(){
        return (
            <div>
                <Row className="container">
                    <Col span={3} className="nav-left">
                        <Navleft/>
                    </Col>
                    <Col span={21} className="main">
                        <Header/>
                        <Row className="content">
                            <Col span={24}>
                            <Home/>
                            </Col>
                        </Row>
                        <Footer/>
                    </Col>  
                </Row>
            </div>
        )
    }
}