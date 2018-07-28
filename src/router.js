import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const Home= () => import('src/components/home/home.js');
const Ueditor = () => import('src/shareModule/ueditor/ueditor.js')
const routes = [
    {
        path: '/',redirect:"/home", component: Home,
    },
    {
        path: '/home', component: Home,
    },
    {
        path: '/editor', component: Ueditor,
    }
]
const router = new VueRouter({
    routes
})

export default router;