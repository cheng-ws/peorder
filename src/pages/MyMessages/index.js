import React,{Component} from 'react'
import {Form,Icon,Input,Button,Card} from 'antd'
import {connect} from 'react-redux'

const formItemLayout = {
    labelCol:{span:5},
    wrapperCol:{span:20}
}
const mapState = state=>({
    user:state.user
})
@Form.create()
@connect(mapState,)
class MyMessages extends Component {
    handleUpdate=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                
            }
             
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this.props.user)
        return (
            <Card className="login" style={{width:400}} title="用户信息：">
            <Form  {...formItemLayout}   className="login-form" labelAlign="left">
             <Form.Item   label="用户名">
                 {getFieldDecorator('username', {
                     initialValue:this.props.user.username,
                     rules: [{ required: true, message: '请输入用户名' }],
                 })(
                     <Input disabled/>
                 )}
             </Form.Item>
             <Form.Item label="个人签名">
                 {
                     getFieldDecorator('autograph',{
                         initialValue:this.props.user.autograph,
                         rules:[{}]
                     })(
                         <Input placeholder="请输入个人签名" />
                     )
                 }
             </Form.Item>
             <Form.Item>
                 
                 <Button loading={this.props.isLoading} onClick={this.handleUpdate} icon="arrow-up" type="primary" className="login-form-button">
                   立即更新
                 </Button>
                 
             </Form.Item>
         </Form>
     </Card>
        )
    }
}
export default MyMessages