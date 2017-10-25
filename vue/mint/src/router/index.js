import App from '@/App'

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home');
const hello = r => require.ensure([], () => r(require('../components/Hello')), 'hello');


export default [
    {
      path: '/',
      component: App,
      children:[
        {
          path:'',
          redirect:'/home',
        },
        {
          path:'/home',
          component:home
        },
        {
          path:'/hello',
          component:hello
        }
      ]
    }
  ]
