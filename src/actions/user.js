import actionTypes from './actionType'
import {loginRequest,userAddRequest,userUpdateRequest,loginOutRequest,getIsloginCountRequest} from '../request'
import { message } from 'antd'
const loginStart =()=>{
    return {
        type:actionTypes.LOGIN_START
    }
}
const loginSuccess=(userInfo)=>{
    localStorage.setItem('isLogin',true)
    return {
        type:actionTypes.LOGIN_SUCCESS,
        payload:{
            userInfo
        }
    }
}
const loginFailed =()=>{
    return {
        type:actionTypes.LOGIN_FAILED
    }
}
export const userAdd = (params) => {
    return dispatch=>{
        return userAddRequest(params)
    }
}
export const userUpdate = (params)=>{
    return dispatch=>{
        userUpdateRequest(params)
        .then(resp=>{
            if(resp.data.err===0){
                localStorage.setItem('userInfo',JSON.stringify(resp.data.data))
                dispatch(loginSuccess(resp.data.data))
                message.success('更新成功！')
            }else {
                message.warning('更新失败，请刷新重试！')
            } 
        })
    }
}
export const loginOut = (params)=> {
    return dispatch=>{
          loginOutRequest(params)
          .then(resp=>{
              if(resp.data.err===0){
                localStorage.removeItem('isLogin')
                localStorage.removeItem('userInfo')
                dispatch(loginFailed()) 
              }else{
                message.warning("退出错误，请刷新重试!")
              }
          })
    }
}
export const login =(userInfo) =>{
    return dispatch => {
        dispatch(loginStart())
        loginRequest(userInfo)
        .then(resp=>{
            if(resp.data.err===0){
                localStorage.setItem('userInfo',JSON.stringify(resp.data.data))
                dispatch(loginSuccess(resp.data.data))
            }else {
                dispatch(loginFailed())
            }
        })
    }
}
export const getIsloginCount = ()=>{
    return dispatch=>{
        return  getIsloginCountRequest()
    }
}