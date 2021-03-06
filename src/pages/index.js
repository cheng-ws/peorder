import Loadable from 'react-loadable'
import {Loading} from '../components'
const Login = Loadable({
    loader:()=>import('./Login'),
    loading:Loading
})
const Reg = Loadable({
    loader:()=>import('./Reg'),
    loading:Loading
})
const NotFound = Loadable({
    loader:()=>import('./NotFound'),
    loading:Loading
})
const Home = Loadable({
    loader:()=>import('./Home'),
    loading:Loading
})
const Types = Loadable({
    loader:()=>import('./Types'),
    loading:Loading
})
const TypesDetail = Loadable({
    loader:()=>import('./TypesDetail'),
    loading:Loading
})
const Order = Loadable({
    loader:()=>import('./Order'),
    loading:Loading
})
const OrderDetail = Loadable({
    loader:()=>import('./OrderDetail'),
    loading:Loading
})
const MyOrder = Loadable({
    loader:()=>import('./MyOrder'),
    loading:Loading
})
const MyMessages = Loadable({
    loader:()=>import('./MyMessages'),
    loading:Loading
})
const NoAuth = Loadable({
    loader:()=>import('./NoAuth'),
    loading:Loading
})
const RootOrder = Loadable({
    loader:()=>import('./RootOrder'),
    loading:Loading
})
const RootUser = Loadable({
    loader:()=>import('./RootUser'),
    loading:Loading
})
const RootPlace = Loadable({
    loader:()=>import('./RootPlace'),
    loading:Loading
})
export {
    Login,
    Reg,
    NotFound,
    NoAuth,
    Home,
    Types,
    TypesDetail,
    Order,
    OrderDetail,
    MyOrder,
    MyMessages,
    RootOrder,
    RootUser,
    RootPlace
}