import actionTypes from './actionType'
import {rootUserPageSearchRequest,rootUserDelRequest,rootUserEditRequest,rootUserAddRequest} from '../request'

 
const rootUserpageStart =()=>{
    return {
        type:actionTypes.ROOTUSERPAGE_START
    }
}
const rootUserpageSuccess =(data)=>{
    return {
        type: actionTypes.ROOTUSERPAGE_SUCCESS,
        payload: {
            list:data.data,
            total:data.total
        }
    }
}
 
const rootUserpageFailed = ()=> {
    return {
        type:actionTypes.ROOTUSERPAGE_FAILED
    }
}


export const rootuserpagesearch =(params)=>{
    return dispatch=>{
        dispatch(rootUserpageStart())
        rootUserPageSearchRequest(params)
        .then(resp=>{
            if(resp.data.err===0) {
                dispatch(rootUserpageSuccess(resp.data))
            }else{
                dispatch(rootUserpageFailed())
            }
        })
    }
}
export const rootuseredit =(params)=>{
    return dispatch=>{
        return rootUserEditRequest(params)  
    }
}
export const rootuserdel = (params)=>{
    return dispatch=>{
        return rootUserDelRequest(params)
    }
}
export const rootuseradd = (params)=>{
    return dispatch=>{
        return rootUserAddRequest(params)
    }
}