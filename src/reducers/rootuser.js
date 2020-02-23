import actionTypes from '../actions/actionType'

const initState = {
    list:[],
    total:0,
}
export default (state=initState,action) => {
    switch(action.type) {
        case actionTypes.ROOTUSERPAGE_START:
            return {
                ...state
            }
        case actionTypes.ROOTUSERPAGE_SUCCESS:
            return {
                ...state,
                list:action.payload.list,
                total:action.payload.total
            }
        case actionTypes.ROOTUSERPAGE_FAILED:
            return {
                list:[],
                total:0
            }
        default:
            return state;
    }
}