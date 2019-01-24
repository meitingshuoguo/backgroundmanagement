import React, {Component} from 'react'
import {Row,Col} from 'antd'
import Header from './components/Header';
import Footer from './components/Footer';
import Navleft from './components/NavLeft';


export default class Admin extends Component{
    render(){
        return (
            <div>
                <Row>
                    <Col span={3}>
                        <Navleft/>
                    </Col>
                    <Col span={21}>
                        <Header/>
                        <Row>
                            <Col span={24}>
                            content
                            </Col>
                        </Row>
                        <Footer/>
                    </Col>  
                </Row>
            </div>
        )
    }
}