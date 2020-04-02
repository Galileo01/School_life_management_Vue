import Vue from 'vue';
import VueRouter from 'vue-router';
const Login = () => import('views/Login');
const Home =()=> import('views/Home')
const Report =()=> import('views/Report')
const Admin =()=> import('views/Admin')
const Users= ()=>import('views/Users')
const Order=()=>import ('views/Order')
const Province=()=> import('views/Province')
Vue.use(VueRouter);

const routes = [
    {
      path:'/',
      redirect:'/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
      path:'/home',
      component:Home,
      children:[
        {
          path:'',
          redirect:'report'
        },
        {
          path:'report',
          component:Report
        },
        {
          path:'users',
          component:Users
        },
        {
          path:'admin',
          component:Admin
        },{
          path:'order',
          component:Order
        },
        {
          path:'province',
          component:Province
        }
      ]
    }
];

const router = new VueRouter({
    mode: 'hash',
    routes
});

//设置 导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/login')
  return next();
  const token=sessionStorage.getItem('token');
  //没有登录，强制 跳转 登录页面， 禁止 未登录 通过url 进入页面
  if(!token)
  return next('/login');
  next();
})
export default router;
