import actionTypes from '../actions/actionType'

const initState = {
    list:[],
    total:0,
}
export default (state=initState,action) => {
    switch(action.type) {
        case actionTypes.MYORDER_START:
            return {
                ...state
            }
        case actionTypes.MYORDER_SUCCESS:
            let list= action.payload.list
            let length=list.length
            return {
                ...state,
                list,
                total:length
            }
        case actionTypes.MYORDER_FAILED:
            return {
                list:[],
                total:0
            }

        case actionTypes.MYORDERPAGE_START:
            return {
                ...state
            }
        case actionTypes.MYORDERPAGE_SUCCESS:
            return {
                ...state,
                list:action.payload.list,
                total:action.payload.total
            }
        case actionTypes.MYORDERPAGE_FAILED:
            return {
                list:[],
                total:0
            }
        default:
            return state;
    }
}