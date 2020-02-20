import actionTypes from '../actions/actionType'

const initState ={
    list:[],
    total:0
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
                list:[],
                total:0
            }
        default:
            return state;
    }
}