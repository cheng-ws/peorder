import actionTypes from './actionType'
import {rootOrderDetailRequest,rootOrderDelRequest,rootOrderOkRequest,rootOrderCancelRequest} from '../request'

const rootOrderStart=()=>{
    return {
        type:actionTypes.ROOTORDER_START
    }
}
const rootOrderSuccess = (data)=>{
    return {
        type:actionTypes.ROOTORDER_SUCCESS,
        payload:{
            data
        }
    }
}
const rootOrderFailed = ()=>{
    return {
        type:actionTypes.ROOTORDER_FAILED
    }
}
 
 
export const getrootorderdetail=(data)=>{
    return dispatch=>{
        dispatch(rootOrderStart())
        rootOrderDetailRequest(data)
            .then(resp => {
                if (resp.data.err === 0) {
                    dispatch(rootOrderSuccess(resp.data.data))
                } else {
                    dispatch(rootOrderFailed())
                }
            }) 
    }
   
}
export const getrootorderdel=(data)=>{
    return dispatch=>{
         return  rootOrderDelRequest(data)   
    } 
}
export const getrootorderok=(data)=>{
    return dispatch=>{
         return  rootOrderOkRequest(data)   
    } 
}
export const getrootordercancel=(data)=>{
    return dispatch=>{
         return  rootOrderCancelRequest(data)   
    } 
}
