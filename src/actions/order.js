import actionTypes from './actionType'
import {orderPlaceNames,orderPlaceNameDetail,orderPlacePersonRequest} from '../request'

const orderStart=()=>{
    return {
        type:actionTypes.ORDER_START
    }
}
const orderSuccess = (data)=>{
    return {
        type:actionTypes.ORDER_SUCCESS,
        payload:{
            data
        }
    }
}
const orderFailed = ()=>{
    return {
        type:actionTypes.ORDER_FAILED
    }
}
export const getorderplacename=(data)=>{
    return dispatch=>{
        dispatch(orderStart())
        orderPlaceNames(data)
            .then(resp => {
                if (resp.data.err === 0) {
                    dispatch(orderSuccess(resp.data.data))
                } else {
                    dispatch(orderFailed())
                }
            }) 
    }
   
}
export const getorderplacenamedetail=(data)=>{
    return dispatch=>{
        dispatch(orderStart())
        orderPlaceNameDetail(data)
            .then(resp => {
                if (resp.data.err === 0) {
                    dispatch(orderSuccess(resp.data.data))
                } else {
                    dispatch(orderFailed())
                }
            }) 
    }
   
}
export const orderplaceperson=(data)=>{
    return dispatch=>{
          return orderPlacePersonRequest(data)      
    }
   
}
