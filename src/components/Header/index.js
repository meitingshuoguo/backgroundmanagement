import React , {Component} from 'react'
import { Row,Col } from 'antd';

export default class Header extends Component {
    render (){
        return(
            <div>
                <Row>
                    <Col span={24}>header</Col>
                </Row>
            </div>
        )
    }
}