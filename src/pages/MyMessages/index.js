import React,{Component} from 'react'
import {Form,Input,Button,Card,Radio, message} from 'antd'
import {connect} from 'react-redux'
import {userUpdate} from '../../actions/user'
const formItemLayout = {
    labelCol:{span:5},
    wrapperCol:{span:20}
}
const mapState = state=>({
    user:state.user
})
@Form.create()
@connect(mapState,{userUpdate})
class MyMessages extends Component {
    handleUpdate=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.autograph=values.autograph?values.autograph.trim():values.autograph
                if(values.sex===this.props.user.sex&&(values.autograph===this.props.user.autograph||values.autograph==="")){
                    message.warning('信息未修改,不能更新！')
                }else {
                    const params = {
                        ...values,
                        id:this.props.user.id
                    }
                   this.props.userUpdate(params)
                }
            }
             
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
       
        return (
            <Card  style={{width:400,margin: '0 auto'}}  title="用户信息：">
            <Form  {...formItemLayout}  labelAlign="left">
             <Form.Item   label="用户名">
                 {getFieldDecorator('username', {
                     initialValue:this.props.user.username
                 })(
                     <Input disabled/>
                 )}
             </Form.Item>
             <Form.Item label="性别">
                 {getFieldDecorator('sex',{
                     initialValue:this.props.user.sex
                 })(
                     <Radio.Group>
                         <Radio value="0">男</Radio>
                         <Radio value="1">女</Radio>
                     </Radio.Group>,
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