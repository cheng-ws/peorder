import axios from 'axios'
// import {message} from 'antd'
// const isDev=process.env.NODE_ENV==='developement'
// const service = axios.create({
//     baseURL:isDev?'http://localhost:4000/api':''
// })
// service.interceptors.response.use((resp)=>{
//     if(resp.data.err===0){
//         return resp.data.data
//     }else {
//         message.error(resp.data.msg)
//     }
// })
const API='/api'
//登录
export const loginRequest=(params)=>{
    return axios.post(`${API}/user/login`,{
        ...params
    })
}
export const loginOutRequest=(params)=>{
    return axios.post(`${API}/user/loginout`,{
        ...params
    })
}
export const getIsloginCountRequest=()=>{
    return axios.get(`${API}/user/loginselect`)
}
//注册
export const userAddRequest = (params)=>{
    return axios.post(`${API}/user/reg`,{
        ...params
    })
}
//个人信息更新
export const userUpdateRequest=(params)=>{
    return axios.post(`${API}/user/update`,{
        ...params
    })
}
//我的预约
export const myOrderRequest=(params)=>{
    return axios.get(`${API}/person/order?place_person=${params}`)
}
export const myOrderPageRequest=(params)=>{
    return axios.post(`${API}/person/orderpage`,{
        ...params
    })
}
export const myOrderSearchRequest=(params)=>{
    return axios.post(`${API}/person/ordersearch`,{
        ...params
    })
}
export const myOrderPageSearchRequest=(params)=>{
    return axios.post(`${API}/person/orderpagesearch`,{
        ...params
    })
}
export const myOrderCancelRequest=(params)=>{
    return axios.post(`${API}/place/update`,{
        ...params,
        status:0
    })
}
export const myOrderDelRequest=(params)=>{
    return axios.post(`${API}/person/orderdel`,{
        ...params
    })
}
//场地类别
export const orderPlaceNames = ()=>{
    return axios.get(`${API}/place/typenames`)
}
export const orderPlaceNameDetail =(params)=>{
    return axios.post(`${API}/place/search`,{
        ...params
    })
}
export const orderPlacePersonRequest = (params)=>{
    return axios.post(`${API}/place/update`,{
        ...params,
        status:1
    })
}
//用户数据管理
export const rootUserPageSearchRequest = (params)=>{
    return axios.post(`${API}/user/userpagesearch`,{
        ...params
    })
}
export const rootUserDelRequest = (params)=>{
    return axios.post(`${API}/user/del`,{
        ...params
    })
}
export const rootUserEditRequest = (params)=>{
    return axios.post(`${API}/user/rootupdate`,{
        ...params
    })
}
export const rootUserAddRequest = (params)=>{
    return axios.post(`${API}/user/rootadd`,{
        ...params
    })
}
//预约数据管理
export const rootOrderDetailRequest =(params)=>{
    return axios.post(`${API}/place/rootsearch`,{
        ...params
    })
}
export const rootOrderDelRequest = (params)=>{
    return axios.post(`${API}/place/rootdel`,{
        ...params
    })
}
export const rootOrderCancelRequest = (params)=>{
    return axios.post(`${API}/place/update`,{
        ...params
    })
}
export const rootOrderOkRequest = (params)=>{
    return axios.post(`${API}/place/update`,{
        ...params
    })
}
//场地数据管理
export const rootPlaceAddAllRequest = (params)=>{
    return axios.post(`${API}/place/rootadd`,{
        ...params
    })
}
export const rootPlaceDelAllRequest = (params)=>{
    return axios.post(`${API}/place/rootdelall`,{
        ...params
    })
}
