import React, { Component } from 'react'
import { Form, Icon, Input, Button,Card,message} from 'antd';
import './index.less'
import {connect} from 'react-redux'
import {userAdd} from '../../actions/user'
import {Redirect} from 'react-router-dom'
// import loginbgc from './login.jpg'
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 21 },
  };
const mapState = state=>({
    isLogin:state.user.isLogin
})
//login 是要调用的action 发送dispatch
 @connect(mapState,{userAdd})

@Form.create()
 
 class Reg extends Component {
     state={
         username:'',
         password:'',
         isLoading:false,
     }

     handleLogin = e => {
        e.preventDefault();
        // const { dispatch  } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({isLoading:true})
                this.props.userAdd(values)
                .then((res)=>{
                    console.log(res)
                    if(res.data.err===0){
                        message.success('注册成功,请登录！')
                        this.props.history.push('/login')
                    }else{
                        message.error('注册失败或用户名重复，请重试！')
                        this.setState({isLoading:false})
                    }
                })
                .catch(()=>{
                    this.setState({isLoading:false})
                    message.error('注册失败或用户名重复，请重试！')
                })
            }
           
        });
    };
    handleReg=()=>{
         this.props.history.push('/login')
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.props.isLogin
            ?
            <Redirect to="/admin" />
            :
            <div className="login-reg">
            {/* <img src={loginbgc} alt="" width="100%" height="100%" /> */}
        <Card className="login" style={{width:400}} title="用户注册：">
               <Form  {...formItemLayout}   className="login-form" labelAlign="left">
                <Form.Item   label="用户名">
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input
                            disabled={this.props.isLoading}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入用户名"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="密码">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input
                            disabled={this.props.isLoading}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {/* {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox disabled={this.props.isLoading}>记住密码</Checkbox>)} */}
                   
                    <Button loading={this.state.isLoading} onClick={this.handleLogin} icon="user-add" type="primary" className="login-form-button">
                      立即注册
                    </Button>
                    <Button  onClick={this.handleReg} icon="arrow-left" type="primary" >
                      返回登录
                    </Button>
                </Form.Item>
            </Form>
        </Card>  
        </div>     
        );
    }
}

export default Reg
