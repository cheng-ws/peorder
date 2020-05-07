import React, { Component } from 'react'
import { Form, Modal,Tag,message,Input,Radio } from 'antd'
import { rootuseradd } from '../../actions/rootuser'
import {connect} from 'react-redux'
 
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 20 }
}
const mapState=state=>({  
})
@Form.create()
@connect(mapState, {rootuseradd})
class RootUserAdd extends Component {
    handleOnOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                    values.autograph = values.autograph ? values.autograph.trim() : values.autograph
                    this.props.rootuseradd(values)
                    .then((res)=>{
                        if(res.data.err===0){
                            this.props.handleAddOnOk(false)
                        }else{
                             message.warning('添加失败或用户名重复，请重试！')
                        }
                    })
                    .catch(()=>{
                        message.warning("添加失败或用户名重复，请重试")
                    })
                
            }

        });
    }
    handleCancel=()=>{
        this.props.handleAddCancel(false)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const data=this.props.dataAdd
        return (
            <Modal
                centered={true}
                maskClosable={false}
                visible={this.props.isAdd}
                onCancel={this.handleCancel}
                onOk={this.handleOnOk}
                destroyOnClose={true}
                title="添加新用户"
            >
                <Form {...formItemLayout} style={{width:300,margin: '0 auto'}} labelAlign="left">
                     
                    <Form.Item label="用户名">
                        {getFieldDecorator('username', {
                            initialValue: data.username,
                            rules:[{required:true,message:"用户名必须填写"}]
                        })(
                            <Input placeholder="请输入用户名" />
                        )}
                    </Form.Item>
                    <Form.Item label="密码">
                        {getFieldDecorator('userpassword', {
                            initialValue: data.userpassword,
                            rules:[{required:true,message:"密码必须填写"}]
                        })(
                            <Input placeholder="请输入密码"/>
                        )}
                    </Form.Item>
                    <Form.Item label="性别">
                        {getFieldDecorator('sex', {
                            initialValue: data.sex
                        })(
                            <Radio.Group>
                                <Radio value="0"><Tag color="geekblue">男</Tag></Radio>
                                <Radio value="1"><Tag color="pink">女</Tag></Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    
                    <Form.Item label="个人签名">
                        {
                            getFieldDecorator('autograph', {
                                initialValue: data.autograph,
                                rule:[{}]
                            })(
                                <Input placeholder="请输入个人签名" />
                            )
                        }
                    </Form.Item>
                    <Form.Item label="权限">
                        {getFieldDecorator('role', {
                            initialValue: data.role
                        })(
                            <Radio.Group>
                                <Radio value="1"><Tag color="#2db7f5">普通用户</Tag></Radio>
                                <Radio value="2"><Tag color="#108ee9">管理员</Tag></Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
export default RootUserAdd