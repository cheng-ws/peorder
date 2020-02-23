import actionTypes from '../actions/actionType'

const initState ={
    list:[],
    data:[] 
}
export default (state=initState,action) => {
    switch(action.type) {
        case actionTypes.ORDER_START:
            return {
                ...state
            }
        case actionTypes.ORDER_SUCCESS:
            return {
                ...state,
                list:action.payload.data
            }
        case actionTypes.ORDER_FAILED:
            return {
                list:[]
            }
        case actionTypes.ORDERDETAIL_START:
            return {
                ...state
            }
        case actionTypes.ORDERDETAIL_SUCCESS:
            return {
                ...state,
                data: action.payload.data
            }
        case actionTypes.ORDERDETAIL_FAILED:
            return {
                data: []
            }
        default:
            return state;
    }
}