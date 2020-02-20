import React, { Component } from 'react'
import { Card } from 'antd'
import {withRouter} from 'react-router-dom'
import yumao from './photos/yumao.jpg'
import lan from './photos/lan.jpg'
import pai from './photos/pai.jpg'
import pingpong from './photos/pingpong.jpg'
import ticao from './photos/ticao.jpg'
import wang from './photos/wang.jpg'
import zu from './photos/zu.jpg'

const {Meta} = Card;

@withRouter
class Types extends Component {
    toDetail = (data) => {
        console.log(this.props)
        this.props.history.push(`/admin/types/${data.path}`)
    }
    renderCard = (list) => { 
        return list.map((item)=> {
             return ( <Card
                hoverable
                bordered
                style={{ width: 200,height: 300,marginBottom:'15px'}}
                cover={<img alt="example" width="100" height="100" src={item.url} onClick={()=>this.toDetail(item)} />}
                key={item.url}
            >
                <Meta title={item.name} description={item.des} />
            </Card>)
         })
        
    }
    render() {
        const list = [
            {
                url: yumao,
                path:'yumao',
                name:"羽毛球",
                des:"我校现有六个羽毛球场地，以供我校师生进行体育运动，愉悦身心，增强体质"
            },
            {
                url: lan,
                path:'lan',
                name:"篮球",
                des:"我校现有六个羽毛球场地，以供我校师生进行体育运动，愉悦身心，增强体质"
            },
            {
                url: pai, 
                path:'pai',
                name:"排球",
                des:"我校现有六个羽毛球场地，以供我校师生进行体育运动，愉悦身心，增强体质"
            },
            {
                url: pingpong,
                path:'pingpong',
                name:"乒乓球",
                des:"我校现有六个羽毛球场地，以供我校师生进行体育运动，愉悦身心，增强体质"
            },
            {
                url: ticao,
                path: 'ticao',
                name:"体操",
                des:"我校现有六个羽毛球场地，以供我校师生进行体育运动，愉悦身心，增强体质"
            },
            {
                url: wang,
                path: 'wang',
                name:"网球",
                des:"我校现有六个羽毛球场地，以供我校师生进行体育运动，愉悦身心，增强体质"
            },
            {
                url: zu,
                path:'zu',
                name:"足球",
                des:"我校现有六个羽毛球场地，以供我校师生进行体育运动，愉悦身心，增强体质"
            }
        ]
        return (
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,25%)'}}>
                {this.renderCard(list)}
            </div>
            
        )
    }
}
export default Types