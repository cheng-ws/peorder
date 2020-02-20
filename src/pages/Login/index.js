import React, { Component } from 'react'
import { Form, Icon, Input, Button,Card } from 'antd';
import './login.less'
import {connect} from 'react-redux'
import {login} from '../../actions/user'
import {Redirect} from 'react-router-dom'
import loginbgc from './login.jpg'
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 21 },
  };
const mapState = state=>({
    isLogin:state.user.isLogin,
    isLoading:state.user.isLoading
})
//login 是要调用的action 发送dispatch
 @connect(mapState,{login})

@Form.create()
 
 class Login extends Component {
     state={
         username:'',
         password:''
     }
     componentDidMount(){
         
     }
      
     handleLogin = e => {
        e.preventDefault();
        
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.login(values)
            }
             
        });
    };
    handleReg=()=>{
         this.props.history.push('/reg')
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.props.isLogin
            ?
            <Redirect to="/admin" />
            :
            <div className="login-reg">
            <img src={loginbgc} alt="" width="100%" height="100%" />
        <Card className="login" style={{width:400}} title="用户登录：">
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
                   
                    <Button loading={this.props.isLoading} onClick={this.handleLogin} icon="login" type="primary" className="login-form-button">
                      立即登录
                    </Button>
                    <Button  onClick={this.handleReg} icon="user-add" type="primary" >
                      快速注册
                    </Button>
                </Form.Item>
            </Form>
        </Card>  
        </div>     
        );
    }
}

export default Login
