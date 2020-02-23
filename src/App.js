import React,{Component} from 'react';
import './index.less'
import {Route,Switch,Redirect,withRouter} from 'react-router-dom'
import {adminRouter} from './routes'
import {Frame} from './components'
import {connect} from 'react-redux'

const mapState = state => ({
  isLogin:state.user.isLogin,
  role:state.user.role,
})
@withRouter
@connect(mapState)
 
class App extends Component {
 
  render(){
    // const {login:{isLogin}}=this.props;
     
    const islogin = localStorage.getItem('isLogin')?true:this.props.isLogin
    const menus=adminRouter.filter(route=>route.isNav===true&&route.roles.includes(this.props.role))
    return (
      
      islogin
      ?
      <Frame menus={menus}>
        <Switch>
              {
                 adminRouter.map(route=>{
                   return(
                     <Route 
                         key={route.pathname} 
                         path={route.pathname} 
                         exact={route.exact}
                         render={(routerProps)=>{
                           const hasPremission = route.roles.includes(this.props.role);
                           return hasPremission?<route.component {...routerProps} />:<Redirect to="/admin/noauth" />
                      }}/>
                  ) 
              
                 })
              }
              <Redirect to={adminRouter[0].pathname} from='/admin' exact />
              <Redirect to='/404' />
         </Switch> 
      </Frame>
      :
      <Redirect to="/login" />
    );
  }
  
}

export default App;
