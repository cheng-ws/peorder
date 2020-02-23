import actionTypes from '../actions/actionType'
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
// const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))||JSON.parse(window.sessionStorage.getItem('userInfo'))
const initState ={
    ...userInfo,
    isLogin:false,
    isLoading:false,
}
export default (state=initState,action)=>{
    switch(action.type) {
        case actionTypes.LOGIN_START:
            return {
                ...state,
                isLoading:true
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload.userInfo,
                isLoading:false,
                isLogin:true
            }
        case actionTypes.LOGIN_FAILED:
            return {
                id:'',
                islogin:true,
                isLogin:false,
                role:''
            }
        default:
            return state;
    }
}