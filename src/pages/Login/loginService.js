// import { request } from "http";

// export default {
//     async getLoginData(params){
//         return request(`/`
//     }
// }


/* 
/api/v1/login

request: {
    username:String
    passname:String
}
response: {
    code:200,
    errMsg:"",
    data: {
        id:'122',
        avatar:头像，
        displayName:'', 昵称
        username:'',
        email:'',
        role:['001','002','003'], 基于角色
        pages:['/admin/dashboard'],基于功能

    }
}
 1 login 组件页面实现
 2 request login接口实现
 3 action actionTypes.is 中实现login type类型名
 4 action  login-----user.js 各类型type发出action
 5 reducers login---user.js  判断各类型type的action 进行initState 的更新
 6 login 等相关组件中，具体事件发出action user.js 中export 出的login 函数
   以及各相关组件中的login   user.js  的 initState的数据应用
 7 本地化存储
    

*/