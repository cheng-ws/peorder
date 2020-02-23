import React, { Component } from 'react'
import { Card,List,Button,Tag} from 'antd'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getorderplacename} from '../../actions/order'

const mapState = state=>({
    list:state.order.list
})
@withRouter
@connect(mapState,{getorderplacename})
class Order extends Component {
       
    handlePlaceDetail=(item)=>{
         
        // window.location.href=`/placesearch/${item.key}`;
        // this.props.history.push(`/placesearch/${item.key}`);
        this.props.history.push({pathname:`/admin/order/${item.place_name}`,state:{title:item.place_title}})
    }
    componentDidMount() {
        this.props.getorderplacename()
    }
    render() {
        const list = this.props.list
        return (
            <div>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item>
                            <Card title={item.place_title}>
                                <Tag>预约时，请先阅读公告！</Tag>
                                <Button type="primary" size="small" style={{float:'right'}} onClick={()=>this.handlePlaceDetail(item)}>详情</Button>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default Order
