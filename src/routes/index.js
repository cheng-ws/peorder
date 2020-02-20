import {
  Home,
  Login,
  NotFound,
  Reg,
  Types,
  TypesDetail,
  Order,
  OrderDetail,
  MyOrder,
  MyMessages
} from '../pages'

export const mainRouter = [
    {
        pathname: '/login',
        component: Login
    },
    {
        pathname:'/reg',
        component:Reg

    },
    {
        pathname:'/404',
        component: NotFound
    }
]
export const adminRouter = [
    {
        pathname: '/admin/home',
        component: Home,
        title:'首页',
        isNav:true,
        icon:'home',
        roles: ['1','2']
    },
    {
        pathname:'/admin/types',
        component: Types,
        title:'场地类别',
        isNav:true,
        icon:'unordered-list',
        exact:true,
        roles: ['1','2']
    },
    {
        pathname:'/admin/types/:id',
        component:TypesDetail,
        isNav:false,
        roles: ['1','2']
    },
    {
        pathname:'/admin/order',
        component:Order,
        title:'场地预约',
        isNav:true,
        icon:'database',
        exact:true,
        roles: ['1','2']
    },
    {
        pathname:'/admin/order/:id',
        component:OrderDetail,
        isNav:false,
        roles: ['1','2']
    },
    {
        pathname:'/admin/myorder',
        component:MyOrder,
        title:'我的预约',
        isNav:true,
        icon:'user',
        roles: ['1','2']
    },
    {
        pathname:'/admin/mymessages',
        component:MyMessages,
        title:'个人信息',
        isNav:true,
        icon:'idcard',
        roles:['1','2']
    }
    
]