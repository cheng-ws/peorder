import React, { Component } from 'react'
import { Form, Modal,Tag,message,Input,Radio } from 'antd'
import { rootuseredit } from '../../actions/rootuser'
import {connect} from 'react-redux'
 
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 20 }
}
const mapState=state=>({  
})
@Form.create()
@connect(mapState, {rootuseredit})
class RootUserEdit extends Component {
    handleOnOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.autograph = values.autograph ? values.autograph.trim() : values.autograph
                if (values.sex === this.props.dataEdit.sex && values.role===this.props.dataEdit.role && (values.autograph === this.props.dataEdit.autograph || values.autograph === "")) {
                    message.warning('信息未更改,不能提交！')
                } else {
                    const params = {
                        ...values,
                        id: this.props.dataEdit.id
                    }
                    this.props.rootuseredit(params)
                    .then((res)=>{
                        if(res.data.err===0){
                            this.props.handleEditOnOk(false)
                        }else{
                             message.warning('更新失败，请重试！')
                        }
                    })
                    .catch(()=>{
                        message.warning("更新失败，请重试")
                    })
                }
            }

        });
    }
    handleCancel=()=>{
        this.props.handleEditCancel(false)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const data=this.props.dataEdit
        return (
            <Modal
                centered={true}
                maskClosable={false}
                visible={this.props.isEdit}
                onCancel={this.handleCancel}
                onOk={this.handleOnOk}
                destroyOnClose={true}
                title="编辑用户数据"
            >
                <Form {...formItemLayout} style={{width:300,margin: '0 auto'}} labelAlign="left">
                    <Form.Item label="序号">
                        {getFieldDecorator('key', {
                            initialValue: data.key
                        })(
                            <Input disabled style={{width:200}}/>
                        )}
                    </Form.Item>
                    <Form.Item label="用户名">
                        {getFieldDecorator('username', {
                            initialValue: data.username
                        })(
                            <Input disabled />
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
export default RootUserEdit