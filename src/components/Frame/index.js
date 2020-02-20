import React,{Component} from 'react'
import {Layout,Menu,Icon,Dropdown,Avatar} from 'antd'
import logo from './logo.png'
import './frame.less'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginOut} from '../../actions/user'
const {Header,Content,Sider} = Layout;
 const mapState = state => {
     const {username} =state.user
    return  {username}
}
@withRouter

@connect(mapState,{loginOut})
class Frame extends Component {
    onMenuClick=({key})=>{
        // {item,key,keyPath,domEvent}
        this.props.history.push(key)
    }
    onDropdownMenuClick=({key})=>{
        if(key==='/login'){
            this.props.loginOut()
        }else {
            this.props.history.push(key)
        }
       
    }
    renderDropdown =()=>(
        <Menu onClick={this.onDropdownMenuClick}>
            <Menu.Item key="/login">
                <Icon type="logout" />退出登录
            </Menu.Item>
        </Menu>
    )
    render() {
        const selectKeyArr = this.props.location.pathname.split('/')
        selectKeyArr.length=3
        return(
            <Layout style={{minHeight:'100%'}}>
                <Header className="header-top">
                    <div className="header-logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="header-user">
                        <Dropdown overlay={this.renderDropdown}>
                            <div>
                                <Avatar style={{backgroundColor:'orange',verticalAlign:'middle',marginRight: 10}}></Avatar>
                                <span>欢迎您-{this.props.username}</span>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Layout style={{background:'#fff'}}>
                    <Sider width={200} style={{paddingTop:'15px',background:'#fff'}}>
                        <Menu
                           mode="inline"
                           selectedKeys={[selectKeyArr.join('/')]}
                           onClick={this.onMenuClick}
                           style={{height:'100%'}}
                           >
                               {
                                   this.props.menus.map(item=>{
                                       return (<Menu.Item key={item.pathname}>
                                           <Icon type={item.icon}></Icon>{item.title}
                                       </Menu.Item>)
                                   })
                               }
                           </Menu>
                    </Sider>
                    <Layout style={{padding:'16px'}}>
                        <Content style={{background:'#fff',margin:0,minHeight:410,padding:24}}>
                            {this.props.children}
                        </Content>

                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
export default Frame