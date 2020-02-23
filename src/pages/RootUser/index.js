import React, { Component,Fragment } from 'react'
import { Card, Form, Input, Button, Table, Tag, message,Divider,Modal } from 'antd'
import { connect } from 'react-redux'
import {rootuserpagesearch,rootuserdel} from '../../actions/rootuser'
import RootUserEdit from './edit'
import RootUserAdd from './add'
const FormItem = Form.Item;
const { confirm } = Modal;
const mapState=state=>({
    list:state.rootuser.list,
    total:state.rootuser.total
})
@connect(mapState,{rootuserpagesearch,rootuserdel})

class RootUser extends Component {
    state={
        oldcurrent:'',
        oldusername:'',
        username:'',
        list:[],
        current:1,
        pageSize:10,
        isSearch:false,
        isEdit:false,
        dataEdit:{},
        isAdd:false,
        dataAdd:{}
    }
    
    columns = [
        {
            title: '序号',
            dataIndex:"id",
            align:'center',
            render:(text,record,index)=>{
                 return (this.state.current-1)*this.state.pageSize+index+1
            }
        },
        {
            title: '用户名称',
            dataIndex: 'username',
            align:'center'
        },
        {
            title: '性别',
            dataIndex:'sex',
            align:'center',
            render:(text)=>{
                return text==="0"?<Tag color="geekblue">男</Tag>:<Tag color="pink">女</Tag>
            }
        },
        {
            title: '个人签名',
            dataIndex:'autograph',
            align:'center',
            render:(text)=>{
                return text?text:<span>无</span>
            }
        },
        {
            title: '权限',
            dataIndex:'role',
            align:'center',
            render: (text) => {
                return  text==="1"?<Tag color="#2db7f5">普通用户</Tag>:<Tag color="#108ee9">管理员</Tag>
            }
        },
        {
            title: '操作',
            align:'center',
            render: (text, record) => {
                   return <Fragment> 
                           <Button icon="edit" style={{border:0,color:'#2db7f5'}} onClick={()=>this.handleEdit(record)}></Button> 
                           <Divider type="vertical" /> 
                           <Button icon="delete" style={{border:0,color:'#eb2f96'}} onClick={()=>this.handleDel(record)}></Button> 
                         </Fragment>
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
            pageSize: 10,
            username:""
         }
        this.props.rootuserpagesearch(params)
    }
    //取消预约
     handleCancle = (record) => {
    //     const params = {
    //         id:record.id
    //     }
    //    this.props.myOrderCancel(params)
    //    .then((res) => {
    //         if (res.data.err === 0) {
    //             this.handleMyPerson();
    //             message.success('取消成功，欢迎再次预约！')
    //         } else {
    //             this.handleMyPerson();
    //             message.error('取消失败，请重试！')
    //         }
    //     })
    //     .catch(()=>{
    //         this.handleMyPerson();
    //         message.error('取消失败，请重试！')
    //     })
       
     }
    //编辑用户信息
    handleEdit=(record)=>{
        this.setState({
            dataEdit:record,
            isEdit:true
        })
    }
    //删除用户
    handleDel=(record)=>{
        let _this = this
        confirm({
            title: `您确定要添加 ${record.username} 这个用户数据吗？`,
            content: `删除该用户的信息`,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                const params = {
                    id: record.id
                }
                _this.props.rootuserdel(params)
                    .then((res) => {
                        if (res.data.err === 0) {
                            _this.handleMyPerson();
                            message.success('删除成功，欢迎再次预约！')
                        } else {
                            _this.handleMyPerson();
                            message.error('删除失败，请重试！')
                        }
                    })
                    .catch(() => {
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
        const { username,current,pageSize}=this.state;
        const params = {
            page:current,
            pageSize,
            username
        }
        this.props.rootuserpagesearch(params)
        this.setState({  
            oldusername:username,
            oldcurrent:current
        })
    }
     
    //获取用户名称
    onUserName=(e)=>{
       const {username}=this.state
       this.setState({
           oldusername:username,
           username:e.target.value
       })
        
    }
    //页码改变
    handlePageChange=(page,pageSize)=>{
        const {username, oldusername,current}=this.state
             this.setState({
                   current: page?page:current,
                   pageSize: pageSize?pageSize:this.state.pageSize
               }, () => {
                        const params = {
                           page: this.state.current,
                           pageSize: this.state.pageSize,
                        }
                        console.log(params)
                   if(oldusername===username) {
                        const data = {
                             ...params,
                             username:username
                        }
                        this.props.rootuserpagesearch(data)
                   }else {
                        const data ={
                            ...params,
                            username:oldusername
                        }
                        this.props.rootuserpagesearch(data)
                   }   
               })     
    }
    //pageSize每页条数改变
    handleShowSizeChange=(current,size)=>{
        const {username,oldusername}=this.state
           this.setState({
               current:1,
               pageSize:size
           },()=>{
                   const params = {
                       page: this.state.current,
                       pageSize: this.state.pageSize,
                   }
                   if (oldusername === username) {
                       const data = {
                           ...params,
                           username: username
                       }
                       this.props.rootuserpagesearch(data)
                   } else {
                       const data = {
                           ...params,
                           username: oldusername
                       }
                       this.props.rootuserpagesearch(data)
                   }
           })
    }
    //处理用户编辑的取消
    handleEditCancel=(params)=>{
        this.setState({
            isEdit:params
        })
    }
    //处理用户编辑的确定
    handleEditOnOk=(params)=>{
        this.setState({
            isEdit:params,
            dataEdit:{}
        })
        this.handlePageChange()
    }
    //添加用户
    handleAddUser=()=>{
        this.setState({
            isAdd:true,
            dataAdd:{
                username:"",
                userpassword:"",
                sex:"0",
                role:"1",
                autograph:""
            }
        })
    }
    //处理用户添加的取消
    handleAddCancel=(params)=>{
        this.setState({
            isAdd:params,
            dataAdd:{}
        })
    }
    //处理用户添加的确定
    handleAddOnOk=(params)=>{
        this.setState({
            isAdd:params,
            dataAdd:{}
        })
        this.handleMyPerson()
    }
    render() {
        const list = this.props.list.map((item,index)=>({
            ...item,
            key: (this.state.current-1)*this.state.pageSize+index+1
        }))
        const total = this.props.total
        return (
            <div>
                <Card title="用户数据管理">
                    
                    <Form layout="inline" >
                        <FormItem>
                            <Button icon="plus" type="primary" onClick={this.handleAddUser}>添加用户</Button>
                        </FormItem>
                        <FormItem label="用户名称" >
                            <Input type="text" placeholder="请输入用户名" onChange={this.onUserName}/>
                        </FormItem>
                        
                        <FormItem>
                            <Button type="primary" style={{opacity:0.7}} onClick={this.handleSearch}>查询</Button>
                        </FormItem>
                    </Form>

                </Card>
                <div>
                    <Table
                        rowKey="id"
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
                            pageSizeOptions:["10","20","30"]
                        }} 
                    />
                </div>
                <RootUserAdd isAdd={this.state.isAdd}  dataAdd={this.state.dataAdd} handleAddCancel={this.handleAddCancel} handleAddOnOk={this.handleAddOnOk}/>
                
                <RootUserEdit isEdit={this.state.isEdit}  dataEdit={this.state.dataEdit} handleEditCancel={this.handleEditCancel} handleEditOnOk={this.handleEditOnOk}/>
            </div>
        )
    }
}

export default RootUser
