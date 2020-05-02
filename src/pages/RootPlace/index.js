import React, { Component,Fragment} from 'react'
import { Card, Form, Button, Tag, DatePicker, message,Select,List,Avatar,Modal } from 'antd'
import { connect } from 'react-redux'
import {getorderplacename} from '../../actions/order'
import {getrootplacedetail,getrootplacedel,getrootplaceaddall,getrootplacedelall} from '../../actions/rootplace'
 
const FormItem = Form.Item;
const { confirm } = Modal;
const {Option} = Select
const mapState=state=>({
    data:state.order.list,
    list:state.rootplace.list,
    username:state.user.username
})
@connect(mapState,{getorderplacename,getrootplacedetail,getrootplacedel,getrootplaceaddall,getrootplacedelall})

class RootPlace extends Component {
    state={
        color:"orange",
        time:'',
        place_title:'',
        place_name:'',
        list:[],
        placeNum: '1号场地'
    }
    
    
    componentDidMount() {
        this.props.getorderplacename()    
    }
    
    //删除单条数据
    handleDel=(item)=>{
        const params = {
            id:item.id
        }
        let _this = this
        confirm({
            title: `您确定要删除-${item.place_name}-这个时间段吗？`,
            content: `${item.time.split(' ')[0]}  ${item.title} `,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                _this.props.getrootplacedel(params)
                .then((res)=>{
                    if(res.data.err===0) {
                        message.success("删除成功！")
                        _this.handleSearch()
                    }else{
                        message.error("删除失败！")
                        _this.handleSearch()
                    }
                }) 
                .catch(()=>{
                    message.error("删除失败")
                    _this.handleSearch()
                })
            },
            onCancel() {
                console.log('取消');
            },
        });
        
    }
    //查询
    handleSearch = () => {
        const {time,place_title,placeNum}=this.state;
        if(time===""||place_title===""){
            message.warning("请先选择查询条件")
        }else{
            const params = {
                time,
                place_title,
                placeNum
            }
            this.props.getrootplacedetail(params)
            let settime=setTimeout(()=>{
              if(this.props.list.length===0){
                message.warning("暂无该数据")
                clearTimeout(settime)
              }  
            },1000)
        }
        
    }
    //获取所预约场地时间
    onTimeChange=(date,dateString)=>{
       this.setState({
           time: dateString
       })
    }
    //获取场地名称
    handleSelectChange=(value,option)=>{  
       this.setState({
           place_name:value,
           place_title:option.props.children
       })
    }
    //获取场地号
    onSelectChange = (val) => {
        this.setState({
            placeNum: val,
        })
    }
    //全部删除
    handleDelAll=()=>{
        const { time, place_title,place_name,placeNum } = this.state;
        if (time === "" || place_title === "") {
            message.warning("请先选择要全部删除的预约数据条件")
        } else {
            const params = {
                time,
                place_title,
                place_name,
                placeNum
            }
            let _this = this
            confirm({
                title: `您确定要删除-${place_title}-这个场地的预约数据吗？`,
                content: `预约数据时间为：${time}`,
                okText: '确认',
                cancelText: '取消',
                onOk() {
                        _this.props.getrootplacedelall(params)
                        .then((res) => {
                            if (res.data.err === 0) {
                                _this.handleSearch() 
                                message.success("删除成功,请继续操作")
                            } else {
                                if(res.data.err===-1&&res.data.data===0){
                                     message.warning("删除失败,该数据不存在！")
                                     _this.handleSearch()
                                }else{
                                    message.warning("删除失败,请刷新重试")
                                    _this.handleSearch()
                                }
                               
                            }
                        })
                        .catch(() => {
                            message.error("删除失败，请刷新重试")
                            _this.handleSearch()
                        })
                },
                onCancel() {
                    console.log('取消');
                },
            });
        }
    }
    //整体添加
    handleAddAll=()=>{
        const { time, place_title,place_name,placeNum } = this.state;
        if (time === "" || place_title === "") {
            message.warning("请先选择添加的预约条件")
        } else {
            const params = {
                time,
                place_title,
                place_name,
                placeNum
            }
            let _this = this
            confirm({
                title: `您确定要添加-${place_title}-这个场地的预约数据吗？`,
                content: `可预约时间为：${time}`,
                okText: '确认',
                cancelText: '取消',
                onOk() {
                        _this.props.getrootplaceaddall(params)
                        .then((res) => {
                            if (res.data.err === 0) {
                                message.success("添加成功！")
                                _this.handleSearch()
                            } else {
                                if(res.data.err===-1&&res.data.data===1){
                                     message.warning("添加失败,数据已存在！")
                                     _this.handleSearch()
                                }else{
                                    message.warning("添加失败")
                                    _this.handleSearch()
                                }
                               
                            }
                        })
                        .catch(() => {
                            message.error("新建失败")
                            _this.handleSearch()
                        })
                },
                onCancel() {
                    console.log('取消');
                },
            });
        }  
    }
    
    render() {
         
        const list = this.props.list?this.props.list:this.state.list
        const data = this.props.data
         
        return (
            <div>
                <Card title="预约数据管理">
                    <Form layout="inline" >
                    <FormItem label="场地号">
                        <Select defaultValue="1号场地" onChange={this.onSelectChange}>
                            <Select.Option value="1号场地">1号场地</Select.Option>
                            <Select.Option value="2号场地">2号场地</Select.Option>
                            <Select.Option value="3号场地">3号场地</Select.Option>
                        </Select>
                    </FormItem>
                        <FormItem label="场地名称" >
                            <Select placeholder="请选择场地名称" style={{ width: 150 }} onChange={this.handleSelectChange}>
                                {
                                     data ? data.map((item)=>{
                                        return <Option value={item.place_name} key={item.place_name}>{item.place_title}</Option>
                                    }):""
                                }
                                 
                            </Select>
                        </FormItem>
                        <FormItem label="所预约场地时间" >
                            <DatePicker placeholder="请选择日期" format="YYYY-MM-DD" onChange={this.onTimeChange} />
                        </FormItem>
                        <br/>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSearch}>查询</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" icon="plus" onClick={this.handleAddAll}>添加可预约数据</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="danger" icon="delete" onClick={this.handleDelAll}>全部删除所选数据</Button>
                        </FormItem>
                    </Form>

                </Card>
                <div>
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
                                        title={<Fragment><Tag>{item.place_name}</Tag><Tag>{item.time?item.time.split(' ')[0]:""}</Tag></Fragment>}
                                        description={item.title}
                                    />    
                                  }>
                                {
                                   <Fragment>
                                         <Tag color="geekblue">{item.description}</Tag>
                                         <Button type="danger" size="small" onClick={()=>this.handleDel(item)}>删除</Button>
                                   </Fragment>
                                 

                                }
                            </Card>
                        </List.Item>                 
                    )}
                /> 
                 

                </div>
            </div>
        )
    }
}

export default RootPlace
