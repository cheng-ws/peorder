import React, { Component,Fragment } from 'react'
import { Card, Form, Input, Button, Table, Tag, DatePicker, message,Modal,Select } from 'antd'
import { connect } from 'react-redux'
import {myorderpagesearch,myOrderCancel,myOrderDel} from '../../actions/myorder'
import moment from 'moment'
const FormItem = Form.Item;
const {confirm} = Modal;
const mapState=state=>({
    list:state.myorder.list,
    total:state.myorder.total,
    username:state.user.username
})
@connect(mapState,{myorderpagesearch,myOrderCancel,myOrderDel})

class MyOrder extends Component {
    state={
        time:'',
        oldtime:'',
        oldcurrent:'',
        oldplace_name:'',
        place_name:'',
        list:[],
        current:1,
        pageSize:5,
        isSearch:false,
        placeNum: '1号场地'
    }
    
    columns = [
        {
            title: '序号',
            dataIndex: 'key',
            align:'center'
        },
        {
            title: '场地号',
            dataIndex: 'placeNum',
            align: 'center'
        },
        {
            title: '场地名称',
            dataIndex: 'place_name',
            align:'center'
        },
        {
            title: '预约场地-时间段',
            align:'center',
            render: (record) => {
                return `${moment(record.time).format("YYYY-MM-DD")+' '+ record.title}`
            }
        },
        {
            title: '预约时间',
            align:'center',
            render: (record) => {
                return `${moment(record.place_time).format("YYYY-MM-DD HH:mm:ss")}`
            }
        },
        {
            title: '操作',
            
            align:'center',
            render: (text, record) => {

                const time = moment().format('YYYY-MM-DD HH:mm:ss')
                return record.time < time ? 
                <Fragment><Tag color="red"  title="已过期">已过期</Tag><Button type="danger" size="small" title="删除" onClick={()=>this.handleDel(record)}>删除</Button></Fragment>
                : <Button type="primary" size="small"  title="取消预约" onClick={() => this.handleCancle(record)}>取消预约</Button>
            }
        },

    ]
    componentDidMount() {
        this.handleMyPerson();  
    }
    //获取已预约的数据
    handleMyPerson = () => {

        const params = {
            page: 1,
            pageSize: 5,
            place_person: this.props.username,
            time:"",
            place_name:"",
            placeNum: this.state.placeNum,
         }
        this.props.myorderpagesearch(params)
    }
    //几号场地的选择
    onSelectChange = (val) => {
        this.setState({
            placeNum: val,
        })
    }
    //取消预约
    handleCancle = (record) => {
        let _this = this
        confirm({
            title: `您确定要取消 ${record.place_name} 这个预约数据吗？`,
            content: `该预约数据时间段：${moment(record.time).format("YYYY-MM-DD")+' '+ record.title}`,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                const params = {
                    id:record.id
                }
               _this.props.myOrderCancel(params)
               .then((res) => {
                    if (res.data.err === 0) {
                        _this.handleMyPerson();
                        message.success('取消成功，欢迎再次预约！')
                    } else {
                        _this.handleMyPerson();
                        message.error('取消失败，请重试！')
                    }
                })
                .catch(()=>{
                    _this.handleMyPerson();
                    message.error('取消失败，请重试！')
                })
            },
            onCancel() {
                console.log('取消');
            },
        });   
    }
    handleDel=(record)=>{
        let _this = this
        confirm({
            title: `您确定要删除 ${record.place_name} 这个预约数据吗？`,
            content: `该预约数据时间段：${moment(record.time).format("YYYY-MM-DD")+' '+ record.title}`,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                const params = {
                    id:record.id
                }
                _this.props.myOrderDel(params)
                .then((res) => {
                    if (res.data.err === 0) {
                        _this.handleMyPerson();
                        message.success('删除成功，欢迎再次预约！')
                    } else {
                        _this.handleMyPerson();
                        message.error('删除失败，请重试！')
                    }
                })
                .catch(()=>{
                    _this.handleMyPerson();
                    message.error('删除失败，请重试！')
                }) 
            },
            onCancel() {
                console.log('取消');
            },
        });
        
    }
    //查询
    handleSearch = () => {
        const {time,place_name,current,pageSize,placeNum}=this.state;
        const params = {
            page:current,
            pageSize,
            time,
            place_name,
            placeNum,
            place_person:this.props.username
        }
        this.props.myorderpagesearch(params)
        this.setState({
            oldtime:time,
            oldplace_name:place_name,
            oldcurrent:current
        })
    }
    //获取预约场地时间
    onTimeChange=(date,dateString)=>{
        const {time}=this.state
       this.setState({
           oldtime:time,
           time: dateString
       })
    }
    //获取预约场地名称
    onPlaceName=(e)=>{
        const {place_name}=this.state
       this.setState({
           oldplace_name:place_name,
           place_name:e.target.value
       })
        
    }
    //页码改变
    handlePageChange=(page,pageSize)=>{
        const {time,place_name,oldtime,oldplace_name}=this.state
             this.setState({
                   current: page,
                   pageSize
               }, () => {
                        const params = {
                           page: this.state.current,
                           pageSize: this.state.pageSize,
                           place_person: this.props.username
                        }
                   if(oldplace_name===place_name&&oldtime===time) {
                        const data = {
                             ...params,
                             time:time,
                             place_name:place_name
                        }
                        this.props.myorderpagesearch(data)
                   }else {
                        const data ={
                            ...params,
                            time:oldtime,
                            place_name:oldplace_name
                        }
                        this.props.myorderpagesearch(data)
                   }   
               })     
    }
    //pageSize每页条数改变
    handleShowSizeChange=(current,size)=>{
        const {time,place_name,oldtime,oldplace_name}=this.state
           this.setState({
               current:1,
               pageSize:size
           },()=>{
                   const params = {
                       page: this.state.current,
                       pageSize: this.state.pageSize,
                       place_person: this.props.username
                   }
                   if (oldplace_name === place_name && oldtime === time) {
                       const data = {
                           ...params,
                           time: time,
                           place_name: place_name
                       }
                       this.props.myorderpagesearch(data)
                   } else {
                       const data = {
                           ...params,
                           time: oldtime,
                           place_name: oldplace_name
                       }
                       this.props.myorderpagesearch(data)
                   }
           })
    }
    render() {
        const list = this.props.list.map((item,index)=>({
            ...item,
            key:(this.state.current-1)*this.state.pageSize+index+1
        }))
        const total = this.props.total
        console.log(this.state)
        return (
            <div>
                <Card title="我的预约">
                    <Form layout="inline" >
                    <FormItem label="场地号">
                            <Select defaultValue={this.state.placeNum} onChange={this.onSelectChange}>
                                <Select.Option value="1号场地">1号场地</Select.Option>
                                <Select.Option value="2号场地">2号场地</Select.Option>
                                <Select.Option value="3号场地">3号场地</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem label="场地名称" >
                            <Input type="text" placeholder="请输入场地名称" onChange={this.onPlaceName}/>
                        </FormItem>
                        <FormItem label="预约场地-时间段" >
                            <DatePicker placeholder="请选择日期" format="YYYY-MM-DD" onChange={this.onTimeChange} />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSearch}>查询</Button>
                        </FormItem>
                    </Form>

                </Card>
                <div>
                    <Table
                        rowKey={record=>record.id}
                        bordered
                        columns={this.columns}
                        dataSource={list} 
                        pagination={{
                            current:this.state.current,
                            pageSize:this.state.pageSize,
                            total:total,
                            showTotal:total=>`共有${total}条`,
                            onChange:this.handlePageChange,
                            showQuickJumper:true,
                            showSizeChanger:true,
                            onShowSizeChange:this.handleShowSizeChange,
                            pageSizeOptions:["5","10","15"]
                        }} 
                    />

                </div>
            </div>
        )
    }
}

export default MyOrder
