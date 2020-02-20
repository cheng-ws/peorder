import actionTypes from './actionType'
import {loginRequest,userAddRequest} from '../request'

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
    localStorage.removeItem('isLogin')
    localStorage.removeItem('userInfo')
    
    return {
        type:actionTypes.LOGIN_FAILED
    }
}
export const userAdd = (params) => {
    return dispatch=>{
        return userAddRequest(params)
    }
}
export const loginOut = ()=> {
    return dispatch=>{
        dispatch(loginFailed())
    }
}
export const login =(userInfo) =>{
    return dispatch => {
        dispatch(loginStart())
        loginRequest(userInfo)
        .then(resp=>{
            console.log(resp)
            if(resp.data.err===0){
                localStorage.setItem('userInfo',JSON.stringify(resp.data.data))
                // const {authToken,...userInfo}=resp.data.data;
                // if(userInfo.remember===true){
                  
                // }else {
                //     window.sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
                // }
                dispatch(loginSuccess(resp.data.data))
            }else {
                dispatch(loginFailed())
            }
        })
    }
}