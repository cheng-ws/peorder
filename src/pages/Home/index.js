import React,{Component} from 'react'
import './index.less'
import bgc from './niao.jpg'
class Home extends Component {
    render() {
        return (
            <div className="home-first">
                <img src={bgc} width="100%" alt="体育馆预约"/>
                <span className="home-title">强身健体,运动无限</span>
                <span className="home-welcome">欢迎进入体育馆预约</span>
            </div>
        )
    }
}
export default Home