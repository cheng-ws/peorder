import actionTypes from './actionType'
import {rootOrderDetailRequest,rootOrderDelRequest,rootPlaceAddAllRequest,rootPlaceDelAllRequest } from '../request'

const rootPlaceStart=()=>{
    return {
        type:actionTypes.ROOTPLACE_START
    }
}
const rootPlaceSuccess = (data)=>{
    return {
        type:actionTypes.ROOTPLACE_SUCCESS,
        payload:{
            data
        }
    }
}
const rootPlaceFailed = ()=>{
    return {
        type:actionTypes.ROOTPLACE_FAILED
    }
}
 
 
export const getrootplacedetail=(data)=>{
    return dispatch=>{
        dispatch(rootPlaceStart())
        rootOrderDetailRequest(data)
            .then(resp => {
                if (resp.data.err === 0) {
                    dispatch(rootPlaceSuccess(resp.data.data))
                } else {
                    dispatch(rootPlaceFailed())
                }
            }) 
    }
   
}
export const getrootplacedel=(data)=>{
    return dispatch=>{
         return  rootOrderDelRequest(data)   
    } 
}
export const getrootplaceaddall=(data)=>{
    return dispatch=>{
         return  rootPlaceAddAllRequest(data)   
    } 
}
export const getrootplacedelall=(data)=>{
    return dispatch=>{
         return  rootPlaceDelAllRequest(data)   
    } 
}
