import React , {Component} from 'react'
import { Row,Col } from 'antd';
import './index.less'
import dayjs from 'dayjs'
import Axios from '../../axios'
export default class Header extends Component {
    componentWillMount(){
        this.setState({
            userName:'mtsg'
        })

        setInterval(() => {
            let sysTime =  dayjs().format('YYYY-MM-DD HH:mm:ss')
            this.setState({
                sysTime
            })
        }, 1000);

        this.getWeatherData()
    }

    getWeatherData(){
        Axios.jsonp({
            url:'http://api.jirengu.com/getWeather.php'
        }).then((res)=>{
            if(res.status === 'success'){
                let data = res.results[0]
                this.setState({
                    pm25: data.pm25,
                    dayPictureUrl: data.weather_data[0].dayPictureUrl,
                    weather: data.weather_data[0].weather
                })
            }
             console.log(res);
        })
    }
    render (){
        return(
            <div className='header'>
                <Row className='header-top'>
                    <Col span={24}>
                        <span>welcome，{this.state.userName}</span>    
                        <a href="quit">退出</a>
                    </Col>
                </Row>
                <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>
                        首页
                    </Col>
                    <Col span={20} className='live-info'>
                        <span className='date'>{this.state.sysTime}</span>
                        <span className='weather'>{this.state.weather}
                            <img src={this.state.dayPictureUrl} alt=""/>
                             PM2.5<span className='colon'>:</span>{this.state.pm25}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}