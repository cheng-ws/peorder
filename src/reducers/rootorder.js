import actionTypes from '../actions/actionType'

const initState ={
    list:[]
}
export default (state=initState,action) => {
    switch(action.type) {
        case actionTypes.ROOTORDER_START:
            return {
                ...state
            }
        case actionTypes.ROOTORDER_SUCCESS:
            return {
                ...state,
                list:action.payload.data
            }
        case actionTypes.ROOTORDER_FAILED:
            return {
                list:[]
            }
         
        default:
            return state;
    }
}