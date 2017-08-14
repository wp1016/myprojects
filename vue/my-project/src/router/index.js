import App from '@/App'

const login=r=>require.ensure([],()=>r(require('@/pages/login/login')),'login')
const home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
const detail = r => require.ensure([], () => r(require('@/pages/detail/detail')), 'detail')


export default[
  {
    path:'/',
    component:App,//顶层路由
    children:[
      {
        path:'',
        redirect:'/login'
      },
      {
        path:'/home',
        component:home
      },
      {
        path:'/detail',
        component:detail
      },
      {
        path:'/login',
        component:login
      }
    ]
  }
]
