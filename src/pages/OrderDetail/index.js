import React, { Component} from 'react' //Fragement
import { List, Avatar, Tag, Button, Modal, Card, Form, DatePicker, Divider, message } from 'antd';
import moment from 'moment'
import { connect } from 'react-redux'
import {getorderplacenamedetail,orderplaceperson} from '../../actions/order'
const { confirm } = Modal;
const FormItem = Form.Item;
const mapState = state=>({
    list:state.order.list,
    username:state.user.username
})
 @connect(mapState,{getorderplacenamedetail,orderplaceperson})
// const TagText = ({ color, text }) => (
//     <span>
//         <Tag color={color} style={{marginLeft: '50px'}} onChange={(color,checked)=>{
//              const username=localStorage.getItem['userName'];
//              console.log(checked,color,username);
//         }}>
//         {text}</Tag>
//     </span>
// );

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            color: 'orange', 
            time: moment().format('YYYY-MM-DD'),          
        };

    }

    componentDidMount() {
        // console.log(this.props.match.params.placeName);
        //   console.log(this.props.location.state);
        const {location}=this.props;
        let arr = location.pathname.split('/')
        let placeName=arr[3]

        let title;
        if(location.state&&location.state.title){
            title=location.state.title;
            localStorage.setItem('title',title);
        }else{
            title=localStorage.getItem('title');
        }   
        
        this.setState({
            title,
            placeName
        },()=>{
             this.handlePlaces()
        })
       
    }
    handlePlaces = () => {
        const params ={
            time:this.state.time,
            placeName:this.state.placeName
        }
        this.props.getorderplacenamedetail(params)
    }

    handleOrder = (item) => {
        const {orderplaceperson}=this.props;
        let _this = this;
        const params = {
            id:item.id,
            place_person:this.props.username,
            place_time:moment().format('YYYY-MM-DD HH:mm:ss')
        }
         
        confirm({
            title: `您确定要预约${item.title}这个时间段吗？`,
            content: `${item.description}`,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                orderplaceperson(params)
                .then((res)=>{
                    if (res.data.err === 0) {
                        _this.handlePlaces()
                    } else {
                        message.warning('预约失败，请重试')
                        _this.handlePlaces()
                    }
                })
                .catch(()=>{
                    message.warning('预约失败，请重试')
                    _this.handlePlaces()
                })
               
              
            },
            onCancel() {
                console.log('取消');
            },
        });
    }
    handleSearch = () => {
        this.handlePlaces();
    }
    onTimeChange = (date, dateString) => {
        this.setState({
            time: dateString
        })
    }
    render() {
        const list = this.props.list
        const title = localStorage.getItem('title')
        return (
            <Card title={`预约-${title}-场地`}>
                <Form layout="inline" >
                    <FormItem label="日期" >
                       <DatePicker placeholder="请选择日期" format="YYYY-MM-DD" onChange={this.onTimeChange} defaultValue={moment()}  />     
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleSearch}>查询</Button>
                    </FormItem>
                </Form>
                <Divider type="horizontal" />
                
                <List
                    grid={{ gutter: 16, column: 4 }} 
                    dataSource={list}
                    renderItem={item => (
                        <List.Item>                
                            <Card  
                                title={
                                    <Card.Meta
                                       avatar={
                                            <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
                                                 {item.place_id}
                                             </Avatar>
                                             }
                                        title={item.time?item.time.split(' ')[0]:""}
                                        description={item.title}
                                    />    
                                  }>
                                {
                                    item.description
                                }
                                {
                                    item.time<moment().format('YYYY-MM-DD HH:mm:ss')
                                     ?
                                     <Tag color='gray' style={{marginTop:'20px'}} title="已过期，不可预约">已过期，不可预约</Tag>
                                     :
                                        item.status === 1 
                                        ? 
                                        <Tag color="red" style={{ marginTop: '20px' }} title="已被预约">已被预约</Tag> 
                                        : 
                                        <Button type="primary" size="small" style={{ marginTop: '20px' }} title="可预约" onClick={() => this.handleOrder(item)}>可预约</Button>

                                }
                            </Card>
                        </List.Item>                 
                    )}
                /> 
                 
            </Card>               
        )
    }
}

export default OrderDetail



 