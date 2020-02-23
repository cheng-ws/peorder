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
  MyMessages,
  RootOrder,
  RootUser,
  RootPlace

} from '../pages'
import NoAuth from '../pages/NoAuth'

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
    },
    {
        pathname:'/admin/rootorder',
        component: RootOrder,
        title:'预约数据管理',
        isNav:true,
        icon:'pie-chart',
        roles:['2']
    },
    {
        pathname:'/admin/rootuser',
        component: RootUser,
        title:'用户数据管理',
        isNav:true,
        icon:'team',
        roles:['2']
    },
    {
        pathname:'/admin/rootplace',
        component: RootPlace,
        title:'场地数据管理',
        isNav:true,
        icon:'heat-map',
        roles:['2']
    },
    {
        pathname:'/admin/noauth',
        component: NoAuth,
        isNav: false,
        roles:['1','2']
    }
]