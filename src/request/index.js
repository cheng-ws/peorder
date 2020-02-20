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
//注册
export const userAddRequest = (params)=>{
    return axios.post(`${API}/user/reg`,{
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