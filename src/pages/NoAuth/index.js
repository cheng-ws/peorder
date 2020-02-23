import React, {Component} from 'react'
import {Typography} from 'antd'
const {Title} =Typography
class NoAuth extends Component {
    render() {
        return(
             <div style={{position:'relative',width:'100%',height:'100%'}}>
                 <Title style={{position:'absolute',left: '45%',top:'50%',transform:'translate(-40%,-50%)'}}>
                     您的权限不够,请向管理员申请权限
                </Title>
             </div>
        )
    }
}
export default NoAuth