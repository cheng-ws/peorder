import actionTypes from './actionType'
import {myOrderRequest,myOrderPageRequest,myOrderSearchRequest,myOrderPageSearchRequest,myOrderCancelRequest,myOrderDelRequest} from '../request'

const myorderStart =()=>{
    return {
        type:actionTypes.MYORDER_START
    }
}
const myorderSuccess =(data)=>{
    return {
        type: actionTypes.MYORDER_SUCCESS,
        payload: {
            list:data
        }
    }
}
 
const myorderFailed = ()=> {
    return {
        type:actionTypes.MYORDER_FAILED
    }
}
const myorderpageStart =()=>{
    return {
        type:actionTypes.MYORDERPAGE_START
    }
}
const myorderpageSuccess =(data)=>{
    return {
        type: actionTypes.MYORDERPAGE_SUCCESS,
        payload: {
            list:data.data,
            total:data.total
        }
    }
}
 
const myorderpageFailed = ()=> {
    return {
        type:actionTypes.MYORDERPAGE_FAILED
    }
}

export const myorder =(params)=>{
    return dispatch=>{
        dispatch(myorderStart())
        myOrderRequest(params)
        .then(resp=>{
           
            if(resp.data.err===0) {
                dispatch(myorderSuccess(resp.data.data))
            }else{
                dispatch(myorderFailed())
            }
        })
    }
}
export const myorderpage =(params)=>{
    return dispatch=>{
        dispatch(myorderpageStart())
        myOrderPageRequest(params)
        .then(resp=>{
            if(resp.data.err===0) {
                dispatch(myorderpageSuccess(resp.data))
            }else{
                dispatch(myorderpageFailed())
            }
        })
    }
}
export const myordersearch =(params)=>{
    return dispatch=>{
        dispatch(myorderStart())
        myOrderSearchRequest(params)
        .then(resp=>{
            if(resp.data.err===0) {
                dispatch(myorderSuccess(resp.data.data))
            }else{
                dispatch(myorderFailed())
            }
        })
    }
}
export const myorderpagesearch =(params)=>{
    return dispatch=>{
        dispatch(myorderpageStart())
        myOrderPageSearchRequest(params)
        .then(resp=>{
            if(resp.data.err===0) {
                dispatch(myorderpageSuccess(resp.data))
            }else{
                dispatch(myorderpageFailed())
            }
        })
    }
}
export const myOrderCancel =(params)=>{
    return dispatch=>{
            return myOrderCancelRequest(params)  
    }
}
export const myOrderDel = (params)=>{
    return dispatch=>{
        return myOrderDelRequest(params)
    }
}