import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/home/files',
                name: 'files',
                component: () => import('@/views/menu/Files.vue'),
            }, {
                path: '/home/bin',
                name: 'bin',
                component: () => import('@/views/menu/Bin.vue'),
            }]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
]

const router = new VueRouter({
    routes
})

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router