import React, {Component} from 'react'
import {Typography} from 'antd'
import './index.less'
import detail from './message'
const {Title} = Typography
class TypesDetail extends Component {
    render() {
       const url = this.props.location.pathname.split('/')[3]
         const data1 = detail.find(item=>item.name===url)
         let data=data1?data1:{name:'',imgAlt:"",imgUrl:'',des:""}
        return (
            <div className="detail">
                <div className="detail-title">
                    <Title>{data.imgAlt}场地简介</Title>
                </div>
                <div className="detail-img">
                    <img width="500" height="400" src={data.imgUrl} alt={data.imgAlt}/>
                </div>
                <div className="detail-des">
                    <p>历史与简介:</p>
                    <p className="detail-p">  
                        {data.des}
                    </p>
                </div>
            </div>
        )
    }
}
export default TypesDetail