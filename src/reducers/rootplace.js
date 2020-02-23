import actionTypes from '../actions/actionType'

const initState ={
    list:[]
}
export default (state=initState,action) => {
    switch(action.type) {
        case actionTypes.ROOTPLACE_START:
            return {
                ...state
            }
        case actionTypes.ROOTPLACE_SUCCESS:
            return {
                ...state,
                list:action.payload.data
            }
        case actionTypes.ROOTPLACE_FAILED:
            return {
                list:[]
            }
         
        default:
            return state;
    }
}